import {
  $identityHateThreshold,
  $insultThreshold,
  $obsceneThreshold,
  $severeToxicThreshold, $threatThreshold, $toxicThreshold
} from "entities/thresholds/model";

export const TIME_ZONES = {
  // DAY: "DAY",
  // WEEK: ""
}

export const STATUS_TAGS = {
  INSULT: "INSULT",
  HATE: "HATE",
  OBSCENE: "OBSCENE",
  SEVERE_TOXIC: "SEVERE_TOXIC",
  THREAT: "THREAT",
  TOXIC: "TOXIC",
}

export const GRAPH_STATUS_TAGS_COLORS = {
  INSULT: "#E74C3C",
  HATE: "#2980B9",
  OBSCENE: "#ECF0F1",
  SEVERE_TOXIC: "#E67E22",
  THREAT: "#95A5A6",
  TOXIC: "#F1C40F",
}

export const COMMENT_STATUS_COLORS = {
  NEGATIVE: "#E74C3C",
  POSITIVE: "#8ecc8e",
  SELECTED: "#2980B9"
}
