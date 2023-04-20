export type OptionalParamFunction<
    TFirstParameter,
    TReturnType,
    TAdditionalParameters extends unknown[] = []
> = keyof TFirstParameter extends never
    ? (props?: undefined, ...additional: TAdditionalParameters) => TReturnType
    : Partial<TFirstParameter> extends TFirstParameter
    ? (
          props?: TFirstParameter,
          ...additional: TAdditionalParameters
      ) => TReturnType
    : (
          props: TFirstParameter,
          ...additional: TAdditionalParameters
      ) => TReturnType;
