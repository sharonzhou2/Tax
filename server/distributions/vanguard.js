const getCategoryVan = (line, results) => {
  const category = [
    "13U",
    "13C",
    "13Q",
    "13R",
    "13A",
    "18A",
    "18H",
    "19K",
    "20E",
    "20M",
    "20O",
    "20F",
  ];

  // console.log(line);

  line.forEach((text, i) => {
    const found = text.split(" ").find((element) => category.includes(element));
    // console.log(text.split(" "));
    if (found) {
      console.log(text);
      let indexOf = text.indexOf(found);
      let number = text.substring(indexOf + 3, indexOf + 11);

      if (!number.includes("$")) {
        number = line[i + 1].substring(0, 10);
      }
      if (number.includes("$")) {
        if (!results.category) {
          results[found] = number;
        }
      }
    }
  });
};

module.exports = { getCategoryVan };
