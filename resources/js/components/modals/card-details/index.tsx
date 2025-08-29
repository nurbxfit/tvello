import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Card, List } from "@/types/task"
import { Description } from "./description"
import { Header } from "./header"
import { Actions } from "./actions"

interface CardDetailModalProps {
    card: Card | null
    list: List
    onClose: () => void
}

export const CardDetailModal = ({ list, card, onClose }: CardDetailModalProps) => {
    return (
        <Dialog
            open={!!card}
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            {
                card && (
                    <>
                        <DialogTitle className="sr-only">
                            {card?.title || "Card Details"}
                        </DialogTitle>
                        <DialogContent aria-describedby="" className="max-w-2xl">
                            <DialogDescription>
                                Card details and actions
                            </DialogDescription>
                            <div className="space-y-4">
                                <Header card={card} list={list} />
                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                                        <div className="col-span-3">
                                            <div className="w-full space-y-6">
                                                <Description list={list} card={card} />
                                                {/* {!auditLogsData ? <Activity.Skeleton /> : <Activity data={auditLogsData} />} */}

                                            </div>
                                        </div>
                                        {!card ? <Actions.Skeleton /> : <Actions list={list} card={card} onClose={onClose} />}
                                    </div>

                                </div>
                            </div>

                        </DialogContent>
                    </>
                )
            }
        </Dialog>
    )
}