const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function post(req, res) {
  try {
    await stripe.charges.create({
      amount: 500,
      description: 'Emaily Credit',
      currency: 'usd',
      source: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Purchase Failed' });
  }
}
