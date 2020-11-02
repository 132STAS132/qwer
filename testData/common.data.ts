import * as faker from "faker";
import { userInterface } from "../interfaces/widjetForms.interface";

class CommonData {
    randomMailTrapEmail(): string {
        return `e659345dfe-cf3bb0+${faker.random.uuid()}@inbox.mailtrap.io`;
    }

    get existingTestUser(): userInterface {
        return {
            email: 'e659345dfe-cf3bb0@inbox.mailtrap.io',
            password: process.env.DEFAULT_USER_PASSWORD,
            firstName: 'James',
            lastName: 'Smt',
        }
    }

    get url(): { rentgrata: string, appStore: string } {
        return {
            rentgrata: 'https://www.rentgrata.com/',
            appStore: 'https://apps.apple.com/us/app/rentgrata-chicago-apartments/id1241475303?ls=1'
        }
    }
}

export const commonData = new CommonData();