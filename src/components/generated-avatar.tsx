import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  variant?: "botttsNeutral" | "initials";
  className?: string;
}

export const GeneratedAvatar = ({
    seed,
    variant,
    className
}: GeneratedAvatarProps) => {
    let avatar;

    if (variant === "botttsNeutral") {
        avatar = createAvatar(botttsNeutral, {
            seed: seed,
            size: 40,
        });
    } else {
        avatar = createAvatar(initials, {
            seed: seed,
            size: 40,
        });
    }

    const avatarSrc = avatar.toDataUri();

    return (
        <Avatar className={cn(className)}>
      <AvatarImage src={avatarSrc} alt={seed} />
      <AvatarFallback>
        {seed.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    )
}