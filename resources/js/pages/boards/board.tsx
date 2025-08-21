import { BoardActionsPopOver } from "@/components/task/board-actions-popover";
import { BoardTitle } from "@/components/task/board-title";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import type { Board } from "@/types/task";
import { Head } from "@inertiajs/react";
import { useMemo } from "react";

const baseBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Boards',
        href: '/boards',
    },
];

export default function BoardPage({ board }: { board?: Board }) {



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
                <main className="relative z-10 overflow-auto">
                    <div className="p-4 min-h-full">
                        {/* Board content */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            {/* Placeholder for board lists/cards */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Example placeholder cards */}
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                                    >
                                        <h3 className="font-semibold text-white mb-2">
                                            List {i}
                                        </h3>
                                        <p className="text-white/80 text-sm">
                                            Add cards to this list...
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}