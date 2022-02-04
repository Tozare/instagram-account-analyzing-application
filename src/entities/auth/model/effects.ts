import {createEffect} from "effector";
import {authApi} from "../../../shared/api/auth";
import {updateToken} from "./events";


export const loginInFacebookFx = createEffect(async () => {
    const token = await authApi.loginFromFacebook();
    // console.log(token);
    if (typeof token === "string") {
        localStorage.setItem("facebook-token", token);
        // updateToken(token);
        return token;
    }
    return "";
})

export const logoutFromFacebookFx = createEffect(async () => {
    const token = authApi.logoutFromFacebook();
    localStorage.removeItem("facebook-token")
    updateToken("");
    return "";
})



