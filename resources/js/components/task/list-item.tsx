import { cn } from "@/lib/utils"
import { Card, ListWithCards } from "@/types/task"
import { ListActions } from "./list-actions"
import { CardForm } from "./card-form"
import { ComponentRef, useEffect, useRef, useState } from "react"
import { CardItem } from "./card-item"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { CardDetailModal } from "../modals/card-details"

type ListItemProps = {
    list: ListWithCards
    index: number
}
export const ListItem = ({ list, index }: ListItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const textAreaRef = useRef<ComponentRef<"textarea">>(null);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const disableEditing = () => {
        setIsEditing(false);
    }

    const enableEditing = () => {
        setIsEditing(true);
    }

    useEffect(() => {
        if (isEditing && textAreaRef.current) {
            textAreaRef.current?.focus();
        }
    }, [isEditing]);



    return (<>
        <Draggable draggableId={list.id} index={index}>

            {/* was thinking of adding modal here but then there will be a waste of resources because there will be multiple modal due to multiple li ? or am I wrong ? is it only render when card is selected so it only one modal ?*/}
            {(provided) => (
                <li {...provided.draggableProps} ref={provided.innerRef} className="shrink-0 h-full w-[272px] select-none">
                    <div
                        {...provided.dragHandleProps}
                        className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-center gap-x-2">
                            <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
                                {list.title}
                            </div>
                            <ListActions onAddCard={enableEditing} list={list} />
                        </div>
                        <Droppable droppableId={list.id} type="card">
                            {(provided) => (
                                <ol
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={
                                        cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                                            list.cards.length > 0 ? "mt-2" : "mt-0",
                                        )
                                    }>
                                    {list.cards.map((card, index) => {
                                        return <CardItem onClick={setSelectedCard} index={index} key={card.id} data={card} />
                                    })}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        <CardForm listId={list.id} ref={textAreaRef} isEditing={isEditing} enableEditing={enableEditing} disableEditing={disableEditing} />
                    </div>
                </li>
            )}
        </Draggable>
        {selectedCard && <CardDetailModal list={list} card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </>)

}