import {combine, createEvent, createStore, sample} from "effector";
import { mediaModel } from "entities/media";
import { thresholdsModel } from "entities/thresholds";
import * as config from "../config";

export const thresholdsChanged = createEvent();

export const $insultThreshold = createStore<number>(0.5);
export const insultThresholdChanged = createEvent<number>();
$insultThreshold.on(insultThresholdChanged, (_,data) => data);
$insultThreshold.on(thresholdsModel.$insultThreshold, (_,data) => data);

export const $identityHateThreshold = createStore<number>(0.5);
export const identityHateThresholdChanged = createEvent<number>();
$identityHateThreshold.on(identityHateThresholdChanged, (_,data) => data);
$identityHateThreshold.on(thresholdsModel.$identityHateThreshold, (_,data) => data);


export const $obsceneThreshold = createStore<number>(0.5);
export const obsceneThresholdChanged = createEvent<number>();
$obsceneThreshold.on(obsceneThresholdChanged, (_,data) => data);
$obsceneThreshold.on(thresholdsModel.$obsceneThreshold, (_,data) => data);

export const $severeToxicThreshold = createStore<number>(0.5);
export const severeToxicThresholdChanged = createEvent<number>();
$severeToxicThreshold.on(severeToxicThresholdChanged, (_,data) => data);
$severeToxicThreshold.on(thresholdsModel.$severeToxicThreshold, (_,data) => data);

export const $threatThreshold = createStore<number>(0.5);
export const threatThresholdChanged = createEvent<number>();
$threatThreshold.on(threatThresholdChanged, (_,data) => data);
$threatThreshold.on(thresholdsModel.$threatThreshold, (_,data) => data);

export const $toxicThreshold = createStore<number>(0.5);
export const toxicThresholdChanged = createEvent<number>();
$toxicThreshold.on(toxicThresholdChanged, (_,data) => data);
$toxicThreshold.on(thresholdsModel.$toxicThreshold, (_,data) => data);


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


sample({
  clock: thresholdsChanged,
  source: $thresholds,
  fn: (thresholds) => {
    return thresholds;
  },
  target: [
    thresholdsModel.toxicThresholdChanged.prepend(({ toxicThreshold }) => toxicThreshold),
    thresholdsModel.insultThresholdChanged.prepend(({ insultThreshold }) => insultThreshold),
    thresholdsModel.identityHateThresholdChanged.prepend(({ identityHateThreshold }) => identityHateThreshold),
    thresholdsModel.obsceneThresholdChanged.prepend(({ obsceneThreshold }) => obsceneThreshold),
    thresholdsModel.severeToxicThresholdChanged.prepend(({ severeToxicThreshold }) => severeToxicThreshold),
    thresholdsModel.threatThresholdChanged.prepend(({ threatThreshold }) => threatThreshold),
    thresholdsModel.toxicThresholdChanged.prepend(({ toxicThreshold }) => toxicThreshold),
  ]
})

export const thresholdsTemplateChanged = createEvent<string>();
export const $thresholdsTemplate = createStore<string>("CUSTOM");
$thresholdsTemplate
  .on(thresholdsTemplateChanged, (_, data) => data);

// sample({
//   clock: [
//     insultThresholdChanged,
//     identityHateThresholdChanged,
//     obsceneThresholdChanged,
//     severeToxicThresholdChanged,
//     threatThresholdChanged,
//     severeToxicThresholdChanged,
//     toxicThresholdChanged,
//   ],
//   target: thresholdsTemplateChanged.prepend(() => "CUSTOM"),
// });


sample({
  clock: thresholdsTemplateChanged,
  fn: (templateKey) => {
    const template = config.THRESHOLDS_TEMPLATES[templateKey];
    return template
  },
  target: [
    toxicThresholdChanged.prepend(({ toxicThreshold }) => toxicThreshold),
    insultThresholdChanged.prepend(({ insultThreshold }) => insultThreshold),
    identityHateThresholdChanged.prepend(({ identityHateThreshold }) => identityHateThreshold),
    obsceneThresholdChanged.prepend(({ obsceneThreshold }) => obsceneThreshold),
    severeToxicThresholdChanged.prepend(({ severeToxicThreshold }) => severeToxicThreshold),
    threatThresholdChanged.prepend(({ threatThreshold }) => threatThreshold),
    toxicThresholdChanged.prepend(({ toxicThreshold }) => toxicThreshold),
  ]
})
