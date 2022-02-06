export type OptionalParamFunction<T, R> = keyof T extends never
    ? () => R | Promise<R>
    : (props: T) => R | Promise<R>;
