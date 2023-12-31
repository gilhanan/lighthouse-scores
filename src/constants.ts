import { ScoresPercentages, ScoresWeights } from "./models";

export const scoresWeights: ScoresWeights = {
  responseStart: 0.25,
  responseEnd: 0.25,
  slowestAssetDuration: 0.25,
  duration: 0.25,
};

export const scoresParameters: ScoresPercentages = {
  PDP: {
    responseStart: {
      p10: 290,
      median: 320,
    },
    responseEnd: {
      p10: 2820,
      median: 2880,
    },
    slowestAssetDuration: {
      p10: 4610,
      median: 4670,
    },
    duration: {
      p10: 5420,
      median: 5450,
    },
  },
  Gallery: {
    responseStart: {
      p10: 620,
      median: 640,
    },
    responseEnd: {
      p10: 3540,
      median: 3600,
    },
    slowestAssetDuration: {
      p10: 5870,
      median: 5910,
    },
    duration: {
      p10: 6860,
      median: 6950,
    },
  },
  "Embed PDP": {
    responseStart: {
      p10: 100,
      median: 130,
    },
    responseEnd: {
      p10: 710,
      median: 760,
    },
    slowestAssetDuration: {
      p10: 2420,
      median: 2480,
    },
    duration: {
      p10: 2950,
      median: 3000,
    },
  },
};
