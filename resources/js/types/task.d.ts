export interface Board {
    id: string;
    title: string;
    image_id: string;
    image_thumb_url: string;
    image_full_url: string;
    image_user_name: string;
    image_link_name: string;
    user_id: string;

    created_at: Date;
    updated_at: Date;
}

export interface List {
    id: string;
    title: string;
    order: number;
    board_id: string;

    created_at: Date;
    updated_at: Date;
}

export interface Card {
    id: string;
    title: string;
    order: number;
    description?: string;
    list_id: string;

    created_at: Date;
    updated_at: Date;
}

export interface CardWithList extends Card {
    list: List;
}

export interface ListWithCards extends List {
    cards: Array<Card>;
}