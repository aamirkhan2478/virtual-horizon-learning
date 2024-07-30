import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PropTypes from "prop-types";
import { useEffect } from "react";

const CancelPayment = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);
  return (
    <>
      <div className="flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <CardContent className="flex flex-col items-center text-center">
            <X className="text-red-500 w-16 h-16 mb-5" />
            <h1 className="sm:text-sm md:lg:text-2xl font-bold mb-5">
              Payment Cancelled
            </h1>
            <p className="text-sm font-semibold mb-5">
              Your payment was cancelled. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// props validation
CancelPayment.propTypes = {
  title: PropTypes.string,
};

export default CancelPayment;
