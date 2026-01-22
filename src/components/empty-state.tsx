
import { AlertCircleIcon } from "lucide-react";
import Image from "next/image";

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <Image src="/empty.svg" width={280} height={280} alt="error" />
        <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
          <h6 className="mb-1 text-lg font-large text-foreground">
            {title}
          </h6>
          <p className="text-center text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
  );
};
