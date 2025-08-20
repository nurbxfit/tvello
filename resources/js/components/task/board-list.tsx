import { User2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Board } from "@/types/task";
import { FormPopover } from "./form-popover";

type BoardListProps = {
    boards: Array<Board>
}

export const BoardList = ({ boards }: BoardListProps) => {

    return <div className="space-y-4">
        <div className="flex items-center font-semibold text-lg text-neutral-700">
            <User2 className="h-6 w-6 mr-2" />
            Your boards
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {boards.map((board) => (
                <a key={board.id} href={`/boards/${board.id}`}
                    style={{
                        backgroundImage: `url(${board.image_thumb_url})`
                    }}
                    role="button"
                    className="relative aspect-video group h-full w-full rounded-sm
                    bg-no-repeat bg-center bg-cover bg-sky-700
                    cursor-pointer overflow-hidden
                    p-2

                ">
                    <div className="absolute inset-0 bg-black/30
                        group-hover:bg-black/40 transition
                    "/>
                    <p className="relative font-semibold text-white">
                        {board.title}
                    </p>
                </a>
            ))}
            {/*  */}
            <FormPopover>
                <div role="button"
                    className="aspect-video relative h-full w-full bg-muted
                rounded-sm flex flex-col gap-y-1 items-center justify-center
                hover:opacity-75 transition
                "
                >
                    <p className="text-sm">Create new board</p>
                    <span className="text-xs">
                        5 remaining
                    </span>
                    {/* <Hint sideOffset={40}
                        description="Free workspaces up to 5 boards. Upgrade this workspace for unlimited boards"
                    >
                        <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                    </Hint> */}
                </div>
            </FormPopover>
        </div>
    </div>
}


BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
    )
}