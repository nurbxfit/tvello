
import { defaultImages } from "@/constants/images";
import { cn } from "@/lib/utils";
import { Check, Divide, Loader2 } from "lucide-react";
import { ComponentRef, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | string | undefined>;
    onChange: (value: ImageFormPickerData) => void;
}

export interface ImageFormPickerData {
    image_id: string,
    image_thumb_url: string,
    image_full_url: string,
    image_user_name: string,
    image_link_html: string,
}

export const FormPicker = ({ id, errors, onChange }: FormPickerProps) => {

    const { pending } = useFormStatus();
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
    const inputRef = useRef<ComponentRef<"input">>(null)
    // const { images, isLoading } = useUnsplash(["317099"], 9);
    const images = defaultImages;

    useEffect(() => {
        const image = images.find((image) => image.id == selectedImageId);
        if (image) {
            // onChange(`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`)
            onChange({
                image_id: image.id,
                image_thumb_url: image.urls.thumb,
                image_full_url: image.urls.full,
                image_link_html: image.links.html,
                image_user_name: image.user.name
            });
        }
    }, [selectedImageId])




    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {
                    images.map((image) => (
                        <div
                            key={image.id}
                            className={
                                cn("cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",

                                    pending && "opacity-50 hover:opacity-50 cursor-auto"
                                )
                            }
                            onClick={() => {
                                if (pending) return;
                                setSelectedImageId(image.id)
                            }}
                        >
                            {/* <input
                                id={id}
                                name={id}
                                type="radio"
                                className="hidden"
                                checked={selectedImageId === image.id}
                                onChange={(e) => { }}
                                disabled={pending}
                                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                            /> */}
                            <img
                                alt="unsplash image"
                                className="absolute inset-0 w-full h-full object-cover rounded-sm"
                                src={image.urls.thumb}
                            />

                            {selectedImageId === image.id && (<div className="
                            absolute inset-y-0 h-full w-full bg-black/30
                            flex items-center justify-center
                            ">
                                <Check className="h-4 w-4 text-white" />
                            </div>)}

                            <a target="__blank" href={image.links.html}
                                className="opacity-0 group-hover:opacity-100 absolute
                                 bottom-0 w-full text-[10px] truncate text-white
                                 hover:underline p-1 bg-black/50
                                "
                            >
                                {image.user.name}
                            </a>
                        </div>
                    ))
                }
            </div>
            <FormErrors id="image_id" errors={errors} />
        </div>
    )
} 