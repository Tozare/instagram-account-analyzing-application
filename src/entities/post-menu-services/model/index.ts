import {createEvent, createStore} from "effector";
import * as config from "../config";
import * as typing from "../typing";

export const $postMenuService = createStore<typing.CommentsServicesState>(config.POST_MENU_SERVICES.MANAGEMENT);
export const postMenuServiceChanged = createEvent<typing.CommentsServicesState>()

$postMenuService
  .on(postMenuServiceChanged, (_, data) => {return data})

