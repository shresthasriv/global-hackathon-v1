import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "flex h-12 w-full appearance-none rounded-lg border-2 border-[#E5D5C3] bg-white px-4 py-3 pr-10 text-base text-[#3E2723] transition-all",
            "focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "font-sans cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B7355] pointer-events-none" />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
