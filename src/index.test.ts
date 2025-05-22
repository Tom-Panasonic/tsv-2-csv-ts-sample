test("check", () => {
  console.log("OK");
});

import { tsvToCsv } from "./index";
test("tsvToCsv", () => {
  const tsvText = "name\tage\nJohn Doe\t30\nJane Smith\t25";
  const expectedCsvText = "name,age\nJohn Doe,30\nJane Smith,25";
  const result = tsvToCsv(tsvText);
  expect(result).toBe(expectedCsvText);
});
