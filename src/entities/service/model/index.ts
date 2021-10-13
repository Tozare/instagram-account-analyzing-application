// import * as domains from "./domains";
// import * as effects from "./effects";
import * as stores from "./stores";
import * as events from "./events";
import * as selectors from "./selectors";
import * as effects from "./effects";


stores
    .$commentsServiceState
    .on(events.updateCommentsServiceState, (state, data) => {return data})

export const serviceModel = {
    stores,
    selectors,
    events,
    effects
};
