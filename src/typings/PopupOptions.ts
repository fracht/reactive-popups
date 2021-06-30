import { Popup } from "./Popup";

export type PopupOptions = {
    popup: Omit<Popup, "id">;
};
