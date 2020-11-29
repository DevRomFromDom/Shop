import React, { useEffect, useState } from "react";
import styles from "./ProductItem.module.scss";
import { Product } from "../../../../../server/types";

export const ProductItem = ({ product }) => {
    useEffect(() => {
        setItem(product);
    }, [product]);
    const [item, setItem] = useState<Product>({
        _id: "",
        name: "",
        description: "",
        parameters: {
            price: 0,
            color: "",
            brand: "",
            modelYear: 2000,
            condition: "Новый",
        },
    });
    if (item.name === "") {
        return <div>loading...</div>;
    } else
        return (
            <div className={styles.card}>
                <div className={styles.main}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.description}>
                        {item.description
                            ? item.description
                            : "Описание отсутствует"}
                    </div>
                </div>
                <div className={styles.price}>
                    {item.parameters.price
                        ? `Цена: ${item.parameters.price} руб.`
                        : "Цена не указана"}
                </div>
                <div className={styles.params_block}>
                    <div className={styles.params_title}>Характеристики:</div>
                    <div className={styles.parameters}>
                        <div className={styles.paramList}>
                            <div className={styles.paramKey}> Цвет:</div>
                            <div className={styles.paramValue}>
                                {item.parameters.color}
                            </div>
                        </div>
                        <div className={styles.paramList}>
                            <div className={styles.paramKey}> Бренд:</div>
                            <div className={styles.paramValue}>
                                {item.parameters.brand}
                            </div>
                        </div>
                        <div className={styles.paramList}>
                            <div className={styles.paramKey}>Год выпуска:</div>
                            <div className={styles.paramValue}></div>
                            {item.parameters.modelYear}
                        </div>
                        <div className={styles.paramList}>
                            <div className={styles.paramKey}> Качество:</div>
                            <div className={styles.paramValue}>
                                {item.parameters.condition}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
};
