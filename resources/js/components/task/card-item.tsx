"use client"
import { Card } from "@/types/task"
import { Draggable } from "@hello-pangea/dnd"

type CardItemProps = {
    index: number,
    data: Card
}
export const CardItem = ({ index, data }: CardItemProps) => {
    // const { onOpen } = useCardModal();
    const openModal = (id: string) => {
        console.log('opening:', id);
    }
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    onClick={() => openModal(data.id)}
                    role="button" className="truncase border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
                    {data.title}
                </div>
            )}
        </Draggable>
    )
}