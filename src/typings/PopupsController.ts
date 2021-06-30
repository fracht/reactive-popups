import { Popup } from "./Popup";

export interface PopupsController {
    popups: Popup[];
    add: (popup: Omit<Popup, "id">) => number;
    remove: (id: number) => void;
}
