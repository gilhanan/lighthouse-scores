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
      median: 350,
    },
    responseEnd: {
      p10: 2840,
      median: 2970,
    },
    slowestAssetDuration: {
      p10: 4570,
      median: 4720,
    },
    duration: {
      p10: 5550,
      median: 5700,
    },
  },
  Gallery: {
    responseStart: {
      p10: 590,
      median: 660,
    },
    responseEnd: {
      p10: 3590,
      median: 3690,
    },
    slowestAssetDuration: {
      p10: 5850,
      median: 5930,
    },
    duration: {
      p10: 6830,
      median: 7050,
    },
  },
  "Embed PDP": {
    responseStart: {
      p10: 110,
      median: 160,
    },
    responseEnd: {
      p10: 750,
      median: 870,
    },
    slowestAssetDuration: {
      p10: 2400,
      median: 2560,
    },
    duration: {
      p10: 2920,
      median: 3160,
    },
  },
};
