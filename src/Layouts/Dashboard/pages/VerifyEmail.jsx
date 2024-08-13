import { useNavigate, useParams } from "react-router-dom";
import { useVerify } from "@/hooks/useAuth";
import { useToast } from "@/Layouts/Dashboard/components/ui/use-toast";
import svg from "../assets/illustration.svg";
import { Button } from "@/Layouts/Dashboard/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import PropTypes from "prop-types";

const VerifyEmail = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate, isLoading } = useVerify(onSuccess, onError);

  const handleVerify = () => {
    mutate(
      { token },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  function onSuccess(data) {
    toast({
      variant: "default",
      title: "Verification Successful!",
      description: data?.data?.data?.message,
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
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="hidden bg-muted lg:block">
          <img
            src={svg}
            alt="Image"
            width="879"
            height="581"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center py-12 flex-row-reverse">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Verify Your Account</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Click below button to verify your account
              </p>
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full"
              onClick={handleVerify}
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Verify Now"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// props validation
VerifyEmail.propTypes = {
  title: PropTypes.string,
};

export default VerifyEmail;
