import { regexEmail } from "./regexEmail";

export function fieldValueString(fieldValue: string, fieldName: string): string {
    if (!fieldValue || fieldValue.trim() === '') {
        throw new Error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} não pode ser vazio.`);
    }
    return fieldValue;
}

export function fieldValueNumber(fieldValue: number, fieldName: string): number {
    if (!fieldValue && fieldValue !== 0) { // Certificando que 0 é considerado um valor válido
        throw new Error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} não pode ser vazio.`);
    }
    return fieldValue;
}

export function fieldValueEmailBoolean(fieldValue: string, fieldName: string): void {
    if (fieldValue && !regexEmail(fieldValue)) {
        throw new Error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} está em um formato errado.`);
    }
}
