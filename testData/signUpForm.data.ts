class SignUpFormData {
    get validationErrors(): { atLeast4: string, confirmationMatch: string }  {
        return {
            atLeast4: "Password must be at least 4 characters",
            confirmationMatch: "Please make sure your password and password confirmation match."
        }
    }
}

export const signUpFormData = new SignUpFormData();