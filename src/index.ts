import * as fs from "fs";
import * as path from "path";

/**
 * TSVファイルをCSV形式に変換する関数
 * @param tsvText - TSV形式の文字列
 * @returns CSV形式の文字列
 */
export function tsvToCsv(tsvText: string): string {
  return tsvText
    .split("\n")
    .map((line) =>
      line
        .split("\t")
        .map((field) => {
          // フィールドにカンマやダブルクォートが含まれる場合はクォートする
          if (field.includes(",") || field.includes('"')) {
            return `"${field.replace(/"/g, '""')}"`;
          }
          return field;
        })
        .join(",")
    )
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
}
