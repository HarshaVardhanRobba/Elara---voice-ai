import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

interface AvatarProps {
    seed: string;
    variant?: "botttsNeutral" | "initials";
}

export const GenerateAvatarUri = ({seed, variant }: AvatarProps) => {
    let avatar;

    if (variant === "botttsNeutral") {
        avatar = createAvatar(botttsNeutral, {
            seed: seed,
            size: 40,
        });
    } else {
        avatar = createAvatar(initials, {
            seed: seed,
            fontSize: 40,
            fontWeight: 600,
        });
    }

    return avatar.toDataUri();
}