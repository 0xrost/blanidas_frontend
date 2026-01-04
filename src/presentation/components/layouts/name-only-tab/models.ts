interface EntityCreate {
    name: string;
}

interface EntityUpdate {
    id: string;
    name?: string | null;
}

interface UIEntity {
    uiId: string;
    name: string;
    isNew?: boolean;
}

interface Entity {
    id: string;
    name: string;
}

export type { Entity, EntityCreate, EntityUpdate, UIEntity };