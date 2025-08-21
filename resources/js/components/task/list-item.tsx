import { cn } from "@/lib/utils"
import { ListWithCards } from "@/types/task"
import { ListActions } from "./list-actions"

type ListItemProps = {
    list: ListWithCards
    index: number
}
export const ListItem = ({ list, index }: ListItemProps) => {

    const onAddCard = () => {
        // do something ?
    }
    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div
                className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-center gap-x-2">
                    <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
                        {list.title}
                    </div>
                    <ListActions onAddCard={onAddCard} list={list} />
                </div>
                <ol
                    className={
                        cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                            list.cards.length > 0 ? "mt-2" : "mt-0",
                        )
                    }>
                    {list.cards.map((card, index) => {
                        return ( // <CardItem index={index} key={card.id} data={card} />
                            <div>
                                {card.title}
                            </div>
                        )
                    })}
                </ol>
                {/* <CardForm listId={list.id} ref={textAreaRef} isEditing={isEditing} enableEditing={enableEditing} disableEditing={disableEditing} /> */}
            </div>
        </li>
    )
}