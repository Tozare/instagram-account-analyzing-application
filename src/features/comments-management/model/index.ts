import * as stores from "./stores";
import * as events from "./events";
import * as selectors from "./selectors";
import * as effects from "./effects";
import {FilterData} from "../types";
import {filter} from "../libs/filter";
import {$replyText} from "./stores";
import {setReplyText} from "./events";
import {effect} from "@chakra-ui/react";

stores
    .$filteredComments
    .on(events.setFilteredComments, (state: any[], data: any[]) => {return data})
    .on(events.filter, (state: any[], data:FilterData) => {
        const filteredPosts = filter(data);
        console.log(filteredPosts);
        return filteredPosts;
    })

stores
    .$searchFilter
    .on(events.setSearchFilter, (state, data) => {return data})

stores
    .$statusFilter
    .on(events.setStatusFilter, (state,data) => {return data})

stores
    .$isReplyCommentModalOpen
    .on(events.setIsReplyCommentModal, (state, data) => {return data})
    .on(effects.replyCommentFx.doneData, (state, data) => {
        return false;
    })

stores
    .$replyText
    .on(events.setReplyText, (state, data) => {return data})
    .on(effects.replyCommentFx.doneData, (state, data) => {
        return "";
    })

// stores
//     .$selectedPostsIdsMap
//     .on(events.changeSelectedPostIdInMap, (state, data) => {
//         if (state[data]){
//          return {
//                 ...state,
//                 data: true
//             };
//         } else {
//             return {
//                 ...state,
//                 data: true
//             };
//         }
//     })
//     .on(events.setSelectedPostsIdsMap, (state, data) => {return data});



export const commentsManagementModel = {
    stores,
    selectors,
    events,
    effects
};

//TODO: ADD statusFilterType

