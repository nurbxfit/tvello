"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Close } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Key, X } from "lucide-react";
import { ComponentRef, FormEvent, useRef } from "react";
import { FormPicker, ImageFormPickerData } from "./form-picker";
import { FormInput } from "./form-input";
import { useForm } from "@inertiajs/react";


interface FormPopoverProps {
    children: React.ReactNode
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

interface SubmitDataType extends ImageFormPickerData {
    title: string,
    team_id: string;
}




export const FormPopover = ({ children, side, align, sideOffset }: FormPopoverProps) => {
    const closeRef = useRef<ComponentRef<"button">>(null);

    const { data, setData, post, processing, errors } = useForm<SubmitDataType>({
        title: '',
        image_id: '',
        image_thumb_url: '',
        image_full_url: '',
        image_user_name: '',
        image_link_html: '',
        team_id: '1',
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('submitting:', data);
        post('/boards'); //
    }


    const handleImagePickerChange = (image: ImageFormPickerData) => {
        (Object.keys(image) as Array<keyof ImageFormPickerData>).map(key =>
            setData(key, image[key])
        );
    }


    // console.log('error:', errors)


    return <Popover>
        <PopoverTrigger asChild>
            {children}
        </PopoverTrigger>
        <PopoverContent align={align}
            className="w-80 pt-3"
            side={side}
            sideOffset={sideOffset}
        >
            <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                Create board
            </div>
            <PopoverClose ref={closeRef} asChild>
                <Button className="h-auto w-auto p-2 absolute top-2 right-2" variant={"ghost"}>
                    <X className="h-4 w-4" />
                </Button>
            </PopoverClose>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-4">
                    <FormPicker
                        id="image"
                        onChange={handleImagePickerChange}
                        errors={errors}
                    />
                    <FormInput
                        errors={errors}
                        id="title"
                        label="Board title"
                        type="text"
                        required
                        onChange={(e) => {
                            setData('title', e.target.value)
                        }}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={processing} >
                    {processing ? 'Creating...' : 'Create'}
                </Button>
            </form>
        </PopoverContent>
    </Popover>

}


function PopoverClose({
    ...props
}: React.ComponentProps<typeof Close>) {
    return <Close data-slot="popover" {...props} />
}