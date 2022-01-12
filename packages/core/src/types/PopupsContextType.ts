export type PopupsContextType = {
    add: () => number;
    open: (id: number) => void;

    remove: (id: number) => void;
    close: (id: number) => void;
};
