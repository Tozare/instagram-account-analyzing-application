import { createEffect, createEvent, createStore, combine } from "effector";
import {Thresholds} from "entities/thresholds";

export const $insultThreshold = createStore<number>(0.4);
export const insultThresholdChanged = createEvent<number>();
$insultThreshold.on(insultThresholdChanged, (_,data) => data);

export const $identityHateThreshold = createStore<number>(0.4);
export const identityHateThresholdChanged = createEvent<number>();
$identityHateThreshold.on(identityHateThresholdChanged, (_,data) => data);

export const $obsceneThreshold = createStore<number>(0.4);
export const obsceneThresholdChanged = createEvent<number>();
$obsceneThreshold.on(obsceneThresholdChanged, (_,data) => data);

export const $severeToxicThreshold = createStore<number>(0.4);
export const severeToxicThresholdChanged = createEvent<number>();
$severeToxicThreshold.on(severeToxicThresholdChanged, (_,data) => data);

export const $threatThreshold = createStore<number>(0.4);
export const threatThresholdChanged = createEvent<number>();
$threatThreshold.on(threatThresholdChanged, (_,data) => data);

export const $toxicThreshold = createStore<number>(0.4);
export const toxicThresholdChanged = createEvent<number>();
$toxicThreshold.on(toxicThresholdChanged, (_,data) => data);

export const $thresholds = combine({
    $insultThreshold,
    $identityHateThreshold,
    $obsceneThreshold,
    $severeToxicThreshold,
    $threatThreshold,
    $toxicThreshold
  },
  (stores): Thresholds => ({
    insultThreshold: stores.$insultThreshold,
    identityHateThreshold: stores.$identityHateThreshold,
    obsceneThreshold: stores.$obsceneThreshold,
    severeToxicThreshold: stores.$severeToxicThreshold,
    threatThreshold: stores.$threatThreshold,
    toxicThreshold: stores.$toxicThreshold,
  })
);
