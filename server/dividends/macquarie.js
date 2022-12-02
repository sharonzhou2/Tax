const macquarieDividends = (data, results) => {
  data[0].forEach((line, i) => {
    console.log(line);
    // line.map((words) => words.toLowerCase());
    // line = line.toLowerCase();

    if (line.includes("Ordinary Shares")) {
      console.log(line);

      // if (line.length() !== 7) {
      //   return;
      // }

      results["DRPS"] = line[1];
      results["SH"] = line[2];
      results["UF"] = line[3];
      results["FA"] = line[4];
      results["GA"] = line[5];
      results["FC"] = line[6];
      results["description"] = line[0];
    }

    if (line.includes("ASX Code:")) {
      results["date"] = line[3];
      results["name"] = line[4];
    }
  });
};

module.exports = { macquarieDividends };
