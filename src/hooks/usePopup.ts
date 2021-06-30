import { useCallback, useRef } from "react";
import { PopupOptions } from "../typings";
import { getUniqueId } from "../utils";
import { usePopupsContext } from "./usePopupsContext";

export const usePopup = ({ popup }: PopupOptions) => {
    const { add, remove } = usePopupsContext();

    const id = useRef<number | null>(null);

    const open = useCallback(() => {
        id.current = add(popup);
    }, []);

    const close = useCallback(() => {
        if (id.current) remove(id.current);
    }, []);

    return {
        open,
        close,
    };
};
