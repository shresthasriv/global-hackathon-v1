import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border-2 border-[#E5D5C3] bg-white px-4 py-3 text-base text-[#3E2723] placeholder:text-[#8B7355]/50 transition-all",
          "focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "font-sans",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
