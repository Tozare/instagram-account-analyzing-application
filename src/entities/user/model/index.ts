import {backendAPI} from "shared/api/backend";
import {createEffect, createEvent, createStore, guard, sample} from "effector";
import {graphApi} from "shared/api/graph-api";


export const userMetricsChanged = createEvent<any[]>();
export const $userMetrics = createStore<any[]>([]);

export const userPageIdChanged = createEvent<string>();
export const $userPageId = createStore<string|number>("");

export const userUpdated = createEvent<any>();
export const $user = createStore<any>(null);

$user.watch(console.warn);
export const getUserPageIdFX = createEffect(async () => {
  const facebookPages = await graphApi.getFacebookPages();
  // const id =
  return await graphApi.getInstagramAccountId(facebookPages[0].id);
});

export const getUserInformationFx = createEffect(async(pageId: string):any => {
  const user = await graphApi.getUserInfo(pageId);
  console.log(`pageId: ${pageId}`);
  console.log(user);
  return user;
})

export const postUserInformation = createEffect((user: any) => {
  backendAPI.postUser(user);
  return 1;
})

$user
  .on(getUserInformationFx.doneData, (_, data) => {return data});

$user.watch(console.warn);

$userMetrics
  .on(userMetricsChanged, (_ ,data) => {return data})

$userPageId
  .on(userPageIdChanged, (_ ,data) => {return data})
  .on(getUserPageIdFX.doneData, (state, data) => {return data});

getUserPageIdFX.doneData.watch((data) => {
  // console.log("getUserPageIdFX.doneData.watch");
  // console.log(data);
})

$user
  .on(userUpdated, (_,data) => {return data})

guard({
  clock: $userPageId,
  filter: (userPageId) => !!userPageId,
  target: [
    getUserInformationFx,
  ]
})

guard({
  clock: $user,
  filter: (user) => user !== null,
  target: [
    postUserInformation,
  ],
});

