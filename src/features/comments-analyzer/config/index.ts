export const THRESHOLDS_TEMPLATES = {
  MEDIUM_NEGATIVE: {
    insultThreshold: 0.5,
    identityHateThreshold: 0.5,
    obsceneThreshold: 0.5,
    severeToxicThreshold: 0.5,
    threatThreshold: 0.5,
    toxicThreshold: 0.5
  } as const,
  HIGHLY_NEGATIVE: {
    insultThreshold: 0.8,
    identityHateThreshold: 0.8,
    obsceneThreshold: 0.8,
    severeToxicThreshold: 0.8,
    threatThreshold: 0.8,
    toxicThreshold: 0.8
  } as const,
  INSULT: {
    insultThreshold: 0.7,
    identityHateThreshold: 1,
    obsceneThreshold: 1,
    severeToxicThreshold: 1,
    threatThreshold: 1,
    toxicThreshold: 1,
  } as const,
  HATE: {
    insultThreshold: 1,
    identityHateThreshold: 0.7,
    obsceneThreshold: 1,
    severeToxicThreshold: 1,
    threatThreshold: 1,
    toxicThreshold: 1,
  } as const,
} as const;
