import { REG } from "./Regex";

export const Validation = {
  validateLogin: (values) => {
    const errorMessage = {};

    if (!values.email) {
      errorMessage.email = "Email is required";
    } else if (!REG.email.test(values.email)) {
      errorMessage.email = "Please enter a valid email address";
    }
    // Password validation
    if (!values.password) {
      errorMessage.password = "Password is required";
    }
    return errorMessage;
  },
  validateRegister: (values) => {
    const errorMessage = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!values.displayName) {
      errorMessage.displayName = "Name is required";
    } else if (!REG.name.test(values.displayName)) {
      errorMessage.displayName = "Please enter your valid name";
    }
    if (!values.email) {
      errorMessage.email = "Email is required";
    } else if (!REG.email.test(values.email)) {
      errorMessage.email = "Please enter a valid email address";
    }
    // Password validation
    if (!values.password) {
      errorMessage.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errorMessage.password =
        "Password must be eight characters long, at least one letter and one number";
    }
    return errorMessage;
  },
  validatePasswordReset: (values) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const errorMessage = {};

    if (!values.current) {
      errorMessage.currentPassword = "Please enter your current password";
    }

    if (!values.new) {
      errorMessage.newPassword = "Please enter your new password";
    } else if (!passwordRegex.test(values.new)) {
      errorMessage.newPassword =
        "Password must be eight characters long, at least one letter and one number";
    }

    if (!values.confirm || values.new != values.confirm) {
      errorMessage.confirmPassword = "Password does not match";
    }

    return errorMessage;
  },
};

export default Validation;
