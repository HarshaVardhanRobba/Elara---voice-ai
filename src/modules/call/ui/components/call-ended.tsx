import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CallEnded = () => {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg rounded-xl bg-gray-800 p-6 shadow-lg">
        <div className="flex flex-col items-center gap-4">

          <div className="text-center">
            <h6 className="text-lg font-semibold">You have Ended the call</h6>
            <p className="text-sm text-gray-400">
              Summary will appea in few Minutes
            </p>
          </div>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
