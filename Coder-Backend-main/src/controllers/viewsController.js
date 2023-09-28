const renderRegister = (req, res) => {
    return res.render('register');
}

const renderLogin = (req, res) => {
    return res.render('login');
}

const renderRecoveryPassword = (req, res) => {
    return res.render('recovery-password');
}

const renderProfile = (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
    }

    return res.render('profile', { user });
}

const renderAllProducts = async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('products/allProducts', { products, cartId: 'your_cart_id' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos', message: error.message });
    }
}
const renderRealTimeProducts = async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const limit = req.query.limit;

        if (products.length === 0) {
            return res.render('realtime-products', { title: 'Productos en Tiempo Real', noProducts: true });
        }

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit));
            return res.render('realtime-products', { title: 'Productos en Tiempo Real', products: limitedProducts });
        }

        return res.render('realtime-products', { title: 'Productos en Tiempo Real', products });
    } catch (error) {
        return res.redirect('/error?message=Error al obtener los productos en tiempo real');
    }
}


const renderChat = (req, res) => {
    return res.render('chat', { title: 'Chat', style: 'styles.css' });
}

const renderError = (req, res) => {
    const errorMessage = req.query.message || 'Ha ocurrido un error';
    res.render('error', { title: 'Error', errorMessage: errorMessage });
}

module.exports = {
    renderRegister,
    renderLogin,
    renderRecoveryPassword,
    renderProfile,
    renderAllProducts,
    renderRealTimeProducts,
    renderChat,
    renderError
}
