import { fieldValueEmailBoolean, fieldValueNumber, fieldValueString } from "../global/fieldValue";

interface ValidationErrors {
    id?: string;
    name?: string;
    email?: string;
    senha?: string;
    emailFormat?: string;
}

export  function validatePut(id: any, name: any, email: any, senha: any): ValidationErrors{
    const errors: Record<string, string> = {};

    fieldValueNumber(id, 'id', errors);

    fieldValueString(name, 'name', errors);

    fieldValueString(email, 'email', errors);

    fieldValueString(senha, 'senha', errors);

    fieldValueEmailBoolean(email, 'email', errors);
    
    return errors;
}
