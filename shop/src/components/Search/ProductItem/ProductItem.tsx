import React, { useEffect, useState } from "react";
import "./ProductItem.scss";
import { Product } from "../../../../../server/types";

const ProductItem = ({ product }) => {
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
            <div className="card">
                <div className="main">
                    <div className="name">{item.name}</div>
                    <div className="description">{item.description}</div>
                </div>
                <div className="price">{item.parameters.price} р.</div>
                <div className="params_block">
                    Характеристики:
                    <div className="parameters">
                        <div className="color">
                            Цвет:{item.parameters.color}
                        </div>
                        <div className="brand">
                            Бренд:{item.parameters.brand}
                        </div>
                        <div className="modelYear">
                            Год выпуска:{item.parameters.modelYear}
                        </div>
                        <div className="condition">
                            Качество:{item.parameters.condition}
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default ProductItem;
