"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {  CreditCardIcon, LogOutIcon } from "lucide-react";
import { user } from "@/db/schema";
import { GeneratedAvatar } from "@/components/generated-avatar";

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  const onLogout = () => {
    authClient.signOut({
        fetchOptions: { 
            onSuccess: () => {
            router.push("/sign-in");
        }
    }
    });
  }

  if (isPending || !data?.user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-border/10 p-3 w-full bg-white/5 hover:bg-white/10 font-medium overflow-hidden">
          {data.user.image ? (
            <Avatar>
                <AvatarImage src={data.user.image} />
            </Avatar>
          ) : ( <GeneratedAvatar seed={data.user.name ?? data.user.email}
            variant="initials"
            className="size-9 mr-3" />)}
          <span className="max-w-[120px] truncate">
            {data.user.name ?? data.user.email}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
            <span className="font-medium truncate ">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
          
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
            Billing
            <CreditCardIcon className="size-4" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;