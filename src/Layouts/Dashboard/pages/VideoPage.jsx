import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { Card, CardContent } from "@/Layouts/Dashboard/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/Layouts/Dashboard/components/ui/button";
import { useGetResource } from "@/hooks/useResources";
import { Video } from "reactjs-media";
import PropTypes from "prop-types";

function VideoPage({ title }) {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetResource(id);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const Resources = () => {
    // Navigate to Resource Details Page
    navigate(`/dashboard/resource-details/${id}`);
  };

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
  };

  useEffect(() => {
    if (data && data.videos && data.videos.length > 0) {
      setCurrentVideoIndex(0);
    }
  }, [data]);

  const videos = data?.videos.split(",");
  console.log("videos", videos);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Video Page</h1>
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
      <div className="flex">
        <div className="flex-1">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              {videos.length > 0 && (
                <Video
                  key={currentVideoIndex} // Unique key to force re-mount
                  src={videos[currentVideoIndex]}
                  poster={data.thumbnail}
                  controls={true}
                  className="w-full h-full rounded"
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div
          className="w-1/3 pl-4 overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          <h2 className="text-lg font-semibold mb-2">Playlist</h2>
          <div className="flex flex-col space-y-4">
            {videos.map((videoSrc, index) => (
              <div
                key={index}
                onClick={() => handleVideoSelect(index)}
                className={`cursor-pointer ${currentVideoIndex === index ? "border-2 border-blue-500" : ""}`}
              >
                <Video
                  src={videoSrc}
                  poster={data.thumbnail}
                  controls={false}
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// props validation
VideoPage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default VideoPage;
