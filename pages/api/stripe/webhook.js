import { buffer } from 'micro';
import Stripe from 'stripe';
import { supabase } from '../../../lib/supabase'; // Asegúrate de tener SERVICE_ROLE_KEY si RLS bloquea server-to-server 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

// Desactivar el body parser automático de Next.js para poder verificar la firma de Stripe
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function webhookHandler(req, res) {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            console.error('Webhook Error:', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Manejar el evento de checkout completado
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.client_reference_id;
            const customerEmail = session.customer_email;

            if (userId) {
                try {
                    // Update user's plan in Supabase
                    const { error } = await supabase
                        .from('user_subscriptions')
                        .upsert({
                            user_id: userId,
                            plan_id: 'pro', // ideally dynamically determined by line items
                            status: 'active',
                            updated_at: new Date().toISOString()
                        });

                    if (error) throw error;
                    console.log(`Successfully upgraded user ${userId} to PRO plan limit.`);
                } catch (error) {
                    console.error('Error updating user subscription in DB:', error);
                }
            }
        }

        res.status(200).json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
