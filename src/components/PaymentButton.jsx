import PropTypes from "prop-types";
import { useMakePayment } from "@/hooks/useResources";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { ShoppingBasket } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

const PaymentButton = ({ userId, resourceId, amount }) => {
  const { mutate, isLoading } = useMakePayment(onSuccess, onError);
  const { toast } = useToast();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const handleSubmit = async () => {
    try {
      // Create payment intent on the server
      mutate(
        { userId, resourceId, amount },
        {
          onSuccess: async (data) => {
            const id = data;
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
              sessionId: id,
            });
            if (error) {
              toast({
                variant: "destructive",
                title: "Payment failed",
                description: error.message,
              });
            }
          },
        }
      );
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err?.response?.data?.message,
      });
    }
  };

  function onSuccess() {
    toast({
      variant: "default",
      title: "Redirecting to payment gateway",
      className: "bg-green-500 text-white",
    });
  }

  function onError(error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.response?.data?.message,
    });
  }
  return (
    <>
      <Button onClick={handleSubmit} disable={isLoading}>
        {isLoading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          <>
            <ShoppingBasket size={18} className="mr-2" /> Buy Now
          </>
        )}
      </Button>
    </>
  );
};

// props validation
PaymentButton.propTypes = {
  userId: PropTypes.number.isRequired,
  resourceId: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};

export default PaymentButton;
