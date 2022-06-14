# reactive-popups

## Installation

```bash
npm i reactive-popups
```

## What is this

This is a state delivery library for react to manage popups - content over the app. It can be anything - dialogs, modals, snackbars, etc.

## The problem

Nearly every component library suggests to create popups in a such way:

Example with [@mui/material](https://github.com/mui/material-ui)

```jsx
const SomeComponent = () => {
    // Popup state must be defined in a component where it is created.
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleOpen}>open dialog</button>
            <Dialog open={open} onClose={handleClose}>
                Your dialog content...
            </Dialog>
        </div>
    );
};
```

The problem with this approach is that sometimes it is not convenient or even impossible to store popup state outside. For example, if you need to render multiple popups using one button, you should create global state for all popups. In addition, implementing dialog in a component requires to write a lot of boilerplate code: functions `handleOpen` and `handleCLose`, passing state in a `Dialog`.

## The solution - new convenient API

This library provides some useful hooks to create popups: `usePopupsFactory` and `useResponsePopup`. First is used to create multiple popups - it mounts a popup after trigger was called. And second hook is used to get any data (response) from popup. You only need to wrap your application with `PopupsContextProvider` and create at least one popup group to use these hooks.

## Basic usage

```js
// Popups can be rendered in different groups
const PopupGroup = createPopupGroup();

const PopupComponent = (props) => {
    // Unmount popup from inside
    const unmount = useCloseHandler();
    return (
        <div>
            {props.message}
            <button onClick={unmount}>unmount</button>
        </div>
    );
};

const TriggerComponent = () => {
    const create = usePopupsFactory(
        // component
        PopupComponent,
        // props
        { message: 'hello world' },
        // group
        PopupGroup
    );

    return (
        <button
            onClick={() => {
                const close = create();
                // Unmount popup from outside
            }}
        >
            open my popup
        </button>
    );
};

const App = () => {
    return (
        <PopupsContextProvider>
            {/* Groups can be rendered anywhere. It is up to you. */}
            <PopupGroup />
            <TriggerComponent />
        </PopupsContextProvider>
    );
};
```
