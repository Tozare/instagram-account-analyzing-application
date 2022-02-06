import {createEvent, createStore, sample} from "effector";
import {createEffect} from "effector/effector.mjs";
import {backendAPI} from "shared/api/backend";


export const $comments = createStore<any[]>([]);
export const commentsChanged = createEvent<any[]>();
$comments.on(commentsChanged, (_, data) => data);

export const $searchText = createStore<string>("");
export const searchTextChanged = createEvent<string>();
$searchText.on(searchTextChanged, (_,data) => data);

export const $selectedComments = createStore<Record<string|number, any>>({});
export const selectedCommentsChanged = createEvent<Record<string|number, any>>();
export const commentSelected = createEvent<string|number>();

export const $state = createStore<string>("NONE");
export const stateChanged = createEvent<string>();
$state.on(stateChanged, (_,data) => data);

$selectedComments
    .on(selectedCommentsChanged, (_,data) => data)
    .on(commentSelected, (_,data) => {
        return {
            ..._,
            [data]: true
        }
    })

export type GetCommentsWhenSearchTextChangedFx = {
    searchText: string
}



export const getCommentsWhenSearchTextChangedFx = createEffect(async ({searchText}: GetCommentsWhenSearchTextChangedFx) => {
    stateChanged("LOADING")
    backendAPI.getCommentsBySearchText(searchText).then((res) => {
        commentsChanged(res.data);
        selectedCommentsChanged({});
        stateChanged("NONE");
    })
})

export const searchButtonClicked = createEvent();



sample({
    clock: searchButtonClicked,
    source: $searchText,
    fn: (searchText) => { return {searchText}},
    target: getCommentsWhenSearchTextChangedFx
})

export const $isReplyModalOpen = createStore<boolean>(false);
export const isReplyModalOpenChanged = createEvent<boolean>();
$isReplyModalOpen.on(isReplyModalOpenChanged, (_,data) => data);

export const $replyText = createStore<string>("");
export const replyTextChanged = createEvent<string>();
$replyText.on(replyTextChanged, (_,data) => data);
