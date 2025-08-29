"use client"
import { Card } from "@/types/task"
import { Draggable } from "@hello-pangea/dnd"

type CardItemProps = {
    index: number,
    data: Card,
    onClick: (data: Card) => void;
}
export const CardItem = ({ index, data, onClick }: CardItemProps) => {
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    onClick={() => onClick(data)}
                    role="button" className="truncase border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
                    {data.title}
                </div>
            )}
        </Draggable>
    )
}