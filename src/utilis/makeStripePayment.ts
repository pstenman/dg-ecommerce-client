import { loadStripe } from "@stripe/stripe-js";
import { API_URL } from "../services/basicServices";

  export const makeStripePayment = async (stripeData: any, orderId: string, updateOrder: Function) => {
    try {
      const stripe = await loadStripe("pk_test_51R5pvlQ1VZRRylFbILx1zpZs6f9geDAn7YlMOZTnrYb7j96RcSRGbH2AbnDz7RjsOHad9VYbRygWWsNFo6RqAuxl004VUQLDgk");
      if (!stripe) {
        console.error("Stripe.js failed to load.");
        return;
      }

      const body = stripeData;

      const headers = {
        "Content-Type": "application/json",
      };
  
      const response = await fetch(`${API_URL}/stripe/create-checkout-session-hosted`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        console.error(`Failed to create checkout session: ${response.statusText}`);
        return;
      }

      const session = await response.json();
      if (session && session.id) {


        const updateResult = await updateOrder(orderId, { payment_status: "Unpaid",payment_id: session.id, order_status: "Pending" });
        console.log("Order updated:", updateResult);
        
        await stripe.redirectToCheckout({ sessionId: session.id });
        return session;
      } else {
        console.error("No session ID returned from the backend.");
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };