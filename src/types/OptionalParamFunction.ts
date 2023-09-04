export type OptionalParamFunction<
	TFirstParameter,
	TReturnType,
	TAdditionalParameters extends unknown[] = [],
> = keyof TFirstParameter extends never
	? (properties?: undefined, ...additional: TAdditionalParameters) => TReturnType
	: Partial<TFirstParameter> extends TFirstParameter
	? (properties?: TFirstParameter, ...additional: TAdditionalParameters) => TReturnType
	: (properties: TFirstParameter, ...additional: TAdditionalParameters) => TReturnType;
