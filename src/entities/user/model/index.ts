import {backendAPI} from "shared/api/backend";
import {createEffect, createEvent, createStore, guard, sample} from "effector";
import {graphApi} from "shared/api/graph-api";


export const userMetricsChanged = createEvent<any[]>();
export const $userMetrics = createStore<any[]>([]);

export const userPageIdChanged = createEvent<string>();
export const $userPageId = createStore<string|number>("");

export const userUpdated = createEvent<any>();
export const $user = createStore<any>(null);


export const getUserPageIdFX = createEffect(async () => {
  const facebookPages = await graphApi.getFacebookPages();
  // const user = await graphApi.getUserInfo(instagramPageAccountId);
  // const userMetrics = await graphApi.getUserInsights(instagramPageAccountId);
  // events.updateUser(user);
  // events.updateUserMetrics(userMetrics);
  return await graphApi.getInstagramAccountId(facebookPages[0].id);
});

export const getUserInformationFx = createEffect(async(pageId: string):any => {
  return await graphApi.getUserInfo(pageId);
})

export const postUserInformation = createEffect((user: any) => {
  backendAPI.postUser(user);
})

$user
  .on(getUserInformationFx.doneData, (_, data) => {return data});

$userMetrics
  .on(userMetricsChanged, (_ ,data) => {return data})

$userPageId
  .on(userPageIdChanged, (_ ,data) => {return data})
  .on(getUserPageIdFX, (state, data) => {return data});

$user
  .on(userUpdated, (_,data) => {return data})

sample({
  clock: $userPageId,
  target: [
    getUserInformationFx,
  ]
})

guard({
  clock: $user,
  filter: (_, user) => user !== null,
  target: [
    postUserInformation,
  ],
});

