import { regexEmail } from "./regexEmail";

export function fieldValueString(fieldValue: string, fieldName: string): string {
    if (!fieldValue || fieldValue.trim() === '') {
        throw new Error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} não pode ser vazio.`);
    }
    return fieldValue;
}

export function fieldValueNumber(fieldValue: number, fieldName: string): number {
    if (fieldValue === undefined || fieldValue === null || isNaN(fieldValue)) {
        throw new Error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} deve ser um número válido.`);
    }
    return fieldValue;
}
export function fieldValueEmailBoolean(fieldValue: string, fieldName: string): void {
    if (fieldValue && !regexEmail(fieldValue)) {
        throw new Error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} está em um formato errado.`);
    }
}

export function fieldValueImageUrl(imageUrl: string | undefined): void {
    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
        throw new Error('A URL da imagem deve ser uma string válida.');
    }
}

