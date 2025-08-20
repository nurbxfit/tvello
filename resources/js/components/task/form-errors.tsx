import { XCircle } from "lucide-react";

interface FormErrorsProps {
    id: string;
    errors?: Record<string, string[] | string | undefined>;
}

export const FormErrors = ({
    id,
    errors
}: FormErrorsProps) => {
    if (!errors) {
        return null
    }

    return <div
        id={`${id}-error`}
        aria-live="polite"
        className="mt-2 text-xs text-rose-500"
    >
        {
            Array.isArray(errors?.[id])
                ? (errors?.[id] as string[]).map((error: string) => (
                    <div key={error}
                        className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
                    >
                        <XCircle className="h-4 w-4 mr-2" />
                        {error}
                    </div>
                ))
                : typeof errors?.[id] === "string" && (
                    <div
                        className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
                    >
                        <XCircle className="h-4 w-4 mr-2" />
                        {errors?.[id]}
                    </div>
                )
        }
    </div>
}