const express = require('express');
const app = express();
const config = require('./config/config.js');
const factory = require('./dao/factory.js');
const path = require('path');
const productsRouter = require('./routes/products.routes.js');
const cartRouter = require('./routes/cart.routes.js');
const sessionsRouter = require('./routes/sessions.routes');
const usersRouter = require('./routes/users.routes.js');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const inicializaPassport = require('./config/passport.config');
const { addLogger } = require('./utils/logger.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const cors = require('cors');

const ticketRoutes = require('./Routes/ticket.routes');
const categoryRoutes = require('./Routes/category.routes');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/../public')));
app.use(cookieParser());
app.use(addLogger);

const specs = swaggerJSDoc(require('./utils/swaggerOptions.js'));
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

inicializaPassport();
app.use(passport.initialize());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.set('views', path.join(__dirname + '/views'));

// Routes
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/api/tickets', ticketRoutes);
app.use('/api/categories', categoryRoutes);

const serverExpress = app.listen(config.PORT, () =>
  console.log(`Server running on http://localhost:${config.PORT}`)
);
const io = new Server(serverExpress);
require('./sockets/socket')(io);
