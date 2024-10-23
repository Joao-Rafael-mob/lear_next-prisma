import { fieldValueNumber } from "../global/fieldValue";


export function validateDelete(
    id?: number

) {

    try {
       
        fieldValueNumber(id, 'id');
    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }

}