const express = require('express');
const dotenv = require('dotenv');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// Initializations
const app = express();
dotenv.config();
require('./database');
require('./passport/local-auth');

// Settings
app.set('port', process.env.PORT || 3001);
const PORT = app.get('port');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(`${process.env.PREFIX_APP}`, express.static(path.join(__dirname, 'public'))); // Set static files folder, using subroute prefix

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencoded. VER NOTA-1
app.use(session({ // VER NOTA-2 ABAJO
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); // Debe ir antes de la configuracion de "passport" y despues de "session"
app.use(passport.initialize());
app.use(passport.session());

// Middlewares propio para el manejo de los mensajes "flash". VER NOTA-3 ABAJO
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    app.locals.prefixApp = process.env.PREFIX_APP; // Variable de entorno que contiene
    console.log(app.locals); // la subruta, para que este disponible en las vistas
    next();
});

// Routes
app.use(require('./routes/index')); // Las rutas se han prefijado en el router. La razon por la que no se prefijan aqui es que passport no es capaz de redigir adecuadamente

// Start server
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});


/* 
    NOTA-1:
    https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327#51844327
    https://youtu.be/uVltgEcjNww?t=2233
    NOTA-2. VER:
    https://devcode.la/tutoriales/como-configurar-sesiones-en-expressjs/
    https://www.npmjs.com/package/express-session
    https://github.com/expressjs/session
    NOTA-3. VER:
    https://youtu.be/uVltgEcjNww?t=5336
*/