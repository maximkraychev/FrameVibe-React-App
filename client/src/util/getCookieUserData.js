import { getCookieByName } from "./getCookieByName"
import { COOKIES_NAMES } from '../constants/cookies'

export const getCookieUserData = () => {
    const headerPayload = getCookieByName(COOKIES_NAMES.USER_DATA);

    if (headerPayload == null) {
        return null;
    }

    const [header, payload] = headerPayload.split('.');
    const userData = JSON.parse(atob(payload));
    return userData;
}