const { macquarieDividends } = require("./dividends/macquarie");

const divParsers = (dividendType, results, rest) => {
  switch (dividendType) {
    case "Macquarie": {
      return macquarieDividends(rest, results);
    }

    default: {
      return;
    }
  }
};

module.exports = { divParsers };
