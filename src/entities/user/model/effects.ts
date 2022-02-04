import {createEffect} from "effector";
import {graphApi} from "../../../shared/api/graph-api";
import * as events from './events';

export const getUserPageIdFX = createEffect(async () => {
    const facebookPages = await graphApi.getFacebookPages();
    const instagramPageAccountId = await graphApi.getInstagramAccountId(facebookPages[0].id);
    console.log("getUserPageIdFX")

    const user = await graphApi.getUserInfo(instagramPageAccountId);
    events.updateUser(user);
    const userMetrics = await graphApi.getUserInsights(instagramPageAccountId);
    events.updateUserMetrics(userMetrics);
    return instagramPageAccountId;
})




