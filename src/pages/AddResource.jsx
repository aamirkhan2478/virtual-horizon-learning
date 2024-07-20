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
import { ArrowRight, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddResource({ title }) {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const navigate = useNavigate();

  const Resources = () => {
    // Navigate Resources Page
    navigate("/dashboard/resources");
  };

  const [selectedType, setSelectedType] = useState("");

  const types = [
    { value: "Video", label: "Video" },
    { value: "PDF", label: "PDF" },
  ];

  const handleTypeChange = (e) => {
    const value = e.target ? e.target.value : e;
    setSelectedType(value);
  };

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
                />
              </div>
              <div className="w-full">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter description"
                  className="w-full"
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
                />
              </div>
              <div className="w-full">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input type="file" id="thumbnail" className="w-full" />
              </div>
              {selectedType === "Video" && (
                <div className="w-full">
                  <Label htmlFor="videoFile">Video File</Label>
                  <Input
                    type="file"
                    id="video"
                    className="w-full"
                    accept="video/*"
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
                    accept="image/*"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center md:lg:justify-end mt-4">
              <Button size="sm" className="w-full md:w-auto" variant="outline">
                Add Resource
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default AddResource;
