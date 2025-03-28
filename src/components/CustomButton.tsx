import { cn } from "@/lib/utils";
import {
  CalendarX2Icon,
  Check,
  ChevronLeft,
  Loader2,
  LogOutIcon,
  LucideIcon,
  LucideProps,
  PencilIcon,
  Plus,
  Trash2Icon,
} from "lucide-react";
import { twJoin } from "tailwind-merge";
import { Button } from "./ui/button";

interface ButtonConfig {
  label?: string | { sm: string; md: string };
  icon?: LucideIcon;
  placeAt?: "start" | "end";
  iconProps?: LucideProps;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}

const buttonConfig: Record<string, ButtonConfig> = {
  select: {
    label: "select",
    variant: "default",
    icon: Plus,
  },
  selected: {
    label: "selected",
    variant: "outline",
    icon: Check,
  },
  back: {
    label: "back",
    variant: "secondary",
    icon: ChevronLeft,
  },
  edit: {
    label: "Edit",
    variant: "outline",
    icon: PencilIcon,
  },
  delete: {
    label: "Delete",
    variant: "destructive",
    icon: Trash2Icon,
  },
  logout: {
    label: "logout",
    variant: "destructive",
    icon: LogOutIcon,
    placeAt: "end",
  },
  cancel: {
    label: "cancel",
    variant: "outline",
    icon: CalendarX2Icon,
  },
};
export type ButtonConfigKeys =
  | "select"
  | "selected"
  | "back"
  | "seeResources"
  | "edit";

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  useFor: keyof typeof buttonConfig;
  hideTextOnMobile?: boolean;
  iconProps?: LucideProps;
  isLoading?: boolean;
}

export const CustomButton = ({
  useFor,
  hideTextOnMobile,
  className,
  isLoading,
  disabled,
  ...props
}: CustomButtonProps) => {
  const config = buttonConfig[useFor];
  const Icon = config?.icon;

  return (
    <Button
      className={cn(
        "flex items-center gap-2 rounded-full transition-all hover:scale-110",
        config?.className,
        hideTextOnMobile && "max-md:size-10 max-md:p-0",
        !config?.label && "size-10 p-0",
        className,
      )}
      variant={config?.variant || "default"}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <>
          {config?.placeAt !== "end" && Icon && (
            <Icon className="size-5" {...config?.iconProps} />
          )}
          {config?.label && (
            <span className={twJoin(hideTextOnMobile ? "hidden sm:block" : "")}>
              {typeof config?.label === "string"
                ? config?.label
                : config?.label.md}
            </span>
          )}
          {config?.placeAt === "end" && Icon && (
            <Icon className="size-5" {...config?.iconProps} />
          )}
        </>
      )}
    </Button>
  );
};
