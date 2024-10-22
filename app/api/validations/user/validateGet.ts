import { fieldValueEmailBoolean, fieldValueString } from "../global/fieldValue";

export function validateGet(
    email: string
): void {
    try {

        fieldValueString(email, 'email');

        fieldValueEmailBoolean(email, 'email');
    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);

    }

}