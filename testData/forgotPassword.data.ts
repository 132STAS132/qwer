import { forgotPasswordFormInterface } from "../interfaces/widjetForms.interface";

class ForgotPasswordData {
    get form(): forgotPasswordFormInterface {
        return {
            title: "Forgot Password",
            description: "Enter your email address or phone number and we'll send you a link or code to reset your password."
        }
    }
}

export const forgotPasswordData = new ForgotPasswordData();