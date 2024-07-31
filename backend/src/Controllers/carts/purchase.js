const TicketResponse = require("../../dto/TicketResponse.dto");
const { cartService, productService, ticketService } = require("../../services/index.service");
const transport = require("../../utils/nodemailer");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res) => {
  try {
    const cid = req.params.cid;
    const email = req.body.email; // Obtener el email del cuerpo de la solicitud
    let sinStock = [];

    // Recuperar el carrito
    const cart = await cartService.getById(cid);

    // Procesar los productos en el carrito
    for (const productCart of cart.products) {
      const stock = productCart.product.stock;
      const quantity = productCart.quantity;
      const pid = productCart.product._id;

      console.log(`Processing Product: ${pid}, Stock: ${stock}, Quantity: ${quantity}`);

      if (stock >= quantity) {
        productCart.product.stock -= quantity;
        if (productCart.product.stock < 1) {
          productCart.product.status = false;
        }
        await productService.update(pid, productCart.product);
      } else {
        sinStock.push(productCart);
      }
    }

    console.log('Out of Stock Products:', sinStock);

    // Preparar la lista de productos comprados
    const purchasedProducts = [];
    for (const product of cart.products) {
      if (!sinStock.includes(product)) {
        purchasedProducts.push({
          product: product.product._id,
          name: product.product.title,
          price: product.product.price,
          quantity: product.quantity
        });
      }
    }

    // Crear el ticket si hay productos comprados
    if (purchasedProducts.length > 0) {
      const ticketData = {
        code: uuidv4(),
        purchaser: email, // Asignar el email del comprador
        amount: purchasedProducts.reduce(
          (total, product) => total + product.quantity * product.price,
          0
        ),
        products: purchasedProducts
      };

      const ticket = await ticketService.create(ticketData);

      const ticketResponse = new TicketResponse(ticket);

      // Enviar correo
      const result = await transport.sendMail({
        from: "SiLoUsotec <alejandrolunadev@gmail.com>",
        to: email,
        subject: "Orden de compra",
        html: `
        <div>
            <h1>Ticket: ${ticketResponse.code}</h1>
            <h2>Products:</h2>
            <ul>
              ${purchasedProducts.map(product => `
                <li>${product.name} - ${product.quantity} x $${product.price} - $${product.quantity * product.price}</li>
              `).join('')}
            </ul>
            <h2>Total: $${ticketResponse.amount}</h2>
            <h2>Gracias por su compra</h2>
        </div>
        `
      });

      console.log('Email Result:', result);

      // Actualizar carrito
      const updateCart = sinStock.length > 0 
        ? await cartService.update(cid, sinStock)
        : await cartService.update(cid, []);
      console.log('Updated Cart:', updateCart);

      return res.sendSuccess({ purchasedProducts, sinStock });
    } else {
      return res.sendSuccess({ sinStock });
    }
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
