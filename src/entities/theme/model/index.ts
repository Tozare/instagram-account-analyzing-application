// import * as domains from "./domains";
// import * as effects from "./effects";
import * as stores from "./stores";
import * as events from "./events";
import * as selectors from "./selectors";
import {$colorMode} from "./stores";


stores
    .$colorMode
    .on(events.changeColorMode, (state, data: string) => {
        return data;
    });

export const themeModel = {
    stores,
    selectors,
    events,
};
