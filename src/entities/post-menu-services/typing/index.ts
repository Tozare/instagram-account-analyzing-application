import { POST_MENU_SERVICES } from "../config";

type keys = keyof typeof POST_MENU_SERVICES;
export type CommentsServicesState = typeof POST_MENU_SERVICES[keys];
