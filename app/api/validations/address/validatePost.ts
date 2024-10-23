import { fieldValueNumber, fieldValueString } from "../global/fieldValue";

export function validatePost(
    userId?: number,
    number?: string,
    district?: string,
    city?: string,
    state?: string,
    postalCode?: string,
) {
    try {
        fieldValueNumber(userId, 'userId');
        fieldValueString(number, 'number');
        fieldValueString(district, 'district');
        fieldValueString(city, 'city');
        fieldValueString(state, 'state');
        fieldValueString(postalCode, 'postalCode');
    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }


}