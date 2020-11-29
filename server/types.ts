export type Product = {
    _id: any;
    name: string;
    description?: string;
    parameters: {
        price?: number;
        color: string;
        brand: string;
        modelYear?: number;
        condition?: string;
    };
};

export type ParamsAndValues = {
    [key in keyof Product["parameters"]]?: Array<string | number>;
};

export type SearchRequest = {
    query: {
        name: any;
        parameter: any;
    };
    parameters: ParamsAndValues;
};
