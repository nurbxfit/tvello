import { BoardList } from "@/components/task/board-list";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Board } from "@/types/task";
import { Head } from "@inertiajs/react";
import { Suspense } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Boards',
        href: '/boards',
    },
];
export default function BoardsPage({ boards }: { boards: Array<Board> }) {

    return <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Boards" />
        <div className="w-full mb-20">
            <div className="px-2 py-10 md:px-4 mx-auto w-full md:w-[50vw]">
                <Suspense fallback={<BoardList.Skeleton />}>
                    <BoardList boards={boards} />
                </Suspense>
            </div>
        </div>
    </AppLayout>
}