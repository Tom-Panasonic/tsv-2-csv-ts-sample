import { tsvToCsv } from "./index";

test("tsvToCsv converts basic TSV to CSV", () => {
  const tsvText = "name\tage\nJohn Doe\t30\nJane Smith\t25";
  const expectedCsvText = `"name","age"
"John Doe","30"
"Jane Smith","25"`;
  const result = tsvToCsv(tsvText);
  expect(result).toBe(expectedCsvText);
});

test("tsvToCsv handles empty string", () => {
  expect(tsvToCsv("")).toBe("");
});

test("tsvToCsv handles CRLF line endings", () => {
  const tsvText = "name\tage\r\nJohn Doe\t30\r\nJane Smith\t25";
  const expectedCsvText = `"name","age"
"John Doe","30"
"Jane Smith","25"`;
  expect(tsvToCsv(tsvText)).toBe(expectedCsvText);
});

test("tsvToCsv handles CR line endings", () => {
  const tsvText = "name\tage\rJohn Doe\t30\rJane Smith\t25";
  const expectedCsvText = `"name","age"
"John Doe","30"
"Jane Smith","25"`;
  expect(tsvToCsv(tsvText)).toBe(expectedCsvText);
});

test("tsvToCsv handles empty fields", () => {
  const tsvText = "name\tage\nJohn Doe\t\n\t25";
  const expectedCsvText = `"name","age"
"John Doe",""
"","25"`;
  expect(tsvToCsv(tsvText)).toBe(expectedCsvText);
});

test("tsvToCsv skips empty lines", () => {
  const tsvText = "name\tage\n\nJohn Doe\t30\n\nJane Smith\t25\n";
  const expectedCsvText = `"name","age"

"John Doe","30"

"Jane Smith","25"
`;
  expect(tsvToCsv(tsvText)).toBe(expectedCsvText);
});

test("tsvToCsv handles multi-line TSV with undefined and null fields", () => {
  const tsvText = `name\tage\tcity
John Doe\t30\t
Jane Smith\t\tTokyo
Bob\t${undefined}\t${null}`;
  const expectedCsvText = `"name","age","city"
"John Doe","30",""
"Jane Smith","","Tokyo"
"Bob","",""`;
  expect(tsvToCsv(tsvText)).toBe(expectedCsvText);
});

test("tsvToCsv handles multi-line TSV with empty, undefined, and null fields", () => {
  const tsvText = `a\tb\tc
1\t\t3
\t${undefined}\t
${null}\t2\t`;
  const expectedCsvText = `"a","b","c"
"1","","3"
"","",""
"","2",""`;
  expect(tsvToCsv(tsvText)).toBe(expectedCsvText);
});

test("tsvToCsv throws for non-string input (number)", () => {
  // @ts-expect-error
  expect(() => tsvToCsv(123)).toThrow();
});

test("tsvToCsv throws for non-string input (object)", () => {
  // @ts-expect-error
  expect(() => tsvToCsv({})).toThrow();
});
