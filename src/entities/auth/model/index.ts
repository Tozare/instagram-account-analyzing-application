import {createEffect, createEvent, createStore, restore, sample, forward, split} from "effector";
import {authApi} from "shared/api/auth";
import {PATHS} from "shared/config";


export const tokenUpdated = createEvent<string>()
export const $authToken = restore<string>(tokenUpdated, "");
export const loginInFacebookAccountStarted = createEvent();
export const logoutFromFacebookAccountStarted = createEvent();
export const $token = createStore("f")


export const navigateAfterLoggingInFx = createEffect(() => {
  window.location.pathname = PATHS.MEDIA;
})

export const navigateAfterLoggingOutFx = createEffect(() => {
  window.location.pathname = PATHS.HOME;
})

export const loginInFacebookFx = createEffect(async () => {
  const token = await authApi.loginFromFacebook();
  if (typeof token === "string") {
    localStorage.setItem("facebook-token", token);
    return token;
  }
  return "";
});

export const logoutFromFacebookFx = createEffect(async () => {
  const token = authApi.logoutFromFacebook();
  localStorage.removeItem("facebook-token");
  return "";
});

$authToken
    .on(loginInFacebookFx.doneData, (_,data) => {return data})
    .on(logoutFromFacebookFx.doneData, (_,data) => {return data})

forward({
  from: logoutFromFacebookAccountStarted,
  to: logoutFromFacebookFx,
});

forward({
  from: loginInFacebookAccountStarted,
  to: loginInFacebookFx,
});

// TODO: change to split method
forward({
  from: loginInFacebookFx.doneData,
  to: navigateAfterLoggingInFx
});

forward({
  from: logoutFromFacebookFx.doneData,
  to: navigateAfterLoggingInFx
});




