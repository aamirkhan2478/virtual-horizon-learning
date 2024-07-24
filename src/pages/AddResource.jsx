import Select from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useCreateResource } from "@/hooks/useResources";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
function AddResource({ title }) {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const Resources = () => {
    // Navigate Resources Page
    navigate("/dashboard/resources");
  };

  const [resource, setResource] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videos: [],
    pdf: "",
    type: "",
  });

  const { mutate, isLoading } = useCreateResource(onSuccess, onError);

  const [selectedType, setSelectedType] = useState("");

  const types = [
    { value: "Video", label: "Video" },
    { value: "PDF", label: "PDF" },
  ];

  const handleTypeChange = (e) => {
    const value = e.target ? e.target.value : e;
    setSelectedType(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setResource({ ...resource, [name]: files });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const covertArray = Array.from(resource.videos);
    const formData = new FormData();
    formData.append("title", resource.title);
    formData.append("description", resource.description);
    formData.append("thumbnail", resource.thumbnail[0]);
    formData.append("type", selectedType);

    if (selectedType === "Video") {
      covertArray.forEach((video) => {
        formData.append("video", video);
      });
    } else {
      formData.append("pdf", resource.pdf[0]);
    }

    mutate(formData, {
      onSuccess: () => {
        toast({
          variant: "default",
          title: "Resource Added Successfully!",
          className: "bg-green-500 text-white",
        });
      },
      onError: (error) => {
        onError(error);
      },
    });
  };

  function onSuccess() {
    toast({
      variant: "default",
      title: "Resource Added Successfully!",
      className: "bg-green-500 text-white",
    });
  }

  function onError(error) {
    console.log(error);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.response?.data?.message,
    });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Add Resource</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={Resources}>
                <ArrowRight className="h-6 w-6 font-bold" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Go Back</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-1">
        <Card>
          <CardContent className="pt-5 sm:pt-5 md:pt-5 lg:pt-5">
            <div className="grid grid-cols-1 sm:md:lg:grid-cols-2 gap-4">
              <div className="w-full">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  className="w-full"
                  onChange={handleInputChange}
                  name="title"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter description"
                  className="w-full"
                  onChange={handleInputChange}
                  name="description"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="type">Select Type</Label>
                <Select
                  id="selectType"
                  value={selectedType}
                  data={types}
                  onChange={handleTypeChange}
                  className="w-full"
                  name="type"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input
                  type="file"
                  id="thumbnail"
                  className="w-full"
                  accept="image/*"
                  onChange={handleFileChange}
                  name="thumbnail"
                />
              </div>
              {selectedType === "Video" && (
                <div className="w-full">
                  <Label htmlFor="videoFile">Video File</Label>
                  <Input
                    type="file"
                    id="videos"
                    className="w-full"
                    accept="video/*"
                    onChange={handleFileChange}
                    name="videos"
                    multiple
                  />
                </div>
              )}
              {selectedType === "PDF" && (
                <div className="w-full">
                  <Label htmlFor="pdfFile">PDF File</Label>
                  <Input
                    type="file"
                    id="pdfFile"
                    className="w-full"
                    accept=".pdf"
                    onChange={handleFileChange}
                    name="pdf"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center md:lg:justify-end mt-4">
              <Button
                size="sm"
                disabled={isLoading}
                className="w-full md:w-auto"
                variant="outline"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Add Resource"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// props validation
AddResource.propTypes = {
  title: PropTypes.string,
};

export default AddResource;
