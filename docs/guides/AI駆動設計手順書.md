# AI駆動設計手順書

## 目次

1. [AI駆動設計の基本概念](#1-ai駆動設計の基本概念)
2. [設計フェーズ実践ガイド](#2-設計フェーズ実践ガイド)
   - [概要](#21-概要)
   - [手順とポイント](#22-手順とポイント)
   - [準備すべきドキュメントと項目](#23-準備すべきドキュメントと項目)
     - [アーキテクチャ設計書（アーキテクチャ設計図）](#231-アーキテクチャ設計書アーキテクチャ設計図)
     - [標準インターフェース仕様書](#232-標準インターフェース仕様書)
     - [データベース設計書（ER図・テーブル定義書）](#233-データベース設計書er図テーブル定義書)
     - [クラス責任定義書（クラス図・責務定義書）](#234-クラス責任定義書クラス図責務定義書)
     - [画面遷移図・UI設計書](#235-画面遷移図ui設計書)
     - [セキュリティ設計書](#236-セキュリティ設計書)
     - [障害設計・リカバリー設計書](#237-障害設計リカバリー設計書)
     - [インフラ構成図](#238-インフラ構成図)
3. [付録：ツール活用ガイド](#3-付録ツール活用ガイド)

---

## 1. AI駆動設計の基本概念

AI駆動設計とは、要件定義フェーズから引き継いだ構造化された要件情報を基に、大規模言語モデル（LLM）などのAI技術を活用して、システムの具体的な設計を効率的かつ高品質に行うアプローチです。設計書やダイアグラムの生成、設計の一貫性検証、最適化提案などをAIが支援します。

### 1.1 従来の設計手法との違い

| 観点 | 従来の設計 | AI駆動設計 |
|------|------------|------------|
| 設計プロセス | 人間による手動での設計作成・検証 | AIによる設計案生成と人間によるレビュー・調整 |
| 形式 | 非構造化テキスト・図表が中心 | 構造化データ（JSON等）と視覚化の組み合わせ |
| 一貫性 | 経験や確認作業に依存 | AIによる自動整合性チェック・矛盾検出 |
| トレーサビリティ | 手動でのマッピング・管理 | 要件-設計-実装の自動トレース |
| 更新効率 | 変更時の影響範囲特定が困難 | 関連コンポーネントの自動検出・更新支援 |

### 1.2 AI駆動設計の基本原則

1. **一貫性優先の原則**：すべての設計成果物間で一貫した用語・構造・命名規則を維持
2. **設計の構造化原則**：設計情報をJSON等の構造化形式で定義し、機械的処理を容易に
3. **トレーサビリティ確保の原則**：要件から設計、実装までの追跡可能性を維持
4. **変更影響最小化の原則**：設計変更時の影響範囲を明確に特定・制限
5. **検証自動化の原則**：設計の整合性・品質を自動的に検証
6. **段階的詳細化の原則**：概念設計から詳細設計へ段階的に詳細度を高める
7. **人間主導の原則**：AIは支援ツールとして活用し、最終判断は人間が実施

### 1.3 AI駆動設計のメリット

- 設計の一貫性と品質の向上（誤り・矛盾・漏れの削減）
- 複雑なシステムでも一貫した設計原則の適用が容易
- 設計作業の効率化（約30-50%の工数削減）
- 変更への対応力強化（影響範囲の自動特定）
- 設計ナレッジの組織的蓄積と再利用
- 設計と実装のギャップ削減

### 1.4 主な活用ツール

- **Cursor**: AI対話型コードエディタ。設計情報からコード生成、ダイアグラム自動生成
- **Cline**: Claude言語モデルをベースとしたエージェント型AIアシスタント
- **Windsurf**: 深いコードベース理解が可能なエージェンティックIDE
- **JSON Schema バリデータ**: 設計ドキュメントの構造検証
- **Mermaid**: テキストベースでダイアグラムを生成・管理するツール

---

## 2. 設計フェーズ実践ガイド

### 2.1 概要

AI駆動の設計フェーズでは、要件定義フェーズで構造化された要件情報を入力として、システムの詳細設計を効率的かつ高品質に行います。このアプローチでは、設計情報を機械可読な形式（主にJSON）で管理し、AIの支援を受けながら一貫性のある設計を段階的に詳細化していきます。設計はアーキテクチャレベルから始まり、データモデル、インターフェース、UI/UX、セキュリティ、インフラまで包括的に行います。

AI駆動設計の主な特徴は、以下の点にあります：

1. **設計情報の構造化**：すべての設計情報をJSON等の構造化された形式で定義
2. **一貫性の自動検証**：AIによる設計全体の整合性チェック
3. **トレーサビリティの確保**：要件と設計の明確な紐付け
4. **設計の自動生成支援**：AIによる初期設計案や代替案の生成
5. **視覚化と文書の自動生成**：構造化データからの図表・ドキュメント自動生成

### 2.2 手順とポイント

#### 2.2.1 設計フェーズの全体フロー

1. **準備フェーズ**
   - 要件定義からの引き継ぎ情報の整理
   - 設計原則・制約条件の明確化
   - 設計テンプレート・スキーマの準備

2. **アーキテクチャ設計フェーズ**
   - システム全体構造の検討・決定
   - コンポーネント分割と責任割り当て
   - 技術スタック選定

3. **システム設計フェーズ**
   - データモデル設計
   - インターフェース設計
   - クラス・モジュール設計
   - UI・UX設計

4. **非機能設計フェーズ**
   - セキュリティ設計
   - パフォーマンス設計
   - 可用性・障害対応設計
   - インフラストラクチャ設計

5. **検証・最適化フェーズ**
   - 設計整合性の検証
   - 設計レビュー
   - 最適化・改善

6. **設計承認・移行フェーズ**
   - 設計文書の最終化
   - 設計のベースライン化
   - 実装チームへの引き継ぎ

#### 2.2.2 AIを活用した設計プロセス

1. **AIによる初期設計案生成**

```json
{
  "jsonrpc": "2.0",
  "method": "generate_architecture_design",
  "params": {
    "project_name": "顧客管理システム刷新",
    "requirements_file": "requirements/structured/functional_requirements.json",
    "non_functional_requirements_file": "requirements/structured/non_functional_requirements.json",
    "constraints": ["マイクロサービスアーキテクチャ", "AWS環境", "コンテナ化必須"],
    "output_format": "detailed_json"
  },
  "id": "design-2025-03-10-001"
}
```

レスポンス例（一部）:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "architecture_id": "ARCH-001",
    "title": "顧客管理システム - マイクロサービスアーキテクチャ",
    "overview": "AWSを活用したコンテナベースのマイクロサービスアーキテクチャ",
    "components": [
      {
        "id": "COMP-001",
        "name": "顧客プロファイルサービス",
        "responsibility": "顧客の基本情報管理",
        "apis": ["GET /customers", "POST /customers", "GET /customers/{id}"],
        "data_owned": ["customers", "addresses"],
        "dependencies": []
      },
      {
        "id": "COMP-002",
        "name": "認証・認可サービス",
        "responsibility": "ユーザー認証と権限管理",
        "apis": ["POST /auth/login", "POST /auth/refresh", "GET /auth/permissions"],
        "data_owned": ["users", "roles", "permissions"],
        "dependencies": []
      }
    ],
    "technology_stack": {
      "frontend": {
        "framework": "React",
        "state_management": "Redux",
        "ui_library": "Material UI"
      },
      "backend": {
        "languages": ["Java"],
        "frameworks": ["Spring Boot"],
        "communication": "REST, gRPC"
      },
      "data": {
        "primary_database": "PostgreSQL",
        "cache": "Redis",
        "search": "Elasticsearch"
      },
      "infrastructure": {
        "compute": "AWS ECS",
        "networking": "AWS VPC",
        "storage": "AWS S3, RDS"
      }
    }
  },
  "id": "design-2025-03-10-001"
}
```

2. **AIによる設計詳細化プロンプト例**

```
以下のアーキテクチャコンポーネントをマイクロサービスとして詳細設計してください：

コンポーネントID: COMP-001
名前: 顧客プロファイルサービス
責任: 顧客の基本情報管理

詳細化すべき観点：
- 内部サブコンポーネント
- APIエンドポイント詳細仕様
- データモデル
- 外部依存サービス
- スケーラビリティ設計
- 障害対応戦略

出力はJSON形式でお願いします。
```

3. **設計の整合性検証**

```
次の2つの設計ドキュメントを比較し、整合性の問題を検出してください：

1. データモデル設計: designs/structured/data_model.json
2. APIインターフェース設計: designs/structured/api_interface.json

特に以下の観点で検証してください：
- APIで使われているデータ構造がデータモデルで定義されているか
- 命名の一貫性
- データ型の整合性
- CRUD操作の網羅性

問題点を検出した場合は、具体的な修正案も提示してください。
```

#### 2.2.3 設計分析と構造化のプロセス

1. **設計の分類体系**
   - アーキテクチャ視点（サービス構成、コンポーネント構成）
   - 技術視点（フロントエンド、バックエンド、データ、インフラ）
   - 品質視点（性能、セキュリティ、可用性）
   - 組織視点（開発チーム割り当て、責任分担）

2. **構造化手法**
   - コンポーネント分解（CBD: Component-Based Design）
   - ドメイン駆動設計（DDD）のコンテキスト境界定義
   - 4+1ビューモデル（論理ビュー、プロセスビュー、物理ビュー、開発ビュー、シナリオ）

3. **AIを活用した構造化例（Windsurfでの実装）**

```
# Windsurfでの指示例

次の要件ドキュメントを分析し、ドメイン駆動設計のコンテキスト境界を特定してください：
requirements/structured/functional_requirements.json

1. 集約ルート候補となるエンティティを特定
2. コンテキスト境界を定義し、各境界の責任範囲を明確化
3. 境界間の関係（Partnership、Shared Kernel、Customer-Supplier等）を特定
4. ユビキタス言語の主要用語を抽出

出力は次のJSONスキーマに従ってください：
designs/schemas/ddd_context_schema.json
```

#### 2.2.4 AIによる設計詳細化と技術要件への変換

1. **概念設計から詳細設計への展開プロンプト例**

```
以下のコンポーネント概念設計を、詳細な技術設計に展開してください：

コンポーネント: "認証・認可サービス"
概念設計：{
  "responsibility": "ユーザー認証と権限管理",
  "capabilities": ["ログイン処理", "トークン発行", "権限チェック"]
}

詳細化すべき観点：
- 認証方式（JWT、OAuth、OIDC等）の具体的実装
- トークン構造と有効期限管理
- リフレッシュトークンの扱い
- パスワードポリシーと保存方法
- 多要素認証の実装
- 権限モデル（RBAC/ABAC）
- API保護メカニズム
- データベーススキーマ
```

2. **技術設計変換の出力例**

```json
{
  "component_id": "COMP-002",
  "name": "認証・認可サービス",
  "detailed_design": {
    "authentication": {
      "method": "JWT + OAuth2.0",
      "token_structure": {
        "header": {
          "alg": "RS256",
          "typ": "JWT"
        },
        "payload": {
          "required_claims": ["sub", "iss", "exp", "iat", "jti"],
          "custom_claims": ["roles", "permissions", "tenant_id"]
        }
      },
      "token_lifecycle": {
        "access_token_ttl": "15分",
        "refresh_token_ttl": "7日",
        "renewal_strategy": "Sliding expiration with absolute timeout"
      },
      "password_policy": {
        "min_length": 12,
        "complexity_rules": ["uppercase", "lowercase", "digits", "special_chars"],
        "history_check": "過去5回分のパスワードと異なること",
        "storage": "PBKDF2 with 310,000 iterations + salt"
      },
      "mfa": {
        "supported_methods": ["TOTP", "Email OTP"],
        "implementation": "Separate MFA service with own DB"
      }
    },
    "authorization": {
      "model": "Hybrid RBAC/ABAC",
      "roles": [
        {
          "name": "admin",
          "description": "システム管理者",
          "permissions": ["user:create", "user:read", "user:update", "user:delete"]
        },
        {
          "name": "sales",
          "description": "営業担当者",
          "permissions": ["customer:create", "customer:read", "customer:update"]
        }
      ],
      "attribute_based_rules": [
        {
          "description": "担当顧客のみ更新可能",
          "condition": "customer.assigned_sales_id == current_user.id",
          "permissions_affected": ["customer:update"]
        }
      ]
    },
    "api_security": {
      "authentication_middleware": "独自実装のJWTバリデーションフィルター",
      "rate_limiting": {
        "global_rate": "1000 requests per minute",
        "per_user_rate": "60 requests per minute"
      },
      "input_validation": "OpenAPI仕様に基づく自動バリデーション"
    },
    "database_schema": {
      "tables": [
        {
          "name": "users",
          "columns": [
            {"name": "id", "type": "UUID", "constraints": "PRIMARY KEY"},
            {"name": "username", "type": "VARCHAR(50)", "constraints": "UNIQUE NOT NULL"},
            {"name": "password_hash", "type": "VARCHAR(255)", "constraints": "NOT NULL"},
            {"name": "email", "type": "VARCHAR(255)", "constraints": "UNIQUE NOT NULL"},
            {"name": "mfa_enabled", "type": "BOOLEAN", "constraints": "NOT NULL DEFAULT FALSE"},
            {"name": "last_login", "type": "TIMESTAMP", "constraints": ""}
          ]
        },
        {
          "name": "roles",
          "columns": [
            {"name": "id", "type": "UUID", "constraints": "PRIMARY KEY"},
            {"name": "name", "type": "VARCHAR(50)", "constraints": "UNIQUE NOT NULL"},
            {"name": "description", "type": "VARCHAR(255)", "constraints": ""}
          ]
        },
        {
          "name": "user_roles",
          "columns": [
            {"name": "user_id", "type": "UUID", "constraints": "FOREIGN KEY REFERENCES users(id)"},
            {"name": "role_id", "type": "UUID", "constraints": "FOREIGN KEY REFERENCES roles(id)"},
            {"constraints": "PRIMARY KEY (user_id, role_id)"}
          ]
        }
      ]
    }
  },
  "implementation_guidelines": {
    "recommended_libraries": {
      "java": ["Spring Security", "JJWT", "Passay"],
      "node": ["Passport.js", "jsonwebtoken", "express-rate-limit"]
    },
    "security_considerations": [
      "トークン漏洩対策としてのIPバインディング検討",
      "ブルートフォース攻撃対策としてのアカウントロック機構",
      "監査ログの実装と不正検知"
    ]
  }
}
```

#### 2.2.5 継続的な設計更新と管理方法

1. **設計バージョン管理**
   - 設計ファイルのGit管理
   - 変更履歴の自動ドキュメント化
   - 設計ベースラインの明示的な管理

2. **変更影響度分析**
   - AIによる変更の影響範囲予測
   - 関連コンポーネントの自動特定
   - 設計整合性の検証

3. **Cursorを活用した設計更新ワークフロー**

```markdown
# Cursorチャットでの指示例

以下の設計変更要件に基づいて、関連するすべての設計ドキュメントを更新してください：

変更要件：「顧客プロファイルに契約履歴表示機能を追加する」

1. まず影響範囲を分析し、更新が必要なドキュメントとコンポーネントを特定
2. 各ドキュメントの更新案を生成
3. 更新によるトレーサビリティへの影響を確認
4. 設計の整合性を検証

プロジェクトルート: /project/customer-management-system/
設計ドキュメント: /project/customer-management-system/designs/
```

出力例：
```
# 影響範囲分析

変更要件「顧客プロファイルに契約履歴表示機能を追加する」の影響範囲を分析しました。

## 影響を受けるコンポーネント

1. 顧客プロファイルサービス (COMP-001)
   - APIエンドポイント追加: GET /customers/{id}/contracts
   - データモデル拡張: 契約参照情報の追加

2. 契約管理サービス (COMP-003)
   - 新規API公開: GET /contracts/by-customer/{id}

3. フロントエンド - 顧客詳細画面
   - UI変更: 契約履歴表示セクション追加

## 更新が必要な設計ドキュメント

1. アーキテクチャ設計書
   - コンポーネント間の新しい依存関係を追加

2. API仕様書
   - 新規APIエンドポイントの追加
   - データ構造の更新

3. データモデル設計書
   - 顧客-契約間のリレーション追加

4. UI設計書
   - 顧客詳細画面の更新

...
```

### 2.3 準備すべきドキュメントと項目

設計フェーズでは、システムの様々な側面を詳細に定義するために、複数の設計ドキュメントを準備します。AI駆動アプローチでは、これらのドキュメントはJSON形式で構造化され、相互の一貫性が保たれるよう管理されます。また、人間が理解しやすい視覚的表現（ダイアグラムなど）も自動生成します。

各設計ドキュメントの目的と特徴を以下に説明します。
