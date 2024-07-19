import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FilePlus2, ShoppingBasket, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Resources({ title }) {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const [loading, setLoading] = useState(true);

  const cards = [
    {
      title: "Card 1",
      description: "This is a description for card 1.",
      imageSrc: "https://via.placeholder.com/400x200",
    },
    {
      title: "Card 2",
      description: "This is a description for card 2.",
      imageSrc: "https://via.placeholder.com/400x200",
    },
    {
      title: "Card 3",
      description: "This is a description for card 3.",
      imageSrc: "https://via.placeholder.com/400x200",
    },
    {
      title: "Card 4",
      description: "This is a description for card 4.",
      imageSrc: "https://via.placeholder.com/400x200",
    },
  ];

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const navigate = useNavigate();

  const addResource = () => {
    // Navigate User Profile Page
    navigate("/dashboard/add-resource");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Resources</h1>
        {user?.userType === "Admin" && (
          <Button size="icon" onClick={addResource}>
            <FilePlus2 className="h-6 w-6 font-bold" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array(cards.length)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="border rounded shadow p-3">
                  <Skeleton className="w-full h-40 mb-4" />
                  <Skeleton className="w-3/4 h-6 mb-2" />
                  <Skeleton className="w-1/2 h-5 mb-4" />
                  <Skeleton className="w-full h-10" />
                </div>
              ))
          : cards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="p-0">
                  <img
                    src={card?.imageSrc}
                    alt="Card Image"
                    className="w-full h-auto rounded-t"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle>{card?.title}</CardTitle>
                  <CardDescription>{card?.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4">
                  {user?.userType === "Student" && (
                    <>
                      <Button size="sm">
                        <ShoppingBasket className="h-4 w-4 mr-2" /> Buy
                      </Button>
                    </>
                  )}
                  {user?.userType === "Teacher" && (
                    <Button size="sm">
                      <UserCheck className="h-4 w-4 mr-2" /> Assign
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
      </div>
    </>
  );
}

export default Resources;
