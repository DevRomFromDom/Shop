import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem/ProductItem";
import { SearchValueContext } from "../../App";
import { Checkbox } from "@skbkontur/react-ui";
import { ParamsAndValues, Product } from "../../../../server/types";

import styles from "./Search.module.scss";

const ParamNames: { [key in keyof Product["parameters"]]: string } = {
    brand: "Бренд",
    price: "Цена",
    modelYear: "Год изготовления",
    condition: "Состояние",
    color: "Цвет",
};

const Search = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [
        paramsAndValues,
        setParamsAndValues,
    ] = useState<ParamsAndValues | null>(null);
    const [paramsState, setParamsState] = useState<ParamsAndValues>({
        brand: [],
        color: [],
        condition: [],
        modelYear: [],
        price: [],
    });
    const searchValue = useContext(SearchValueContext);

    const toggleParamState = (
        param: keyof Product["parameters"],
        value: any
    ) => {
        if (paramsState[param].some((val) => val === value)) {
            setParamsState({
                ...paramsState,
                [param]: paramsState[param].filter((val) => val !== value),
            });
        } else {
            setParamsState((p) => ({
                ...p,
                [param]: [...paramsState[param], value],
            }));
        }
    };

    useEffect(() => {
        const all = async () => {
            const res = await fetch("/api/search/all", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: searchValue,
                    parameters: paramsState,
                }),
            });
            setProducts(await res.json());
        };
        all();
    }, [paramsState, searchValue]);

    useEffect(() => {
        const all = async () => {
            const res = await fetch("/api/parameters");
            setParamsAndValues(await res.json());
        };
        all();
    }, []);

    if (products === null || paramsAndValues === null) {
        return (
            <div className={styles.bodyLoader}>
                <div className={styles.water}></div>
                <span className={styles.loading}>Loading...</span>
            </div>
        );
    } else
        return (
            <div className={styles.view}>
                <div className={styles.result}>
                    <div>
                        {products.length !== 0 ? (
                            products.map((product, index) => {
                                return (
                                    <div key={index}>
                                        <ProductItem product={product} />
                                    </div>
                                );
                            })
                        ) : (
                            <div>Товары не найдены</div>
                        )}
                    </div>
                </div>
                <div className={styles.params}>
                    {Object.entries(paramsAndValues).map(([param, values]) => (
                        <div key={param} className={styles.parameter}>
                            <div className={styles.paramTitle}>
                                {ParamNames[param]}
                            </div>
                            <ul>
                                {values.map((val) => (
                                    <li key={val}>
                                        <Checkbox
                                            checked={paramsState[
                                                param
                                            ].includes(val)}
                                            onValueChange={() => {
                                                toggleParamState(
                                                    param as any,
                                                    val
                                                );
                                            }}
                                        >
                                            {val ? val : "Без цены"}
                                        </Checkbox>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
};

export default Search;
