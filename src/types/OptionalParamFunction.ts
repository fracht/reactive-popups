export type OptionalParamFunction<T, R> = keyof T extends never
    ? () => R
    : (props: T) => R;
