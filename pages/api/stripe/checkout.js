import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { planId, userId, email } = req.body;

        if (!planId || !userId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Precios hardcodeados temporales. Idealmente vienen de Stripe Dashboard.
        const prices = {
            premium_monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY || 'price_premium_monthly_id',
            vip_monthly: process.env.STRIPE_PRICE_VIP_MONTHLY || 'price_vip_monthly_id',
        };

        const priceId = prices[planId];
        
        if (!priceId) {
            return res.status(400).json({ error: 'Invalid plan ID' });
        }

        // Crear sesión de Checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            customer_email: email,
            client_reference_id: userId,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/planes?canceled=true`,
        });

        res.status(200).json({ sessionId: session.id, url: session.url });
    } catch (err) {
        console.error('Error creating Stripe checkout session:', err);
        res.status(500).json({ error: 'Error generating checkout session' });
    }
}
