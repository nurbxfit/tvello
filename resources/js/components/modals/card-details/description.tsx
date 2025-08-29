
import { FormErrors } from "@/components/task/form-errors"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Board, Card, List } from "@/types/task"
import { useForm, usePage } from "@inertiajs/react"
import { AlignLeft } from "lucide-react"
import { ComponentRef, RefObject, useEffect, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

type DescriptionProps = {
    card: Card
    list: List
}

export const Description = ({ card, list }: DescriptionProps) => {
    const { props } = usePage<{ board: Board }>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const textareaRef = useRef<ComponentRef<"textarea">>(null);
    const formRef = useRef<ComponentRef<"form">>(null);
    const [description, setDescription] = useState(card.description)
    const { data, setData, put, errors } = useForm<{ description: string | undefined }>({ description: card.description });

    const boardId = props.board.id


    const enableEditing = () => {
        setIsEditing(true)
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside([formRef as RefObject<HTMLElement>], disableEditing);

    const onSubmit = () => {

        if (data.description == description) return;

        console.log({ data })

        // execute({
        //     id: data.id,
        //     title: data.title,
        //     description,
        //     boardId
        // })

        put(route('boards.lists.cards.update', [boardId, list.id, card.id]), {
            onError: (error) => {
                console.log(error);
            },
            onSuccess: (response) => {
                // console.log('response:', response);
                setDescription(data.description)
                disableEditing();
            }
        });
    }

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditing])

    return <div className="flex items-start gap-x-3 w-full">
        <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
            <p className="font-semibold text-neutral-700 mb-2">
                Description
            </p>
            {
                !isEditing ? <div role="button" onClick={enableEditing} className={
                    cn("min-h-[78px] bg-neutral-200 text-sm py-3 px-3.5 rounded-md", card.description ? null : "italic")
                }>
                    {
                        description ? (description.length == 0 ? "No description" : description) : "No description"
                    }
                </div> : <form ref={formRef} action={onSubmit} className="space-y-2">
                    <div className="space-y-2 w-full">
                        <div className="space-y-1 w-full">
                            <Textarea
                                id="description"
                                className="w-full mt-2 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm"
                                placeholder="Add a more detailed description"
                                defaultValue={data.description || undefined}
                                aria-describedby="description-error"
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>
                        <FormErrors id={"description"} errors={errors} />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <Button disabled={data.description == description}>
                            Save
                        </Button>
                        <Button type="button" onClick={disableEditing} size={"sm"} variant={"ghost"}>
                            Cancel
                        </Button>
                    </div>
                </form>
            }
        </div>
    </div>
}

Description.Skeleton = function DescriptionSkeleton() {
    return <div className="flex items-start gap-x-3 w-full">
        <Skeleton className="h-6 w-6 bg-neutral-200" />
        <div className="w-full">
            <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
            <Skeleton className="h-[78px] w-full mb-2 bg-neutral-200" />
        </div>
    </div>
}