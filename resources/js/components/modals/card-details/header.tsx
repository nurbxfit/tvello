
"use client"

import { FormErrors } from "@/components/task/form-errors"
import { FormInput } from "@/components/task/form-input"
import { Skeleton } from "@/components/ui/skeleton"
import { Board, Card, List } from "@/types/task"
import { useForm, usePage } from "@inertiajs/react"
import { Layout } from "lucide-react"
import { ComponentRef, useRef } from "react"

type HeaderProps = {
    card: Card
    list: List
}
export const Header = ({ card, list }: HeaderProps) => {
    const { board } = usePage<{ board: Board }>().props
    const inputRef = useRef<ComponentRef<"input">>(null);

    const { data, setData, put, errors } = useForm<{ title: string }>({
        title: card.title,
    });



    const submitForm = () => {
        // formRef.current?.re

        const boardId = board.id as string;
        if (!data.title) return;
        if (data.title === card.title) return;

        console.log('FormData:', { data })
        console.log({
            boardId,
            listId: list.id,
            cardId: card.id
        })


        put(route('boards.lists.cards.update', [boardId, list.id, card.id]), {
            onError: (error) => {
                console.log(error);
            },
            onSuccess: (data) => {
                // console.log('success:', data);
            }
        })

    }

    return <div className="flex items-start gap-x-3 mb-6 w-full">
        <Layout className="h-5 w-5 mt-1 text-neutral-700" />
        <div className="w-full">

            <FormInput id="title"
                ref={inputRef}
                onBlur={() => submitForm()}
                onChange={(e) => setData("title", e.target.value)}
                defaultValue={card.title}
                className="font-semibold text-xl px-1 text-neutral-700
                     bg-transparent border-transparent relative
                     -left-1.5 w-[95%]
                     focus-visible:bg-white
                     focus-visible:border-input mb-0.5 truncate
                    "
            />
            <FormErrors id="title" errors={errors} />
        </div>
    </div>
}

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="flex items-start gap-x-3 mb-6">
            <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
            <div>
                <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
                <Skeleton className="w-24 h-4 bg-neutral-200" />
            </div>
        </div>
    )
}