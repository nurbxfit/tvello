import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import type { Board } from "@/types/task";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Boards',
        href: '/boards',
    },
];
export default function BoardPage({ board }: { board?: Board }) {

    if (!board) {
        return <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                Not found
            </div>
        </AppLayout>
    }

    return <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={`${board.title} | Boards`} />
        <div>
            This is board page for {board.id}
        </div>
    </AppLayout>
}