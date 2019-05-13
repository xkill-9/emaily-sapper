<script>
  // This is using Stripe 3, you need to load "https://js.stripe.com/v3/" script on template.html
  import Modal from "./Modal.svelte";

  let openModal = false;
  // Stripe element created following stripe docs: https://stripe.com/docs/stripe-js/elements/quickstart
  const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);
  const elements = stripe.elements();
  var style = {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  };

  const card = elements.create("card", { style });

  // #card-element is not available in the DOM until the user opens the modal
  // So the card element can't be mounted until the Modal component is rendered.
  function mountCard() {
    card.mount("#card-element");

    card.addEventListener("change", function(event) {
      var displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });
  }

  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById("credit-payment");
    var hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "stripeToken");
    hiddenInput.setAttribute("value", token.id);
    form.appendChild(hiddenInput);

    // Submit the form
    form.submit();
  }

  async function handleSubmit() {
    const result = await stripe.createToken(card);
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById("card-errors");
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  }
</script>

<style>
  [role="alert"] {
    color: #fa755a;
  }
  form button {
    margin-top: 15px;
    width: 100%;
    display: block;
  }

  :global(.StripeElement) {
    box-sizing: border-box;

    height: 40px;

    padding: 10px 12px;

    border: 1px solid #aaa;
    border-radius: 4px;
    background-color: white;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  :global(.StripeElement--focus) {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  :global(.StripeElement--invalid) {
    border-color: #fa755a;
  }

  :global(.StripeElement--webkit-autofill) {
    background-color: #fefde5 !important;
  }
</style>

<button on:click={() => (openModal = true)} class="btn">Add Credits</button>

{#if openModal}
  <Modal on:mount={mountCard} on:close={() => (openModal = false)}>
    <div slot="header">
      <h5>Emaily Credits</h5>
      <h6>Add 5 Emaily credits to your account</h6>
    </div>
    <form
      action="/api/charge"
      method="post"
      id="credit-payment"
      on:submit|preventDefault={handleSubmit}>
      <div class="form-row">
        <label for="card-element">Credit or debit card</label>
        <div id="card-element" class="browser-default" />
        <div id="card-errors" role="alert" />
      </div>
      <button class="btn center-align">Pay $5</button>
    </form>
  </Modal>
{/if}
