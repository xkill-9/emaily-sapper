<script>
  // This is using Stripe 3, you need to load "https://js.stripe.com/v3/" script on template.html
  import { fade } from "svelte/transition";

  import { attemptCharge } from "./_attemptCharge.js";
  import Modal from "./Modal.svelte";

  let showModal = false;
  let sendingPayment = false;

  // Stripe element created following stripe docs: https://stripe.com/docs/stripe-js/elements/quickstart
  const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);
  const elements = stripe.elements();
  const style = {
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

  async function handleSubmit() {
    sendingPayment = true;
    const result = await stripe.createToken(card);
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById("card-errors");
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      await attemptCharge({ id: result.token.id });
      sendingPayment = false;
      showModal = false;
    }
  }

  function closeModal() {
    if (sendingPayment) return;
    showModal = false;
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

  fieldset {
    border: 0;
    padding: 0;
  }

  #modal-wrapper {
    position: absolute;
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

<a
  title="Stripe V3"
  href="javascript:void(0)"
  on:click={() => (showModal = true)}
  class="btn indigo accent-2">
  Add Credits
</a>

{#if showModal}
  <div id="modal-wrapper" transition:fade={{ duration: 200 }}>
    <Modal on:mount={mountCard} on:close={closeModal}>
      <div slot="header">
        <h5>Emaily Credits</h5>
        <h6>Add 5 Emaily credits to your account</h6>
      </div>
      <form id="credit-payment" on:submit|preventDefault={handleSubmit}>
        <fieldset class="form-row" disabled={sendingPayment}>
          <label for="card-element">Credit or debit card</label>
          <div id="card-element" class="browser-default" />
          <div id="card-errors" role="alert" />
          <button class="btn indigo accent-2 center-align">Pay $5</button>
        </fieldset>
      </form>
    </Modal>
  </div>
{/if}
