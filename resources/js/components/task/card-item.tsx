"use client"
import { Card } from "@/types/task"

type CardItemProps = {
    index: number,
    data: Card
}
export const CardItem = ({ index, data }: CardItemProps) => {
    // const { onOpen } = useCardModal();
    const openModal = (id: string) => {

    }
    return (

        <div

            onClick={() => openModal(data.id)}
            role="button" className="truncase border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
            {data.title}
        </div>

    )
}