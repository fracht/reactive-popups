import { useCallback, useState } from "react";
import { Popup, PopupsController } from "../typings";
import { getUniqueId } from "../utils";

export const usePopupsController = (): PopupsController => {
    const [popups, setPopups] = useState<Popup[]>([]);

    const add = useCallback((popup: Omit<Popup, "id">): number => {
        const id = getUniqueId();
        setPopups((prevPopups) => {
            prevPopups.push({
                ...popup,
                id,
            });
            return prevPopups;
        });
        return id;
    }, []);

    const remove = useCallback((id: number): void => {
        setPopups((prevPopups) => {
            return prevPopups.filter(({ id: currentId }) => currentId === id);
        });
    }, []);

    return {
        popups,
        add,
        remove,
    };
};
