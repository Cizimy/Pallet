#!/usr/bin/env node

/**
 * プロジェクト初期化スクリプト
 * 新しいプロジェクトの雛形を作成します
 * 
 * 使用方法: node init-project.js <project-name>
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// コマンドライン引数からプロジェクト名を取得
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('エラー: プロジェクト名を指定してください');
  console.error('使用方法: node init-project.js <project-name>');
  process.exit(1);
}

const projectName = args[0];
const projectDir = path.join(process.cwd(), 'projects', projectName);

// プロジェクトディレクトリが既に存在するか確認
if (fs.existsSync(projectDir)) {
  console.error(`エラー: プロジェクト "${projectName}" は既に存在します`);
  process.exit(1);
}

// プロジェクト用のディレクトリ構造を作成
const directories = [
  '',
  'requirements',
  'requirements/raw',
  'requirements/structured',
  'requirements/final',
  'design',
  'design/architecture',
  'design/database',
  'design/ui',
  'code',
  'tests',
  'docs'
];

console.log(`プロジェクト "${projectName}" を作成中...`);

// ディレクトリ作成
directories.forEach(dir => {
  const fullPath = path.join(projectDir, dir);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log(`ディレクトリを作成しました: ${fullPath}`);
});

// プロジェクト設定ファイルの作成
const projectConfig = {
  project_id: projectName,
  name: projectName,
  version: "0.1.0",
  description: "新規AI駆動開発プロジェクト",
  ai_settings: {
    models: {
      requirements: "claude-3-5-sonnet",
      design: "claude-3-7-sonnet",
      code: "claude-3-haiku"
    },
    prompt_templates: {
      requirements_extraction: "../../ai-framework/templates/prompts/requirements/extraction.md",
      requirements_validation: "../../ai-framework/templates/prompts/requirements/validation.md"
    }
  },
  schemas: {
    requirements: "../../ai-framework/schemas/requirements/functional_requirement.json",
    project: "../../ai-framework/schemas/project/project_config.json"
  }
};

// プロジェクト設定ファイルを保存
fs.writeFileSync(
  path.join(projectDir, 'project.json'),
  JSON.stringify(projectConfig, null, 2)
);
console.log(`プロジェクト設定ファイルを作成しました: ${path.join(projectDir, 'project.json')}`);

// READMEファイルの作成
const readmeContent = `# ${projectName}

AI駆動開発手法で実装されるプロジェクト

## 概要

このプロジェクトはAI駆動開発フレームワークを使用して開発されています。

## ディレクトリ構造

- `requirements/`: 要件定義
  - `raw/`: 生の要件情報
  - `structured/`: 構造化された要件
  - `final/`: 最終要件定義書
- `design/`: 設計情報
- `code/`: 実装コード
- `tests/`: テスト
- `docs/`: ドキュメント

## 開始方法

1. 要件の追加: `requirements/raw/` に要件に関する情報を追加
2. 要件の抽出: `node ../../ai-framework/cli/extract-requirements.js`
3. 設計の生成: `node ../../ai-framework/cli/generate-design.js`

`;

fs.writeFileSync(
  path.join(projectDir, 'README.md'),
  readmeContent
);
console.log(`READMEファイルを作成しました: ${path.join(projectDir, 'README.md')}`);

console.log(`プロジェクト "${projectName}" の作成が完了しました`);
console.log(`ディレクトリ: ${projectDir}`);
