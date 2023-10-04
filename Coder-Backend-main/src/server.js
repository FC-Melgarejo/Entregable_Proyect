const express = require('express');
const productsRouter = require('./routers/productsRouter')
const viewsRouter = require('./routers/viewsRouter')
const passport = require('passport');
const initializePassport = require('./config/passport.config');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const sessionRouter = require('./routers/sessionRouter');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
const handlebars = require('express-handlebars')


const app = express();

app.use(cookieParser('secretCookie'))

// Configuración handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')




const MONGODB_CONNECT = 'mongodb+srv://melgarejofatimacarolina:8g3ZKFx4JtMWDIRS@cluster0.rhfgipr.mongodb.net/PruebaIntegradora2?retryWrites=true&w=majority'
mongoose.connect(MONGODB_CONNECT)
.then(()=>console.log('conexion DB'))
.catch((error) => console.log(error))


app.use(express.json());
app.use(flash());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(session({
    store: MongoStore.create({
      mongoUrl: MONGODB_CONNECT,
      ttl: 15
    }),
    secret: 'secretSession',
    resave: true,
    saveUninitialized: true
  }))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productsRouter)
app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter);



app.get('/', (req, res) => {
    res.json({
        status: 'running',
        
    })
})



const PORT = 8080;
app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));
