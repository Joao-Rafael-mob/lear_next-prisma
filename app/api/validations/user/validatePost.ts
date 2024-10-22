import { fieldValueEmailBoolean, fieldValueString } from "../global/fieldValue";

export function validatePost(
    name?: any,
    email?: string,
    senha?: any
): void {
    try {

        fieldValueString(name, 'nome');

        fieldValueString(email, 'email');

        fieldValueString(senha, 'senha');

        fieldValueEmailBoolean(email, 'email');
    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);

    }


}