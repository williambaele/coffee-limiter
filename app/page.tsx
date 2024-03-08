import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-20 justify-center">
      <div className="flex flex-col space-y-4 items-center">
        <h1 className="text-6xl font-bold">Coffee Limiter</h1>
        <p className="text-center">
          This has been made by a coffee addict for coffee addicts.<br/>
          Manage easily your coffee consumption with a simple coutdown. Don&apos;t
          overdo it.
        </p>
      </div>
      <Button className="rounded-xl">
        <Coffee className="mr-2 h-4 w-4" /> Just drank a coffee
      </Button>
    </main>
  );
}
