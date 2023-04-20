export type ControlledPopupIdentifier = {
    groupId: symbol;
    id: number;
    type: 'controlled';
};

export type UncontrolledPopupIdentifier = {
    unmount: () => void;
    type: 'uncontrolled';
};

export type PopupIdentifier =
    | ControlledPopupIdentifier
    | UncontrolledPopupIdentifier;
