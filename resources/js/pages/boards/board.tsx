import { BoardActionsPopOver } from "@/components/task/board-actions-popover";
import { BoardTitle } from "@/components/task/board-title";
import { ListForm } from "@/components/task/list-form";
import { ListItem } from "@/components/task/list-item";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import type { Board, ListWithCards } from "@/types/task";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

const baseBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Boards',
        href: '/boards',
    },
];

export default function BoardPage() {
    const { props } = usePage<{ board: Board, lists: Array<ListWithCards> }>();

    const { board, lists } = props;
    const [orderedLists, setOrderedLists] = useState(lists);

    // Compute breadcrumbs without mutation
    const breadcrumbs = useMemo(() => {
        if (!board) return baseBreadcrumbs;

        return [
            ...baseBreadcrumbs,
            {
                title: board.title,
                href: `/boards/${board.id}` // Use ID instead of title for better URL structure
            }
        ];
    }, [board]);

    useEffect(() => {
        setOrderedLists(lists)
    }, [lists])

    function reorder<T>(list: T[], startIndex: number, endIndex: number) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;
        if (!destination) {
            return;
        }

        // if drop in the same position
        if (destination.droppableId == source.droppableId && destination.index == source.index) {
            return
        }

        // if user move a list instead of card
        if (type == "list") {
            const items = reorder(orderedLists, source.index, destination.index).map((item, index) => ({ ...item, order: index }));
            setOrderedLists(items);
            // update list in db
            // Remove 'cards' property for FormDataConvertible compatibility error
            const serializedLists = items.map(({ cards, ...rest }) => rest);
            router.put(route('board.lists.updateMany', board.id), {
                lists: serializedLists
            },
                {
                    onSuccess: (data) => {
                        console.log('success', data)
                    },
                    onError: (error) => {
                        console.error(error)
                    }
                }
            )
        }

        // if user move a card
        if (type == "card") {
            let newOrderedLists = [...orderedLists];

            const sourceList = newOrderedLists.find(list => list.id === source.droppableId);
            const destinationList = newOrderedLists.find(list => list.id === destination.droppableId);

            if (!sourceList || !destinationList) {
                return;
            }

            // check if list dont have card, we give one empty
            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            if (!destinationList.cards) {
                destinationList.cards = [];
            }

            // if user move card within the same list but diff order
            if (source.droppableId == destination.droppableId) {
                const reorderedCards = reorder(sourceList.cards, source.index, destination.index);
                // change the order
                reorderedCards.forEach((card, index) => {
                    card.order = index
                })

                sourceList.cards = reorderedCards;
                setOrderedLists(newOrderedLists);

                const serializedLists = reorderedCards.map(({ id, title, order }) => ({
                    id,
                    title,
                    order
                }))

                router.put(route('boards.lists.cards.updateMany', [board.id, destinationList.id]), {
                    cards: serializedLists
                }, {
                    onError: (error) => {
                        console.error(error)
                    }
                })

            } else {
                // user drop into new list
                // remove card from source, and append to destionation
                const [movedCard] = sourceList.cards.splice(source.index, 1);

                movedCard.list_id = destination.droppableId;

                destinationList.cards.splice(destination.index, 0, movedCard)

                sourceList.cards.forEach((card, index) => {
                    card.order = index
                })

                destinationList.cards.forEach((card, index) => {
                    card.order = index
                })

                setOrderedLists(newOrderedLists)
                // update cards in db

                // Serialize cards to plain objects for FormDataConvertible compatibility
                const serializedCards = destinationList.cards.map(({ id, title, order }) => ({
                    id,
                    title,
                    order
                }))

                router.put(route('boards.lists.cards.updateMany', [board.id, destinationList.id]), {
                    cards: serializedCards
                }, {
                    onError: (error) => {
                        console.error(error)
                    }
                })
            }

        }
    }

    // seems unecessary because we already handled this on php
    if (!board) {
        return (
            <AppLayout breadcrumbs={baseBreadcrumbs}>
                <Head title="Board Not Found | Boards" />
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Board Not Found
                        </h2>
                        <p className="text-gray-600">
                            The board you're looking for doesn't exist or has been removed.
                        </p>
                        <Button
                            onClick={() => window.history.back()}
                            className="mt-4"
                            variant="outline"
                        >
                            Go Back
                        </Button>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${board.title} | Boards`} />

            <div className="h-full relative bg-cover bg-center bg-no-repeat" style={{
                backgroundImage: `url(${board.image_full_url})`
            }}>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20" />
                {/* Fixed header */}
                <header className="relative z-40 w-full h-14 bg-black/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between h-full px-4">
                        <BoardTitle board={board} />
                        <BoardActionsPopOver board={board} />
                    </div>
                </header>

                {/* Main content */}
                <main className="relative z-10 ">
                    <div className="p-4 min-h-full">
                        {/* Board content */}
                        <div className="p-4 h-full ">
                            {/* Placeholder for board lists/cards */}
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="list" type="list" direction="horizontal">
                                    {
                                        (provided) => (
                                            <ol
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="flex gap-x-3 h-full">
                                                {orderedLists.map((list, index) => (
                                                    <ListItem key={list.id} list={list} index={index} />
                                                ))}
                                                {provided.placeholder}
                                                <ListForm />
                                                <div className="flex shrink-0 w-1" />
                                            </ol>
                                        )
                                    }
                                </Droppable>
                            </DragDropContext>

                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}