import { fieldValueString, fieldValueNumber, fieldValueEmailBoolean } from "../global/fieldValue";

export function validatePut(
    id: number,
    name?: string,
    email?: string,
    senha?: string
): void {
    try {

        fieldValueNumber(id, 'id');

        if (email) {
            fieldValueEmailBoolean(email, 'email');
        }
        if (name) {
            fieldValueString(name, 'name');
        }
        if (senha) {
            fieldValueString(senha, 'senha');
        }

    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }
}
