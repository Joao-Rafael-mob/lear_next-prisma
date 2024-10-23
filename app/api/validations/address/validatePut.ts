import { fieldValueNumber, fieldValueString } from "../global/fieldValue";

export function validatePut(
    userId?: number,
    number?: string,
    district?: string,
    city?: string,
    state?: string,
    postalCode?: string,
) {

    try {

        fieldValueNumber(userId, 'userId');
        if (number) {
            fieldValueString(number, 'number');
        }
        if (district) {
            fieldValueString(district, 'district');
        }
        if (city) {
            fieldValueString(city, 'city');
        }
        if (state) {
            fieldValueString(state, 'state');
        }
        if (postalCode) {
            fieldValueString(postalCode, 'postalCode');
        }
    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }
}

