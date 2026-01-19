"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">You are not signed in</h1>
      <Button onClick={() => router.push("/sign-in")}>
        Sign In
      </Button>
    </div>
  );
}


  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {session.user.name ?? "User"}!
      </h1>
      <Button
        onClick={() => {
          authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/sign-in") }})}
        }
      >
        Sign Out
      </Button>
      </div>
    );
  }
