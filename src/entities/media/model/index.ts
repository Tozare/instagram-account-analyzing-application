// import * as domains from "./domains";
// import * as effects from "./effects";
import * as stores from "./stores";
import * as events from "./events";
import * as selectors from "./selectors";
import * as effects from "./effects";
import {graphApi} from "../../../shared/api/graph-api";


stores
    .$posts
    .on(events.updatePosts, (state: any[], data: any[]) => {return data})
    .on(effects.getAllMediaPostsFx.doneData, (state, data) => {return data})

stores
    .$selectedPostId
    .on(events.setPostId, (state, data) => {return data})

stores
    .$postComments
    .on(events.updatePostComments, (state,data) => {return data})
    .on(effects.getPostCommentsFx.doneData, (state, data) => {return data})

export const mediaModel = {
    stores,
    selectors,
    events,
    effects
};
