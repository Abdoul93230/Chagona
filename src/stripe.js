import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51NTBUGC7C5yFcKIWlaOO5Muq4TxC2aZnGYzIrePcwooC6bpREC4aLYM6o0wouo8koRwTvg0VhAhGm2a4Rqk08Rh400xMeYYLEj"
);

export default stripePromise;
