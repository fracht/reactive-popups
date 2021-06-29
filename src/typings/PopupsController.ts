import { getUniqueId } from "../utils";
import { Popup } from "./Popup";

interface IPopupsController {
    add: (popup: Popup) => number;
    remove: (id: number) => void;
}

export class PopupsController implements IPopupsController {
    public readonly popups: Map<number, Popup>;

    constructor() {
        this.popups = new Map();
    }

    public add = (popup: Popup) => {
        const newId = getUniqueId();
        this.popups.set(newId, popup);
        return newId;
    };

    public remove = (id: number) => {
        this.popups.delete(id);
    };
}
