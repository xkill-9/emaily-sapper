<script>
  // This is using Stripe legacy checkout, same as in the course.

  import { attemptCharge } from "./_attemptCharge.js";

  const checkoutHandler = StripeCheckout.configure({
    key: process.env.STRIPE_PUBLIC_KEY,
    locale: "auto"
  });

  function openCheckout() {
    checkoutHandler.open({
      name: "Emaily Credit",
      amount: 500,
      currency: "usd",
      description: "Add 5 Emaily credits to your account",
      token: attemptCharge
    });
  }
</script>

<a
  title="Stripe V2"
  href="javascript:void(0)"
  on:click={openCheckout}
  class="btn light-blue lighten-1">
  Add Credits
</a>
