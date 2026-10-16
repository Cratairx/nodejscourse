const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.paymentIntents.create({
            amount: 500,
            currency: 'usd',
            description: 'Charged for credit',
            automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
            payment_method_data: {
                type: 'card',
                card: { token: req.body.id },
            },
            confirm: true,
        });

        console.log(charge);
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};