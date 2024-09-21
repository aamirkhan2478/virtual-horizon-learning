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
import ReactPlayer from "react-player";
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
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold md:text-2xl text-gray-800">
          Video Page
        </h1>
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
        {/* Main Video Player */}
        <div className="flex-1 mr-6">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              {videos.length > 0 && (
                <ReactPlayer
                  key={currentVideoIndex}
                  url={videos[currentVideoIndex]}
                  playing={true}
                  controls={true}
                  width="100%"
                  height="100%"
                  className="react-player"
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Playlist */}
        <div
          className="w-1/3 pl-4 overflow-y-auto bg-gray-50 rounded-lg"
          style={{ maxHeight: "80vh" }}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Playlist</h2>
          <div className="flex flex-col space-y-4">
            {videos.map((videoSrc, index) => (
              <div
                key={index}
                onClick={() => handleVideoSelect(index)}
                className={`cursor-pointer p-2 rounded-lg border ${
                  currentVideoIndex === index
                    ? "border-2 border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={data.thumbnail}
                    alt={`Thumbnail for video ${index + 1}`}
                    className="w-16 h-16 rounded object-cover mr-4"
                  />
                  <div className="text-sm font-semibold text-gray-700">
                    Video {index + 1}
                  </div>
                </div>
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
