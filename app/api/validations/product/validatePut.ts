import { Stock } from "../../modal/Stock";
import { fieldValueImageUrl, fieldValueNumber, fieldValueString } from "../global/fieldValue";

export function validatePut(
    id: number,
    name?: string,
    description?: string,
    price?: number,
    imageUrl?: string,
    stock?: Stock,
) {

    try {
        fieldValueNumber(id, 'id');

        if (name) {
            fieldValueString(name, 'name');
        }
        if (description) {
            fieldValueString(description, 'description');
        }
        if (price) {
            fieldValueNumber(price, 'price');
        }
        if (imageUrl) {
            fieldValueImageUrl(imageUrl);
        }
        if (stock) {
            fieldValueNumber(stock.quantity, 'stock-quantity');
        }
    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }

}

