<script>
  // This is using Stripe legacy checkout, same as in the course.

  import { stores } from "@sapper/app";
  const { session } = stores();

  const checkoutHandler = StripeCheckout.configure({
    key: process.env.STRIPE_PUBLIC_KEY,
    locale: "auto"
  });

  async function handleToken(token) {
    try {
      const response = await fetch("/api/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token)
      });
      if (!response.ok) {
        throw response;
      }
      const output = await response.json();
      $session = { user: { ...$session.user, credits: output.credits } };
    } catch (error) {
      console.error("Purchase failed: ", error);
    }
  }

  function openCheckout() {
    checkoutHandler.open({
      name: "Emaily Credit",
      amount: 500,
      currency: "usd",
      description: "Credit for campaigns/surveys",
      token: handleToken
    });
  }
</script>

<button on:click={openCheckout} class="btn">Add Credit</button>
