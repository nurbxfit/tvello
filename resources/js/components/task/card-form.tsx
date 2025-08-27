import { ComponentRef, FormEvent, FormEventHandler, forwardRef, KeyboardEvent, KeyboardEventHandler, RefObject, useRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useForm, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Board } from "@/types/task";
import { FormErrors } from "./form-errors";

interface CardFormProps {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({ listId, enableEditing, disableEditing, isEditing }: CardFormProps, ref) => {

    const { props } = usePage<{ board: Board }>();
    const { board } = props;
    const boardId = board.id;
    const formRef = useRef<ComponentRef<"form">>(null);
    const { data, setData, post, processing, errors } = useForm<{
        title: string | undefined
    }>();


    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Escape') {
            disableEditing();
        }
    }



    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitting:", { ...data, boardId, listId });
        post(route('boards.lists.cards.store', { board: boardId, list: listId }), {
            onSuccess: (data) => {
                setData('title', undefined);
                disableEditing();
            }
        });
    }


    useOnClickOutside([formRef as RefObject<HTMLElement>], disableEditing);
    // useEventListener("keydown", onTextAreaKeyDown)


    if (isEditing) {
        return <form ref={formRef} onSubmit={onSubmit} className="m-1 py-0.5 px-1 space-y-4">
            <div className="space-y-2 w-full">
                <div className="space-y-1 w-full">
                    <Textarea
                        onKeyDown={onKeyDown}
                        onClick={enableEditing}
                        ref={ref}
                        required={true}
                        placeholder={"Enter title for this card..."}
                        name={"title"}
                        id={"title"}
                        // disabled={pending || disabled}
                        disabled={processing}
                        className={
                            cn(
                                "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm"
                            )
                        }
                        aria-describedby={`title-error`}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                </div>
                <FormErrors id="title" errors={errors} />
            </div>
            <div className="flex items-center gap-x-1">
                <Button>
                    Add card
                </Button>
                <Button onClick={disableEditing} size={"sm"} variant={"ghost"}>
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </form>
    }
    return <div className="pt-2 px-2">
        <Button className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
            onClick={enableEditing}
            size={"sm"}
            variant={"ghost"}
        >
            <Plus className="h-4 w-4 mr-2" />
            Add a card
        </Button>
    </div>
});