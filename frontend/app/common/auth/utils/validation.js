// utils/validation.js
export const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const letterValid = /[a-zA-Z]/.test(password);
    const numberValid = /[0-9]/.test(password);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const upperCaseValid = /[A-Z]/.test(password);
  
    return {
      lengthValid,
      letterValid,
      numberValid,
      specialCharValid,
      upperCaseValid
    };
  };
  