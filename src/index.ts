import * as fs from "fs";
import * as path from "path";
import { readFileWithoutBOM } from "./bom_replace";

/**
 * TSVファイルをCSV形式に変換する関数
 * 各カラムを必ずダブルクォートで囲む
 * @param tsvText - TSV形式の文字列
 * @returns CSV形式の文字列
 */
export function tsvToCsv(tsvText: string): string {
  if (!tsvText) return "";

  // 改行コードの違い（\r\n, \n, \r）を吸収
  const lines = tsvText.split(/\r\n|\n|\r/);

  return lines
    .map((line) => {
      // 空行はスキップ
      if (line.trim() === "") return "";

      // タブ区切りで分割
      const fields = line.split("\t");

      return fields
        .map((field) => {
          // null/undefinedは空文字に
          if (field == null || field === "undefined" || field === "null")
            field = "";

          // フィールド内のダブルクォートは2つにエスケープし、必ずダブルクォートで囲む
          return `"${String(field).replace(/"/g, '""')}"`;
        })
        .join(",");
    })
    .join("\n");
}

// ファイルとして使う場合
if (require.main === module) {
  const tsvPath = path.resolve(__dirname, "../data/test.tsv");
  const csvPath = path.resolve(__dirname, "../data/test.csv");
  const tsvText = fs.readFileSync(tsvPath, "utf-8");
  const csvText = tsvToCsv(tsvText);
  fs.writeFileSync(csvPath, csvText, "utf-8");
  console.log(`Converted ${tsvPath} to ${csvPath}`);

  const tsvBomPath = path.resolve(__dirname, "../data/test_bom.tsv");
  const csvBomPath = path.resolve(__dirname, "../data/test_bom.csv");
  const tsvBomText = readFileWithoutBOM(tsvBomPath);
  const csvBomText = tsvToCsv(tsvBomText);
  fs.writeFileSync(csvBomPath, csvBomText, "utf-8");
  console.log(`Converted ${tsvBomPath} to ${csvBomPath}`);
}
