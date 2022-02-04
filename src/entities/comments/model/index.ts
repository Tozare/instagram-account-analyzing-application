import {combine, createEvent, createStore} from "effector";


export const $insultThreshold = createStore<number>(0);
export const insultThresholdChanged = createEvent<number>();
$insultThreshold.on(insultThresholdChanged, (_,data) => data);

export const $identityHateThreshold = createStore<number>(0);
export const identityHateThresholdChanged = createEvent<number>();
$identityHateThreshold.on(identityHateThresholdChanged, (_,data) => data);


export const $obsceneThreshold = createStore<number>(0);
export const obsceneThresholdChanged = createEvent<number>();
$obsceneThreshold.on(obsceneThresholdChanged, (_,data) => data);

export const $severeToxicThreshold = createStore<number>(0);
export const severeToxicThresholdChanged = createEvent<number>();
$severeToxicThreshold.on(severeToxicThresholdChanged, (_,data) => data);

export const $threatThreshold = createStore<number>(0);
export const threatThresholdChanged = createEvent<number>();
$threatThreshold.on(threatThresholdChanged, (_,data) => data);

export const $toxicThreshold = createStore<number>(0);
export const toxicThresholdChanged = createEvent<number>();
$toxicThreshold.on(toxicThresholdChanged, (_,data) => data);


export type Thresholds = {
    insultThreshold: number,
    identityHateThreshold: number,
    obsceneThreshold: number,
    severeToxicThreshold: number,
    threatThreshold: number,
    toxicThreshold: number,
}

export const $thresholds = combine({
    $insultThreshold,
    $identityHateThreshold,
    $obsceneThreshold,
    $severeToxicThreshold,
    $threatThreshold,
    $toxicThreshold
},
(stores) => ({
    insultThreshold: stores.$insultThreshold,
    identityHateThreshold: stores.$identityHateThreshold,
    obsceneThreshold: stores.$obsceneThreshold,
    severeToxicThreshold: stores.$severeToxicThreshold,
    threatThreshold: stores.$threatThreshold,
    toxicThreshold: stores.$toxicThreshold,
    })
);
