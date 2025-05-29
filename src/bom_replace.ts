import * as fs from "fs";

/**
 * ファイルを読み込み、BOMがあれば削除して返す関数
 * @param filePath - 読み込むファイルのパス
 * @returns BOM除去済みまたはそのままのデータ
 */
export function readFileWithoutBOM(filePath: string): string {
  const data = fs.readFileSync(filePath, "utf8");

  if (data.charCodeAt(0) === 0xfeff) {
    return data.slice(1);
  }
  return data;
}
