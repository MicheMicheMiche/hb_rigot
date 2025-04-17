import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-vintage-blue" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="opacity-0 block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background" />
    {props.value && Array.isArray(props.value) && props.value.length > 1 && (
      <SliderPrimitive.Thumb className="opacity-0 block h-5 w-5 rounded-full border-2 border-primary bg-background" />
    )}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }