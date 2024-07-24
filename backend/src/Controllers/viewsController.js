import fs from 'fs';
import config from '../Configs/config.js';
import { io } from '../app.js';
import productsControllers from './productsControllers.js';

export class viewsController {
 

    homeView = async (req, res) => {
        try {
            const { products } = await productsControllers.getAllProductsController(req, res);
            console.log(`productos de la base de datos: ${products}`);
            res.render("home", { title: "Home", style: "styles.css", products: products });
        } catch (error) {
            console.error('Error al obtener todos los productos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    realTimeProductView = (req, res) => {
        const productsData = JSON.parse(fs.readFileSync(`${config.DIRNAME}/Mocks/productos.json`, 'utf8'));
        res.render('realTimeProducts', { title: "Admin", products: productsData, style: "styles.css" });
    }

    chat(req, res) {
        io.emit('message', 'Nuevo usuario conectado');
        res.render('chat', { title: 'chat', style: 'styles.css' });
    }
}
