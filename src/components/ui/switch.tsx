"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
  className={cn(
    "peer inline-flex h-6 w-12 items-center rounded-full border border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",

    // OFF: white background track
    "data-[state=unchecked]:bg-gray-400",

    // ON: gradient background track
    "data-[state=checked]:bg-gradient-to-r from-teal-600 to-blue-600",

    className
  )}
  {...props}
>
  <SwitchPrimitive.Thumb
    className={cn(
      "block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-300",

      "data-[state=unchecked]:translate-x-1 data-[state=checked]:translate-x-6"
    )}
  />
</SwitchPrimitive.Root>

  );
}

export { Switch };
