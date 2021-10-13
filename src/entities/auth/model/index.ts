// import * as domains from "./domains";
// import * as effects from "./effects";
import * as stores from "./stores";
import * as events from "./events";
import * as effects from "./effects";
import * as selectors from "./selectors";


stores
    .$authToken
    .on(events.updateToken, (state ,token) => {return token})
    .on(effects.loginInFacebookFx.doneData, (_,data) => {return data})
    .on(effects.logoutFromFacebookFx.doneData, (_,data) => {return data})

export const authModel = {
    stores,
    selectors,
    events,
    effects
};
