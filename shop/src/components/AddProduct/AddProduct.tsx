import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Select, Textarea } from "@skbkontur/react-ui";
import { FormGroup } from "../FormGroup";
import { FormItem } from "../FormItem";
import { trimDataObject } from "../../Help/Trim";
import { validate } from "./validations";
import styles from "./AddProduct.module.scss";
import {
    ValidationContainer,
    ValidationWrapper,
} from "@skbkontur/react-ui-validations";
import { Product } from "../../../../server/types";

const AddProduct = () => {
    const [addStatus, setAddStatus] = useState("");
    const [newProduct, setNewProduct] = useState<Product>({
        _id: "",
        name: "",
        description: "",
        parameters: { color: "", brand: "", condition: "Новый" },
    });
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [parameters, setParameters] = useState<Product["parameters"]>({
        color: "",
        brand: "",
        condition: "Новый",
    });

    const validationContainerRef = useRef<ValidationContainer>(null);

    useEffect(() => {
        if (newProduct.name !== "") {
            const createProduct = async (newProduct: Product) => {
                try {
                    fetch("/api", {
                        method: "POST",
                        body: JSON.stringify(newProduct),
                        headers: { "Content-Type": "application/json" },
                    }).then((response) => setAddStatus(response.statusText));
                } catch (e) {
                    console.log(e);
                }
            };
            createProduct(newProduct);
            setName("");
            setDescription("");
            setParameters({
                color: "",
                brand: "",
                condition: "Новый",
                modelYear: undefined,
            });
        }
    }, [newProduct]);

    useEffect(() => {
        if (addStatus !== "") {
            setTimeout(function clearStatus() {
                setAddStatus("");
            }, 5000);
        }
    }, [addStatus]);

    const setParameter = (
        parameter: keyof Product["parameters"],
        value: any
    ) => {
        setParameters((params) => ({
            ...params,
            [parameter]: value,
        }));
    };

    const saveProduct = async () => {
        if (!(await validationContainerRef.current?.validate())) {
            return;
        }
        const prName = name.trim();
        const prDescription = description.trim();
        const prParameters = trimDataObject(parameters);
        console.log(prParameters);

        setNewProduct({
            _id: "",
            name: prName,
            description: prDescription,
            parameters,
        });
    };

    const validation = validate({ _id: "", name, description, parameters });

    return (
        <form>
            <ValidationContainer ref={validationContainerRef}>
                <div className={styles.submitForm}>
                    <FormGroup title="О товаре">
                        <FormItem title="Название товара">
                            <Input value={name} onValueChange={setName} />
                        </FormItem>
                        <FormItem title="Описание товара">
                            <Textarea
                                value={description}
                                onValueChange={setDescription}
                                rows={10}
                            />
                        </FormItem>
                    </FormGroup>
                    <FormGroup title="Характеристики товара">
                        <FormItem title="Цена в рублях">
                            <Input
                                mask="999999"
                                min="0"
                                max="1000000"
                                maskChar=" "
                                value={`${parameters.price}`}
                                onValueChange={(value) =>
                                    setParameter("price", value)
                                }
                            />
                        </FormItem>
                        <FormItem title="Цвет товара">
                            <Input
                                value={parameters.color}
                                onValueChange={(value) =>
                                    setParameter("color", value.trim())
                                }
                            />
                        </FormItem>
                        <FormItem title="Бренд">
                            <Input
                                value={parameters.brand}
                                onValueChange={(value) =>
                                    setParameter("brand", value)
                                }
                            />
                        </FormItem>
                        <FormItem title="Год изготовления">
                            <ValidationWrapper
                                validationInfo={validation
                                    .getNode((x) => x.parameters.modelYear)
                                    .get()}
                            >
                                <Input
                                    mask="9999"
                                    value={`${parameters.modelYear}`}
                                    onValueChange={(value) =>
                                        setParameter("modelYear", value)
                                    }
                                />
                            </ValidationWrapper>
                        </FormItem>
                        <FormItem title="Качество">
                            <Select
                                items={[
                                    ["Новый", "Новый"],
                                    ["Б/У", "Б/У"],
                                ]}
                                value={parameters.condition}
                                onValueChange={(value: any) =>
                                    setParameter("condition", value)
                                }
                                width="250px"
                            />
                        </FormItem>
                    </FormGroup>
                </div>
            </ValidationContainer>
            <div className={styles.submitButton}>
                <Button onClick={saveProduct} use="success" width="150px">
                    Добавить
                </Button>

                {addStatus === "OK" ? (
                    <div className={styles.successMsg}>
                        Товар успешно добавлен
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </form>
    );
};

export default AddProduct;
