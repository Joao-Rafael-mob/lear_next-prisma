import prisma from "../../../lib/prisma";
import { fieldValueString } from "../global/fieldValue";

interface ValidationErrors {
    name?: string;
    email?: string;
    senha?: string;
    emailFormat?: string;
}

export function validatePost(name: any, email: string, senha: any): ValidationErrors {
    const errors: Record<string, string> = {};

    fieldValueString(name, 'nome', errors);

    fieldValueString(email, 'email', errors);

    fieldValueString(senha, 'senha', errors)
  
    return errors;
}