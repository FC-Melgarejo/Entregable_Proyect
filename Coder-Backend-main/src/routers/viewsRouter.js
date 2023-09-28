const { Router } = require('express');
const passport = require('passport');
const userModel = require('../dao/UserManagerMongo');
const ProductManagerMongo = require('../dao/ProductManagerMongo');
const io = require('../utils/io');
const viewsController = require('../controllers/viewsController');

const viewsRouter = new Router();
const productManager = new ProductManagerMongo(io);

function sessionMiddleware(req, res, next) {
    if (req.session.user) {
        return res.redirect('/profile');
    }
    return next();
}

viewsRouter.get('/github', passport.authenticate('github'));
viewsRouter.get('/github-callback', passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/login',
}));

viewsRouter.get('/register', sessionMiddleware, viewsController.renderRegister);
viewsRouter.get('/login', viewsController.renderLogin);
viewsRouter.get('/api/sessions/recovery-password', sessionMiddleware, viewsController.renderRecoveryPassword);
viewsRouter.get('/profile', viewsController.renderProfile);
viewsRouter.get('/allproducts', viewsController.renderAllProducts);
viewsRouter.get('/home', viewsController.renderHome);
viewsRouter.get('/realtimeproducts', viewsController.renderRealTimeProducts);
viewsRouter.get('/products', viewsController.renderProducts);
viewsRouter.get('/chat', viewsController.renderChat);
viewsRouter.get('/error', viewsController.renderError);

module.exports = viewsRouter;




