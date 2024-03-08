"use client";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [lives, setLives] = useState(5);
  const [consumptionLoading, setConsumptionLoading] = useState(true);
  useEffect(() => {
    const remainingLives = localStorage.getItem("RemainingLives");
    const lastCoffeeTime = localStorage.getItem("LastCoffeeTime");

    if (remainingLives) {
      setLives(JSON.parse(remainingLives));
      setConsumptionLoading(false);
    }

    if (lastCoffeeTime) {
      const lastCoffeeDate = new Date(parseInt(lastCoffeeTime));
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if (lastCoffeeDate < yesterday) {
        // Reset lives if the last coffee was consumed yesterday
        setLives(5);
        localStorage.setItem("RemainingLives", JSON.stringify(5));
      }
      setConsumptionLoading(false);
    }
  }, []);

  const handleCoffee = () => {
    if (lives > 0) {
      setLives(lives - 1);
      localStorage.setItem("RemainingLives", JSON.stringify(lives - 1));
      localStorage.setItem(
        "LastCoffeeTime",
        JSON.stringify(new Date().getTime())
      );
    }
  };

  const RemainingLives = () => {
    if (lives === 5) {
      return <p>Enjoy your day with 5 coffees</p>;
    } else if (lives === 4) {
      return <p>4 coffees left</p>;
    } else if (lives === 3) {
      return <p>3 coffees left</p>;
    } else if (lives === 2) {
      return <p>2 coffees left</p>;
    } else if (lives === 1) {
      return <p>Last coffee. Enjoy it</p>;
    } else if (lives === 0) {
      return <p>Time to stop drinking coffee for today</p>;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 lg:p-24 space-y-20 justify-center">
      <div className="flex flex-col space-y-4 items-center">
        <h1 className="text-5xl lg:text-6xl font-bold">Coffee Limiter</h1>
        <p className="text-center text-sm lg:text-lg">
          This has been made by a coffee addict for coffee addicts.
          <br />
          Manage easily your coffee consumption with a simple countdown.
          Don&apos;t overdo it.
        </p>
      </div>
      <Button className="rounded-xl" onClick={handleCoffee}>
        <Coffee className="mr-2 h-4 w-4" /> Just drank a coffee
      </Button>
      {consumptionLoading ? <p>Loading consumption</p> : <RemainingLives />}
    </main>
  );
}
