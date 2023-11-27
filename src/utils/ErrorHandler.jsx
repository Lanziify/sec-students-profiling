export const ErrorHandler = {
  AuthError: (error, AuthErrorCodes) => {
    let errorMessage = "";
    switch (error.code) {
      case AuthErrorCodes.INVALID_PASSWORD:
        errorMessage = "Password incorrect. Please try again.";
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        errorMessage = "Too many attempts. Please try again later.";
        break;
      case "auth/user-not-found":
        errorMessage = "User does not exist.";
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        errorMessage = "Email address already in use.";
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        errorMessage = "Weak password! Please try again.";
        break;
      default:
        errorMessage = "Oops! Something went wrong.";
        break;
    }
    return errorMessage;
  },
};
