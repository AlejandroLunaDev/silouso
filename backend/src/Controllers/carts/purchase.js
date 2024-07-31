const TicketResponse = require("../../dto/TicketResponse.dto");
const { cartService, productService, ticketService } = require("../../services/index.service");
const transport = require("../../utils/nodemailer");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res) => {
  try {
    const cid = req.params.cid;
    const email = req.body.email; 

    // Recuperar el carrito
    const cart = await cartService.getById(cid);

    // Variable para productos sin stock
    const sinStock = []; 

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
        purchaser: email, 
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
        from: "SiLoUsotec <silousotec@gmail.com>",
        to: email,
        subject: "Orden de compra",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
          <div style="text-align: center; padding: 20px;">
            <img src="https://example.com/brand.svg" alt="Logo" style="width: 150px; height: auto;">
          </div>
          <div style="padding: 20px;">
            <h1 style="color: #2D3748;">Gracias por su compra, ${email}!</h1>
            <h2 style="color: #4A5568;">Ticket: ${ticketResponse.code}</h2>
            <h3 style="color: #4A5568;">Productos comprados:</h3>
            <ul style="list-style-type: none; padding: 0;">
              ${purchasedProducts.map(product => `
                <li style="border-bottom: 1px solid #E2E8F0; padding: 10px 0;">
                  <strong>${product.name}</strong> - ${product.quantity} x $${product.price} - $${product.quantity * product.price}
                </li>
              `).join('')}
            </ul>
            <h3 style="color: #4A5568;">Total: $${ticketResponse.amount}</h3>
            <p style="color: #4A5568;">Gracias por su compra. Si tiene alguna pregunta, no dude en contactarnos.</p>
            <footer style="margin-top: 20px; text-align: center;">
              <p style="color: #CBD5E0;">© 2024 SiLoUsotec. Todos los derechos reservados.</p>
            </footer>
          </div>
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
