# AI駆動開発フレームワーク

このリポジトリは、AI駆動開発のためのフレームワークとサンプルプロジェクトを含んでいます。

## 概要

AI駆動開発フレームワークは、要件定義、設計、コーディング、テスト、ドキュメント作成などの開発プロセス全体をAI技術を活用して効率化・高度化するためのツールとメソドロジーを提供します。

## ディレクトリ構造

```
ai-driven-development/
├── .github/                         # GitHub Actions設定
├── ai-framework/                    # AI駆動開発フレームワーク（メタプロジェクト）
│   ├── schemas/                     # JSONスキーマ定義
│   │   ├── requirements/            # 要件定義のスキーマ
│   │   ├── design/                  # 設計定義のスキーマ
│   │   └── project/                 # プロジェクト情報のスキーマ
│   ├── templates/                   # 再利用可能なテンプレート
│   │   ├── prompts/                 # AIプロンプトテンプレート
│   │   │   ├── requirements/        # 要件抽出・分析用プロンプト
│   │   │   ├── design/              # 設計生成用プロンプト
│   │   │   └── code/                # コード生成用プロンプト
│   │   └── documents/               # ドキュメントテンプレート
│   ├── utils/                       # 汎用ユーティリティ
│   │   ├── schema_validator.js      # スキーマ検証ツール
│   │   ├── json_converter.py        # フォーマット変換ツール
│   │   └── ai_client.js             # AI APIクライアント
│   ├── cli/                         # コマンドラインツール
│   │   ├── init-project.js          # プロジェクト初期化ツール
│   │   └── generate-docs.js         # ドキュメント生成ツール
│   └── core/                        # フレームワークコア機能
│       ├── ai_manager.js            # AI呼び出し管理
│       ├── requirements_handler.js  # 要件処理機能
│       └── code_generator.js        # コード生成機能
├── projects/                        # 実プロジェクト
│   ├── _common/                     # プロジェクト共通設定
│   │   ├── templates/               # プロジェクト固有テンプレート
│   │   └── schemas/                 # プロジェクト固有スキーマ拡張
│   ├── project-a/                   # 具体的なプロジェクトA
│   │   ├── requirements/            # 要件情報
│   │   │   ├── raw/                 # 生の要件情報
│   │   │   ├── structured/          # 構造化された要件
│   │   │   └── final/               # 最終的な要件定義書
│   │   ├── design/                  # 設計情報
│   │   │   ├── architecture/        # アーキテクチャ設計
│   │   │   ├── database/            # データベース設計
│   │   │   └── ui/                  # UI設計
│   │   ├── code/                    # 実装コード
│   │   ├── tests/                   # テスト
│   │   ├── docs/                    # 生成ドキュメント
│   │   └── project.json             # プロジェクト設定
│   └── project-b/                   # 具体的なプロジェクトB（同様の構造）
├── examples/                        # サンプルプロジェクト・デモ
│   ├── simple-api/                  # APIサービスの例
│   └── crm-system/                  # CRMシステムの例
├── docs/                            # フレームワークドキュメント
│   ├── guides/                      # 利用ガイド
│   ├── tutorials/                   # チュートリアル
│   └── api/                         # API参照
├── scripts/                         # ユーティリティスクリプト
├── package.json                     # 依存関係
└── README.md                        # プロジェクト概要
```

## 始め方

1. 依存パッケージのインストール: `npm install`
2. プロジェクトの初期化: `node ai-framework/cli/init-project.js <project-name>`

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
