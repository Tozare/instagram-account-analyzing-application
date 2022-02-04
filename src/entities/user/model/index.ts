// import * as domains from "./domains";
// import * as effects from "./effects";
import * as stores from "./stores";
import * as events from "./events";
import * as effects from "./effects";
import * as selectors from "./selectors";
import {$user} from "./stores";
import {updateUser} from "./events";
import {backendAPI} from "../../../shared/api/backend";
// import {postUser} from "../../../shared/api/backend";

stores
    .$userMetrics
    .on(events.updateUserMetrics, (state ,data) => {return data})


stores
    .$userPageId
    .on(events.updateUserPageId, (state ,data) => {return data})
    .on(effects.getUserPageIdFX, (state, data) => {return data});

stores
    .$user
    .on(events.updateUser, (state,data) => {return data})


updateUser.watch((data) => {
    // console.log(data);
    backendAPI.postUser(data);
})

export const userModel = {
    stores,
    selectors,
    events,
    effects
};
