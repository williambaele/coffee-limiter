"use client";

import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Home() {
  // Constants
  const [consumptionLoading, setConsumptionLoading] = useState(true);
  const [userChosen, setUserChosen] = useState(false);
  const [userCups, setUserCups] = useState(5);

  // Fetching data from local storage
  useEffect(() => {
    const remainingLives = localStorage.getItem("RemainingLives");
    const lastCoffeeTime = localStorage.getItem("LastCoffeeTime");
    const userCupsNb = localStorage.getItem("userCupsNb");

    if (userCupsNb) {
      setUserCups(Number(userCupsNb));
      setUserChosen(true);
      setConsumptionLoading(false);
    }

    if (remainingLives) {
      setUserCups(Number(remainingLives));
      setConsumptionLoading(false);
    }

    if (lastCoffeeTime) {
      const lastCoffeeDate = new Date(parseInt(lastCoffeeTime));
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if (lastCoffeeDate < yesterday) {
        setUserCups(Number(userCupsNb)); // Reset user's chosen daily consumption to default value
        localStorage.setItem("RemainingLives", JSON.stringify(userCupsNb));
        setConsumptionLoading(false);
      }
    }
  }, []);


  // Handle setting user's daily consumption
  const handleUserCups = () => {
    setUserChosen(true);
    localStorage.setItem("userCupsNb", JSON.stringify(userCups));
    setConsumptionLoading(false);

  };

  // Handle consuming a coffee
  const handleCoffee = () => {
    if (userCups > 0) {
      setUserCups(userCups - 1);
      localStorage.setItem("RemainingLives", JSON.stringify(userCups - 1));
      localStorage.setItem(
        "LastCoffeeTime",
        JSON.stringify(new Date().getTime())
      );
    }
  };

  const RemainingLives = () => {
    if (userCups >= 2) {
      return <p>Enjoy your day with {userCups} coffees</p>;
    } else if (userCups === 1) {
      return <p>Last coffee. Enjoy it</p>;
    } else if (userCups === 0) {
      return <p>Time to stop drinking coffee for today</p>;
    }
  };

  return (
    <>
      <main className="flex h-screen flex-col items-center space-y-20 justify-center">
        <div className="flex flex-col space-y-4 items-center">
          <h1 className="text-5xl lg:text-6xl font-bold">Coffee Limiter</h1>
          <p className="text-center text-sm lg:text-lg">
            This has been made by a coffee addict for coffee addicts.
            <br />
            Manage easily your coffee consumption with a simple countdown.
            Don&apos;t overdo it.
          </p>
        </div>

        {userChosen ? (
          <>
            <Button className="rounded-xl" onClick={handleCoffee}>
              <Coffee className="mr-2 h-4 w-4" /> Just drank a coffee
            </Button>
            {consumptionLoading ? (
              <p>Loading consumption</p>
            ) : (
              <RemainingLives />
            )}
          </>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-xl">Set daily consumption</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-lg">
              <DialogHeader>
                <DialogTitle>Choose a target</DialogTitle>
                <DialogDescription>
                  Set a daily consumption you are not going to exceed.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  id="link"
                  defaultValue={userCups}
                  onChange={(e) => setUserCups(Number(e.target.value))}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleUserCups}
                >
                  Set
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </>
  );
}
