export class EditableReward {
    id?: number;
    name?: string;
    price?: number;
    imageUrl?: string;
    limit?: number;
    projectId?: number;
    description?: string;

    constructor(init: EditableReward = {}) {
        this.id = init?.id;
        this.name = init?.name;
        this.price = init?.price;
        this.imageUrl = init?.imageUrl;
        this.limit = init?.limit;
        this.projectId = init?.projectId;
        this.description = init?.description;
    }
}
