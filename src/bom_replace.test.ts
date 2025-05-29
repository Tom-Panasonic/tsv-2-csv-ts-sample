import * as fs from "fs";
import { readFileWithoutBOM } from "./bom_replace";
import * as path from "path";

jest.mock("fs");

describe("readFileWithoutBOM", () => {
  const mockedReadFileSync = fs.readFileSync as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should remove BOM if present at the start of the file", () => {
    // 0xFEFF is BOM
    const bom = "\uFEFF";
    const content = "test content";
    mockedReadFileSync.mockReturnValue(bom + content);

    const result = readFileWithoutBOM("dummy.txt");
    expect(result).toBe(content);
    expect(mockedReadFileSync).toHaveBeenCalledWith("dummy.txt", "utf8");
  });

  it("should return the content as is if BOM is not present", () => {
    const content = "no bom here";
    mockedReadFileSync.mockReturnValue(content);

    const result = readFileWithoutBOM("dummy.txt");
    expect(result).toBe(content);
    expect(mockedReadFileSync).toHaveBeenCalledWith("dummy.txt", "utf8");
  });

  it("should not remove BOM if it is not at the start", () => {
    const content = "abc\uFEFFdef";
    mockedReadFileSync.mockReturnValue(content);

    const result = readFileWithoutBOM("dummy.txt");
    expect(result).toBe(content);
  });

  it("should handle empty file", () => {
    mockedReadFileSync.mockReturnValue("");

    const result = readFileWithoutBOM("dummy.txt");
    expect(result).toBe("");
  });
});
