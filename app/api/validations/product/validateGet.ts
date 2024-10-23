import { fieldValueNumber, fieldValueString } from "../global/fieldValue";

export function validateGet(
    name?: string,
   
) {

    try {
        fieldValueString(name, 'name');

    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }

}