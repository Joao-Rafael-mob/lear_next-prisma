import { regexEmail } from "./regexEmail";

export function fieldValueString(
    fieldValue: string,
    fieldName: string,
    errors: Record<string, string>
) {
    if (!fieldValue || fieldValue.trim() === '') {
        errors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} não pode ser vazio.`;
    }
    return fieldValue;
}

export function fieldValueNumber(
    fieldValue: Number,
    fieldName: string,
    errors: Record<string, string>
) {
    if (!fieldValue || fieldValue.toString() === '') {
        errors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} não pode ser vazio.`;
    }
    return fieldValue;
}

export function fieldValueEmailBoolean(
    fieldValue: string,
    fieldName: string,
    errors: Record<string, string>
): void {
    if (!regexEmail(fieldValue)) {
        errors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} esta errado o formato.`;
    }
}