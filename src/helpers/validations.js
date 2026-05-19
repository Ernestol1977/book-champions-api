export const validateString = (str, minLength, maxLength) => {
    if (minLength && str.length < minLength) {
        return false;
    } else if (maxLength && str.length > maxLength) {
        return false;
    }

    return true;
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const emailRegex = /^[\w-#&]+@[\w]+(\.[a-z]{2,4}){1,2}$/;
    return emailRegex.test(email);
};

export const validatePassword = (
    password,
    minLength,
    maxLength,
    needsUppercase,
    needsNumber,
) => {
    if (minLength && password.length < minLength) {
        return false;
    } else if (maxLength && password.length > maxLength) {
        return false;
    } else if (needsUppercase && !/[A-Z]/.test(password)) return false;
    else if (needsNumber && !/\d/.test(password)) return false;

    return true;
};

export const validateLoginUser = (body) => {
    const result = {
        error: false,
        message: "",
    };

    const { email, password } = body;

    if (!email || !validateEmail(email)) {
        ((result.error = true), (result.message = "Email invalido"));
    } else if (!password || !validatePassword(password, 7, null, true, true)) {
        ((result.error = true), (result.message = "Contraseña inválida"));
    }

    return result;
};

export const validateRegisterUser = (body) => {
    const result = {
        error: false,
        message: "",
    };

    const { userName, email, password } = body;

    if (!userName || !validateString(userName, 4, 20)) {
        return {
            error: true,
            message: "Usuario inválido",
        };
        // Fijémonos que acá le saco {}, return, y le pongo result. y cambio, por ;
    } else if (!email || !validateEmail(email)) {
        result.error = true;
        result.mesagge = "Email inválido";
    } else if (!password || !validatePassword(password, 7, null, true, true)) {
        result.error = true;
        result.message = "Contraseña inválida";
    }

    return result;
};
