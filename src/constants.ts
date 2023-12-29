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
      p10: 270,
      median: 290,
    },
    responseEnd: {
      p10: 2770,
      median: 2800,
    },
    slowestAssetDuration: {
      p10: 4590,
      median: 4640,
    },
    duration: {
      p10: 5420,
      median: 5440,
    },
  },
  Gallery: {
    responseStart: {
      p10: 610,
      median: 620,
    },
    responseEnd: {
      p10: 3520,
      median: 3550,
    },
    slowestAssetDuration: {
      p10: 5860,
      median: 5910,
    },
    duration: {
      p10: 6760,
      median: 6830,
    },
  },
  "Embed PDP": {
    responseStart: {
      p10: 90,
      median: 120,
    },
    responseEnd: {
      p10: 670,
      median: 720,
    },
    slowestAssetDuration: {
      p10: 2410,
      median: 2480,
    },
    duration: {
      p10: 2820,
      median: 2860,
    },
  },
};
