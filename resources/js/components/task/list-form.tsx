import { Board } from "@/types/task"
import { useForm, usePage } from "@inertiajs/react"
import { Plus, X } from "lucide-react";
import { ComponentRef, FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "./form-input";
import { Button } from "../ui/button";


export const ListForm = () => {
    const { props } = usePage<{ board: Board }>();
    const { board } = props;
    const boardId = board.id;

    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<ComponentRef<"form">>(null);
    const inputRef = useRef<ComponentRef<"input">>(null);

    const { data, setData, errors, post: store, } = useForm(
        {
            title: '',
        }
    )

    const handleCreateList = (e: FormEvent) => {
        e.preventDefault();
        console.log({ data })
        store(`/boards/${boardId}/lists`, {
            onSuccess: (data) => {
                console.log('data:', data);
                setData('title', '');
                disableEditing();
            }
        });
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const enableEditing = () => {
        setIsEditing(true)
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside([formRef as RefObject<HTMLElement>], disableEditing);

    if (isEditing) {
        return <li className="shrink-0 h-full w-[272px] select-none">
            <form onSubmit={handleCreateList} ref={formRef}
                className="w-full p-3 rounded-md space-y-4 shadow-md"
            >
                <FormInput id="title" ref={inputRef}
                    errors={errors}
                    className="text-sm px-2 py-1 h-7 font-medium border-transparent
                    hover:border-input focus:border-input transition
                    "
                    placeholder="Enter list title"
                    onChange={(e) => setData('title', e.target.value)}
                />
                <div className="flex items-center gap-x-1">
                    <Button variant={"default"}>
                        Add list
                    </Button>
                    <Button onClick={disableEditing} size={"sm"} variant={"ghost"}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        </li>
    }

    return <li className="shrink-0 h-full w-[272px] select-none">
        <button
            onClick={enableEditing}
            className="w-full rounded-md bg-white/80 hover:bg-white/50
                transition p-3 flex items-center font-medium text-sm
                text-neutral-700
        ">
            <Plus className="w-4 h-4 mr-2" />
            Add a list
        </button>
    </li>
}