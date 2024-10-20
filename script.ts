const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;

const validateEmail = (email: string): boolean => {
    return emailRegex.test(email);
};

// Testando a função
console.log(validateEmail("exemplo@dominio.com"));    // true
console.log(validateEmail("invalido@dominio"));       // false
console.log(validateEmail("invalido@dominio."));      // false
console.log(validateEmail("invalido@.dominio.com"));   // false
console.log(validateEmail("invalido@dominio.c"));      // false
console.log(validateEmail("valido@dominio.co.uk"));    // true
console.log(validateEmail("valido@dominio.com.br"));    // true
console.log(validateEmail("invalido@dominio.c1"));      // false
