
import { fieldValueEmailBoolean, fieldValueString } from "../global/fieldValue";

export function validateDelete(
    email: string
) {
    try {

        fieldValueString(email, 'email');

        fieldValueEmailBoolean(email, 'email');
    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);

    }
}