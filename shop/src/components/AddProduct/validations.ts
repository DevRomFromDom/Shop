import { createValidator } from "@skbkontur/react-ui-validations";
import { Product } from "../../../../server/types";

export const validate = createValidator<Product>((builder) => {
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
});
