import { usePopupsContext } from './usePopupsContext';

export const useUnmount = () => {
    const { unmount } = usePopupsContext();

    return unmount;
};
