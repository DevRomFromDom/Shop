import { createValidator } from "@skbkontur/react-ui-validations";
import { Product } from "../../../../server/types";

export const validate = createValidator<Product>((builder) => {
    builder.prop(
        (product) => product.name,
        (builder) => {
            builder.invalid(
                (name) => !name,
                "Название товара должно быть указано",
                "submit"
            );
            builder.invalid(
                (name) => name.trim() === "",
                "Название товара должно быть указано",
                "submit"
            );
        }
    );
    builder.prop(
        (product) => product.parameters.modelYear,
        (builder) => {
            builder.invalid(
                (modelYear) => !modelYear,
                "Год изготовления должен быть заполнен",
                "submit"
            );
            builder.invalid(
                (modelYear) => (modelYear ?? 0) > new Date().getFullYear(),
                "Год изготовления не может быть больше текущего",
                "lostfocus"
            );
            builder.invalid(
                (modelYear) => String(modelYear).length < 4,
                "Неправильный год",
                "lostfocus"
            );
        }
    );
    builder.prop(
        (product) => product.parameters.brand,
        (builder) => {
            builder.invalid(
                (brand) => !brand,
                "Бренд товара должен быть указан",
                "submit"
            );
            builder.invalid(
                (brand) => brand.trim() === "",
                "Бренд товара должен быть указан",
                "submit"
            );
        }
    );
    builder.prop(
        (product) => product.parameters.color,
        (builder) => {
            builder.invalid(
                (color) => !color,
                "Цвет товара должен быть указан",
                "submit"
            );
            builder.invalid(
                (color) => color.trim() === "",
                "Цвет товара должен быть указан",
                "submit"
            );
        }
    );
});
