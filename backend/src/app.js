const express = require('express');
const config = require('./config/config.js');
const path = require('path');
const productsRouter = require('./routes/products.routes.js');
const cartRouter = require('./routes/cart.routes.js');
const sessionsRouter = require('./routes/sessions.routes.js');
const usersRouter = require('./routes/users.routes.js');
const ticketRoutes = require('./routes/ticket.routes.js');
const categoryRoutes = require('./routes/category.routes.js');
const chatRoutes = require('./routes/chat.routes.js');
const socketConfig = require('./config/socketConfig');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const inicializaPassport = require('./config/passport.config');
const { addLogger } = require('./utils/logger.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');


const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = config.PORT || 3000;

// Create HTTP server and configure Socket.io
const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${isProduction ? config.PRODUCTION_URL : `http://localhost:${port}`}`);
});




const origin = isProduction
  ? ['https://www.silouso.shop']
  : ['http://localhost:5173', 'http://localhost:8080'];
console.log(`Origin: ${origin}`);

app.use(
  cors({
    origin: origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/../public')));
app.use(cookieParser());
app.use(addLogger);

// Swagger Documentation
const specs = swaggerJSDoc(require('./utils/swaggerOptions.js'));
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Passport
inicializaPassport();
app.use(passport.initialize());

// Routes
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/api/tickets', ticketRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/chat', chatRoutes);



const io = socketConfig(httpServer);

app.use((req, res, next) => {
  req.io = io;
  next();
});
