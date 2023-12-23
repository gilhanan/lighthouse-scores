import { ScoresPercentages } from "./models";

export const scoresParameters: ScoresPercentages = {
  PDP: {
    responseStart: {
      p10: 270,
      median: 540,
    },
    responseEnd: {
      p10: 2800,
      median: 5600,
    },
    slowestAssetDuration: {
      p10: 4600,
      median: 5580,
    },
    duration: {
      p10: 5300,
      median: 6715,
    },
  },
  Gallery: {
    responseStart: {
      p10: 580,
      median: 1160,
    },
    responseEnd: {
      p10: 3980,
      median: 4380,
    },
    slowestAssetDuration: {
      p10: 6490,
      median: 7140,
    },
    duration: {
      p10: 7660,
      median: 8420,
    },
  },
  "Embed PDP": {
    responseStart: {
      p10: 100,
      median: 200,
    },
    responseEnd: {
      p10: 825,
      median: 910,
    },
    slowestAssetDuration: {
      p10: 2640,
      median: 2905,
    },
    duration: {
      p10: 3410,
      median: 3750,
    },
  },
};
