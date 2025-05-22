# typescript で tsv を csv に変換する

## 概要

このプロジェクトは、TypeScript を使って TSV (タブ区切り値) ファイルを CSV (カンマ区切り値) ファイルに変換するサンプルです。

## インストール必要なモジュール群

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.npmjs.com/package/typescript)
- [ts-node](https://www.npmjs.com/package/ts-node)（開発用）
- [@types/node](https://www.npmjs.com/package/@types/node)（型定義）

```bash
npm install typescript ts-node @types/node jest ts-jest @types/jest --save-dev
```

## 環境構築手順

1. リポジトリをクローンします。

   ```bash
   git clone <リポジトリURL>
   cd tsv-2-csv-ts-sample
   ```

2. 必要なモジュールをインストールします。

   ```bash
   npm install
   ```

3. TypeScript の設定ファイル（`tsconfig.json`）を作成します。

   ```bash
   npx tsc --init
   ```

4. 必要に応じて `tsconfig.json` の内容を編集します。例えば、Node.js で動作させる場合は以下のように設定します。

   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "commonjs",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     }
   }
   ```

## 使用方法

実行方法:

```bash
npx ts-node src/index.ts
```
