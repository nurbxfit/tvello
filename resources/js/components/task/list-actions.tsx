import { Board, List } from "@/types/task"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { PopoverClose } from "@/components/ui/popover-close";
import { ComponentRef, useRef } from "react";
import { router, usePage } from "@inertiajs/react";


interface ListActionsProps {
    list: List,
    onAddCard: () => void;
}
export const ListActions = ({ list }: ListActionsProps) => {

    const { props } = usePage<{ board: Board }>()
    const { board } = props;
    const closeRef = useRef<ComponentRef<"button">>(null);

    const onCopy = () => {
        router.post(`/boards/${board.id}/lists`, {
            title: `${list.title} - Copy`,
            board_id: board.id,
        }, {
            onSuccess: () => closeRef.current?.click(),
        });
    };

    const onDelete = () => {
        router.delete(`/boards/${board.id}/lists/${list.id}`);
    };


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="w-auto h-auto" variant={"ghost"}>
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List actions
                </div>
                <PopoverClose ref={closeRef} asChild >
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant={"ghost"}>
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button variant={"ghost"}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start
                    font-normal text-sm
                    ">
                    Add Card
                </Button>
                <Separator />
                <Button onClick={onCopy} variant={"ghost"}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start
                    font-normal text-sm
                    ">
                    Copy list
                </Button>
                <Separator />
                <Button onClick={onDelete} variant={"ghost"}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start
                    font-normal text-sm
                    ">
                    Delete list
                </Button>
            </PopoverContent>
        </Popover>
    )
}