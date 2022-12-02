const { getCategoryBeta } = require("./distributions/betaShares");
const { getCategoryVan } = require("./distributions/vanguard");

const parsers = (etfType, results, rest) => {
  switch (etfType) {
    case "Vanguard": {
      return getCategoryVan(rest, results);
    }
    case "BetaShares": {
      return getCategoryBeta(rest, results);
    }
    default: {
      return;
    }
  }
};

module.exports = { parsers };
