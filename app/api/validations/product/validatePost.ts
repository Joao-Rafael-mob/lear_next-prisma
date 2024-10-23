import { fieldValueImageUrl, fieldValueNumber, fieldValueString } from "../global/fieldValue";

export function validatePost(
name?: string, description?: string, price?: number, imageUrl?: string, stockQuantity?: number,
): void {

    try {
        fieldValueString(name, 'name');
        fieldValueString(description, 'description');
        fieldValueNumber(price, 'price');
        fieldValueImageUrl(imageUrl);
    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }
}