"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Board, Card, List } from "@/types/task"
import { router, usePage } from "@inertiajs/react"
import { error } from "console"
import { Copy, Trash } from "lucide-react"

type ActionsProps = {
    card: Card
    list: List
    onClose: () => void
}

export const Actions = ({ card, list, onClose }: ActionsProps) => {

    const { board } = usePage<{ board: Board }>().props;
    const boardId = board.id;

    const onCopy = () => {
        router.post(route('boards.lists.cards.store', [boardId, list.id]), {
            title: `${card.title} - Copy`,
            description: card?.description
        }, {
            onSuccess: (params) => {
                console.log(params)
                onClose();
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    const onDelete = () => {
        router.delete(route('boards.lists.cards.destroy', [boardId, list.id, card.id]), {
            onSuccess: (params) => {
                // console.log(params)
                onClose();
            }
        });
    }




    return <div className="space-y-2 mt-2">
        <p className="text-xs font-semibold">
            Actions
        </p>
        <Button onClick={onCopy} className="w-full justify-start"  >
            <Copy className="h-4 w-4 mr-2" />
            Copy
        </Button>
        <Button onClick={onDelete} className="w-full justify-star" variant={"destructive"} >
            <Trash className="h-4 w-4 mr-2" />
        </Button>
    </div>
}

Actions.Skeleton = function ActionsSkeleton() {
    return <div className="space-y-2 mt-2">
        <Skeleton className="w-20 h-4 bg-neutral-200" />
        <Skeleton className="w-full h-8 bg-neutral-200" />
        <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
}