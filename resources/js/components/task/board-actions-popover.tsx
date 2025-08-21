import { Board } from "@/types/task";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash, X } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { useForm } from "@inertiajs/react";

export const BoardActionsPopOver = ({ board }: { board: Board }) => {
    const { delete: destroy } = useForm()

    const handleDelete = () => {
        destroy(`/boards/${board.id}`)
    }

    return (
        <div className="flex items-center gap-x-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 h-8 w-8 p-0"
                        aria-label="Board options"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                    <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                        Actions
                    </div>
                    <PopoverClose asChild>
                        <Button
                            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                            variant={"ghost"}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </PopoverClose>
                    <Button
                        onClick={handleDelete}
                        variant={"ghost"}
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-rose-700"
                    >
                        <Trash />
                        Delete this board
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    )
}
