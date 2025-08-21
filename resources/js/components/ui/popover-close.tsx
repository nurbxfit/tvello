import { Close } from "@radix-ui/react-popover"

export function PopoverClose({
    ...props
}: React.ComponentProps<typeof Close>) {
    return <Close data-slot="popover" {...props} />
}