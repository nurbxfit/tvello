import { Board } from "@/types/task";
import { useForm } from "@inertiajs/react";
import { ComponentRef, useRef, useState } from "react";
import { FormInput } from "./form-input";
import { Button } from "../ui/button";

export const BoardTitle = ({ board }: { board: Board }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { data, setData, put: update, errors, processing } = useForm({
        title: board.title,
    });
    const formRef = useRef<ComponentRef<"form">>(null);
    const inputRef = useRef<ComponentRef<"input">>(null);

    const handleEdit = () => {
        console.log('data:', data);

        if (board.title == data.title) {
            disableEditing();
            return;
        }

        update(`/boards/${board.id}`, {
            onSuccess: () => disableEditing(),
            onError: () => disableEditing(),
        });
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const enableEditing = () => {
        setIsEditing(true)
    }

    const onBlur = () => {
        // formRef.current?.requestSubmit();
        handleEdit();
    }


    if (isEditing) {
        return <form ref={formRef} onSubmit={handleEdit} className="flex items-center gap-x-2">
            <FormInput ref={inputRef} id="title" onBlur={onBlur} onChange={(e) => setData('title', e.target.value)}
                defaultValue={data.title}
                required
                className="text-lg font-bold px-[7px] py-1 h-7 
                bg-transparent 
                focus-visible:outline-none 
                focus-visible:ring-transparent 
                border-none"
            />
        </form>
    }

    return <div className="flex items-center gap-x-2">
        <Button onClick={enableEditing} variant={"ghost"} className="font-bold text-lg h-auto w-auto p-1 px-2">
            {data.title}
        </Button>
    </div>
}