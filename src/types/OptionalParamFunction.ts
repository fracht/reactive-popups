export type OptionalParamFunction<T, R> = keyof T extends never
    ? () => R
    : Partial<T> extends T
    ? (props?: T) => R
    : (props: T) => R;
