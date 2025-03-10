#### 2.3.2 標準インターフェース仕様書

標準インターフェース仕様書は、システムコンポーネント間の通信方法や外部システムとの連携方法を定義するドキュメントです。AI駆動開発においては、これらのインターフェース定義を構造化された形式（主にJSON）で管理し、一貫性と再利用性を高めます。

##### 2.3.2.1 JSON形式の標準インターフェース仕様書テンプレート

```json
{
  "$schema": "https://example.com/schemas/interface-specification-v1.json",
  "document_info": {
    "id": "IF-001",
    "title": "標準インターフェース仕様書",
    "project_name": "顧客管理システム刷新",
    "version": "1.0.0",
    "last_updated": "2025-03-15T09:00:00Z",
    "status": "approved",
    "authors": ["インターフェース設計チーム", "AI Assistant"],
    "document_type": "interface_specification",
    "dependencies": [
      {
        "document_id": "ARCH-001",
        "relationship": "implements"
      },
      {
        "document_id": "SEC-001",
        "relationship": "references"
      }
    ],
    "confidentiality": "internal_only"
  },
  "document_history": [
    {
      "version": "0.1.0",
      "date": "2025-03-10T09:00:00Z",
      "description": "初稿作成",
      "authors": ["AI Assistant"]
    },
    {
      "version": "1.0.0",
      "date": "2025-03-15T09:00:00Z",
      "description": "正式版リリース",
      "authors": ["インターフェース設計チーム", "AI Assistant"]
    }
  ],
  "interface_standards": {
    "rest_apis": {
      "naming_conventions": {
        "url_pattern": "/api/v{version}/{resource}[/{id}]",
        "http_methods": {
          "GET": "リソースの取得",
          "POST": "リソースの作成",
          "PUT": "リソースの完全更新",
          "PATCH": "リソースの部分更新",
          "DELETE": "リソースの削除"
        }
      },
      "versioning_strategy": {
        "method": "URL Path",
        "format": "v{major}[.{minor}]",
        "compatibility_policy": "マイナーバージョンは後方互換性あり、メジャーバージョンは互換性なし"
      },
      "authentication": {
        "method": "JWT Bearer Token",
        "header": "Authorization: Bearer {token}"
      },
      "response_format": {
        "success": {
          "status_codes": [200, 201, 204],
          "body_structure": {
            "data": "レスポンスデータ（オブジェクトまたは配列）",
            "meta": "ページネーション情報等のメタデータ"
          }
        },
        "error": {
          "status_codes": [400, 401, 403, 404, 409, 422, 500],
          "body_structure": {
            "error": {
              "code": "エラーコード（例：INVALID_INPUT）",
              "message": "人間可読なエラーメッセージ",
              "details": "エラーの詳細情報（オプション）"
            }
          }
        }
      },
      "pagination": {
        "query_parameters": {
          "page": "ページ番号（1始まり）",
          "per_page": "1ページあたりの件数（デフォルト20）"
        },
        "response_metadata": {
          "total": "総件数",
          "total_pages": "総ページ数",
          "current_page": "現在のページ番号",
          "per_page": "1ページあたりの件数"
        }
      },
      "content_types": {
        "request": "application/json",
        "response": "application/json"
      }
    },
    "grpc_services": {
      "naming_conventions": {
        "service": "Pascal形式（例：CustomerService）",
        "method": "Pascal形式（例：GetCustomer）",
        "message": "Pascal形式（例：CustomerRequest）"
      },
      "versioning_strategy": {
        "method": "パッケージ名",
        "format": "{service}.v{major}",
        "compatibility_policy": "フィールド追加時は既存フィールド番号を維持"
      },
      "authentication": {
        "method": "gRPC Metadata",
        "key": "authorization",
        "value": "Bearer {token}"
      }
    },
    "event_messages": {
      "naming_conventions": {
        "event_name": "{Entity}{Action}Event",
        "format": "pascal形式（例：CustomerCreatedEvent）"
      },
      "message_structure": {
        "header": {
          "event_id": "UUID形式のイベントID",
          "event_type": "イベント種別名",
          "event_time": "ISO-8601形式のタイムスタンプ",
          "source": "イベント発生源",
          "trace_id": "分散トレーシングID（オプション）"
        },
        "body": {
          "変更データ": "イベントの種類に応じたデータペイロード"
        }
      },
      "delivery_guarantees": {
        "method": "at-least-once",
        "idempotency": "event_idによる重複排除"
      }
    }
  },
  "api_definitions": [
    {
      "api_id": "API-001",
      "name": "顧客プロファイルAPI",
      "description": "顧客の基本情報を管理するためのAPI",
      "version": "1.0",
      "protocol": "REST",
      "base_path": "/api/v1/customers",
      "endpoints": [
        {
          "path": "/",
          "method": "GET",
          "description": "顧客一覧の取得",
          "query_parameters": [
            {
              "name": "name",
              "type": "string",
              "required": false,
              "description": "顧客名による部分一致検索"
            },
            {
              "name": "status",
              "type": "string",
              "required": false,
              "description": "顧客ステータスによるフィルタリング",
              "enum": ["active", "inactive", "prospect"]
            }
          ],
          "response": {
            "success": {
              "status_code": 200,
              "content_type": "application/json",
              "schema_ref": "#/components/schemas/CustomerList"
            },
            "error": {
              "status_codes": [400, 401, 403, 500]
            }
          }
        },
        {
          "path": "/{id}",
          "method": "GET",
          "description": "指定IDの顧客情報取得",
          "path_parameters": [
            {
              "name": "id",
              "type": "string",
              "required": true,
              "description": "顧客ID"
            }
          ],
          "response": {
            "success": {
              "status_code": 200,
              "content_type": "application/json",
              "schema_ref": "#/components/schemas/Customer"
            },
            "error": {
              "status_codes": [400, 401, 403, 404, 500]
            }
          }
        },
        {
          "path": "/",
          "method": "POST",
          "description": "新規顧客の登録",
          "request_body": {
            "content_type": "application/json",
            "schema_ref": "#/components/schemas/CustomerCreate"
          },
          "response": {
            "success": {
              "status_code": 201,
              "content_type": "application/json",
              "schema_ref": "#/components/schemas/Customer"
            },
            "error": {
              "status_codes": [400, 401, 403, 422, 500]
            }
          }
        }
      ]
    }
  ],
  "event_definitions": [
    {
      "event_id": "EVT-001",
      "name": "CustomerCreatedEvent",
      "description": "顧客が新規作成された際に発行されるイベント",
      "version": "1.0",
      "producers": ["顧客プロファイルサービス"],
      "consumers": ["通知サービス", "分析サービス"],
      "schema": {
        "header": {
          "event_id": "UUID形式",
          "event_type": "CustomerCreatedEvent",
          "event_time": "ISO-8601形式（例：2025-03-15T10:30:00.000Z）",
          "source": "customer-profile-service"
        },
        "body": {
          "customer_id": "UUID形式",
          "name": "顧客名",
          "email": "メールアドレス",
          "status": "顧客ステータス（例：active）",
          "created_at": "作成日時（ISO-8601形式）"
        }
      },
      "delivery_channel": {
        "type": "Kafka",
        "topic": "customer-events"
      }
    }
  ],
  "data_schemas": {
    "components": {
      "schemas": {
        "Customer": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "description": "顧客ID"
            },
            "name": {
              "type": "string",
              "maxLength": 100,
              "description": "顧客名"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "メールアドレス"
            },
            "phone": {
              "type": "string",
              "pattern": "^\\+[0-9]{1,3}-[0-9]{1,14}$",
              "description": "電話番号（国際形式）"
            },
            "status": {
              "type": "string",
              "enum": ["active", "inactive", "prospect"],
              "description": "顧客ステータス"
            },
            "created_at": {
              "type": "string",
              "format": "date-time",
              "description": "作成日時"
            },
            "updated_at": {
              "type": "string",
              "format": "date-time",
              "description": "更新日時"
            }
          },
          "required": ["id", "name", "email", "status", "created_at", "updated_at"]
        },
        "CustomerCreate": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "maxLength": 100,
              "description": "顧客名"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "メールアドレス"
            },
            "phone": {
              "type": "string",
              "pattern": "^\\+[0-9]{1,3}-[0-9]{1,14}$",
              "description": "電話番号（国際形式）"
            },
            "status": {
              "type": "string",
              "enum": ["active", "inactive", "prospect"],
              "default": "prospect",
              "description": "顧客ステータス"
            }
          },
          "required": ["name", "email"]
        },
        "CustomerList": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Customer"
              }
            },
            "meta": {
              "type": "object",
              "properties": {
                "total": {
                  "type": "integer",
                  "description": "総件数"
                },
                "total_pages": {
                  "type": "integer",
                  "description": "総ページ数"
                },
                "current_page": {
                  "type": "integer",
                  "description": "現在のページ番号"
                },
                "per_page": {
                  "type": "integer",
                  "description": "1ページあたりの件数"
                }
              }
            }
          }
        }
      }
    }
  },
  "security_policies": {
    "authentication_requirements": {
      "all_endpoints": true,
      "exceptions": [
        {
          "api_id": "API-001",
          "path": "/health",
          "method": "GET",
          "rationale": "ヘルスチェックエンドポイントは認証不要"
        }
      ]
    },
    "authorization_requirements": {
      "role_permissions": [
        {
          "role": "admin",
          "permissions": ["api:all"]
        },
        {
          "role": "customer_read",
          "permissions": ["customer:read"]
        },
        {
          "role": "customer_write",
          "permissions": ["customer:read", "customer:write"]
        }
      ]
    },
    "rate_limiting": {
      "default": {
        "requests_per_minute": 60,
        "burst": 10
      },
      "special_cases": [
        {
          "api_id": "API-001",
          "path": "/bulk",
          "method": "POST",
          "requests_per_minute": 10,
          "burst": 2,
          "rationale": "リソース集中的な一括処理のため制限強化"
        }
      ]
    }
  },
  "compatibility_requirements": {
    "backward_compatibility": {
      "maintain_period": "12ヶ月",
      "api_deprecation_process": {
        "notification_period": "3ヶ月前",
        "deprecation_header": "X-API-Deprecated: true",
        "sunset_header": "X-API-Sunset: YYYY-MM-DD"
      }
    },
    "evolution_guidelines": [
      "既存のフィールドの削除禁止（代わりにdeprecatedとマーク）",
      "既存の必須フィールドのオプション化禁止",
      "オプションフィールドの必須化禁止",
      "フィールド型の変更禁止（拡張のみ許可）"
    ]
  }
}
```

##### 2.3.2.2 OpenAPI/Swagger形式でのAPI定義例

RESTful APIを定義する場合、業界標準のOpenAPI（Swagger）仕様を活用することで、ドキュメント、モックサーバー、クライアントコード生成などの自動化が可能になります。以下はOpenAPI 3.0形式でのAPI定義例です。

```yaml
openapi: 3.0.0
info:
  title: 顧客管理API
  description: 顧客の基本情報を管理するためのRESTful API
  version: 1.0.0
  contact:
    name: API開発チーム
    email: api-team@example.com
servers:
  - url: https://api.example.com/v1
    description: 本番環境
  - url: https://staging-api.example.com/v1
    description: ステージング環境
paths:
  /customers:
    get:
      summary: 顧客一覧の取得
      description: 条件に合致する顧客の一覧を取得します
      operationId: getCustomers
      parameters:
        - name: name
          in: query
          description: 顧客名による部分一致検索
          schema:
            type: string
        - name: status
          in: query
          description: 顧客ステータスによるフィルタリング
          schema:
            type: string
            enum: [active, inactive, prospect]
        - name: page
          in: query
          description: ページ番号（1始まり）
          schema:
            type: integer
            default: 1
            minimum: 1
        - name: per_page
          in: query
          description: 1ページあたりの件数
          schema:
            type: integer
            default: 20
            minimum: 1
            maximum: 100
      responses:
        '200':
          description: 正常レスポンス
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CustomerList'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - bearerAuth: []
    post:
      summary: 新規顧客の登録
      description: 新しい顧客情報を登録します
      operationId: createCustomer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CustomerCreate'
      responses:
        '201':
          description: 顧客登録成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Customer'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '422':
          $ref: '#/components/responses/UnprocessableEntity'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - bearerAuth: []
  /customers/{id}:
    get:
      summary: 指定IDの顧客情報取得
      description: 指定されたIDの顧客の詳細情報を取得します
      operationId: getCustomerById
      parameters:
        - name: id
          in: path
          required: true
          description: 顧客ID
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: 正常レスポンス
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Customer'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - bearerAuth: []
components:
  schemas:
    Customer:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: 顧客ID
        name:
          type: string
          maxLength: 100
          description: 顧客名
        email:
          type: string
          format: email
          description: メールアドレス
        phone:
          type: string
          pattern: ^\+[0-9]{1,3}-[0-9]{1,14}$
          description: 電話番号（国際形式）
        status:
          type: string
          enum: [active, inactive, prospect]
          description: 顧客ステータス
        created_at:
          type: string
          format: date-time
          description: 作成日時
        updated_at:
          type: string
          format: date-time
          description: 更新日時
      required:
        - id
        - name
        - email
        - status
        - created_at
        - updated_at
    CustomerCreate:
      type: object
      properties:
        name:
          type: string
          maxLength: 100
          description: 顧客名
        email:
          type: string
          format: email
          description: メールアドレス
        phone:
          type: string
          pattern: ^\+[0-9]{1,3}-[0-9]{1,14}$
          description: 電話番号（国際形式）
        status:
          type: string
          enum: [active, inactive, prospect]
          default: prospect
          description: 顧客ステータス
      required:
        - name
        - email
    CustomerList:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Customer'
        meta:
          type: object
          properties:
            total:
              type: integer
              description: 総件数
            total_pages:
              type: integer
              description: 総ページ数
            current_page:
              type: integer
              description: 現在のページ番号
            per_page:
              type: integer
              description: 1ページあたりの件数
    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
              description: エラーコード
            message:
              type: string
              description: 人間可読なエラーメッセージ
            details:
              type: object
              description: エラーの詳細情報
  responses:
    BadRequest:
      description: 不正なリクエスト
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: INVALID_PARAMETER
              message: 不正なパラメータが指定されました
              details:
                invalid_params:
                  - name: email
                    reason: 有効なメールアドレス形式ではありません
    Unauthorized:
      description: 認証エラー
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: UNAUTHORIZED
              message: 認証情報が不正または期限切れです
    Forbidden:
      description: アクセス権限エラー
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: FORBIDDEN
              message: このリソースにアクセスする権限がありません
    NotFound:
      description: リソースが見つかりません
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: RESOURCE_NOT_FOUND
              message: 指定されたリソースが見つかりません
    UnprocessableEntity:
      description: バリデーションエラー
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: VALIDATION_ERROR
              message: 入力値が不正です
              details:
                validation_errors:
                  - field: name
                    message: 必須項目です
    InternalServerError:
      description: サーバーエラー
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: INTERNAL_ERROR
              message: サーバー内部でエラーが発生しました
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

##### 2.3.2.3 gRPC/Protocol Buffersによるインターフェース定義例

マイクロサービス間の高性能な通信には、gRPCとProtocol Buffersが適しています。Protocol Buffersはインターフェースを定義するIDL（Interface Definition Language）で、これを元にクライアントとサーバーのコードを自動生成できます。

```protobuf
syntax = "proto3";

package customer.v1;

import "google/protobuf/timestamp.proto";
import "google/protobuf/empty.proto";

// 顧客管理サービス
service CustomerService {
  // 顧客一覧の取得
  rpc ListCustomers(ListCustomersRequest) returns (ListCustomersResponse);
  
  // 顧客詳細の取得
  rpc GetCustomer(GetCustomerRequest) returns (Customer);
  
  // 顧客の作成
  rpc CreateCustomer(CreateCustomerRequest) returns (Customer);
  
  // 顧客情報の更新
  rpc UpdateCustomer(UpdateCustomerRequest) returns (Customer);
  
  // 顧客の削除
  rpc DeleteCustomer(DeleteCustomerRequest) returns (google.protobuf.Empty);
}

// 顧客情報
message Customer {
  // 顧客ID
  string id = 1;
  
  // 顧客名
  string name = 2;
  
  // メールアドレス
  string email = 3;
  
  // 電話番号（国際形式）
  string phone = 4;
  
  // 顧客ステータス
  CustomerStatus status = 5;
  
  // 作成日時
  google.protobuf.Timestamp created_at = 6;
  
  // 更新日時
  google.protobuf.Timestamp updated_at = 7;
}

// 顧客ステータス
enum CustomerStatus {
  // 未指定
  CUSTOMER_STATUS_UNSPECIFIED = 0;
  
  // アクティブ
  CUSTOMER_STATUS_ACTIVE = 1;
  
  // 非アクティブ
  CUSTOMER_STATUS_INACTIVE = 2;
  
  // 見込み客
  CUSTOMER_STATUS_PROSPECT = 3;
}

// 顧客一覧取得リクエスト
message ListCustomersRequest {
  // ページサイズ
  int32 page_size = 1;
  
  // ページトークン
  string page_token = 2;
  
  // 顧客名フィルター（部分一致）
  string name_filter = 3;
  
  // ステータスフィルター
  CustomerStatus status_filter = 4;
}

// 顧客一覧取得レスポンス
message ListCustomersResponse {
  // 顧客一覧
  repeated Customer customers = 1;
  
  // 次ページのトークン（最終ページの場合は空文字）
  string next_page_token = 2;
  
  // 総件数
  int32 total_count = 3;
}

// 顧客詳細取得リクエスト
message GetCustomerRequest {
  // 顧客ID
  string id = 1;
}

// 顧客作成リクエスト
message CreateCustomerRequest {
  // 顧客名
  string name = 1;
  
  // メールアドレス
  string email = 2;
  
  // 電話番号（国際形式）
  string phone = 3;
  
  // 顧客ステータス
  CustomerStatus status = 4;
}

// 顧客更新リクエスト
message UpdateCustomerRequest {
  // 顧客ID
  string id = 1;
  
  // 顧客名
  string name = 2;
  
  // メールアドレス
  string email = 3;
  
  // 電話番号（国際形式）
  string phone = 4;
  
  // 顧客ステータス
  CustomerStatus status = 5;
}

// 顧客削除リクエスト
message DeleteCustomerRequest {
  // 顧客ID
  string id = 1;
}
```

##### 2.3.2.4 イベント駆動型インターフェースの定義例

非同期通信を行うイベント駆動アーキテクチャでは、イベントのスキーマや契約を明確に定義することが重要です。以下はJSONスキーマを用いたイベント定義の例です。

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://example.com/schemas/customer-created-event.json",
  "title": "CustomerCreatedEvent",
  "description": "顧客が新規作成されたときに発行されるイベント",
  "type": "object",
  "required": ["header", "body"],
  "properties": {
    "header": {
      "type": "object",
      "required": ["event_id", "event_type", "event_time", "source"],
      "properties": {
        "event_id": {
          "type": "string",
          "format": "uuid",
          "description": "イベントの一意識別子"
        },
        "event_type": {
          "type": "string",
          "const": "CustomerCreatedEvent",
          "description": "イベントタイプ"
        },
        "event_time": {
          "type": "string",
          "format": "date-time",
          "description": "イベント発生時刻（ISO-8601形式）"
        },
        "source": {
          "type": "string",
          "const": "customer-profile-service",
          "description": "イベント発生源"
        },
        "trace_id": {
          "type": "string",
          "description": "分散トレーシングID（オプション）"
        }
      }
    },
    "body": {
      "type": "object",
      "required": ["customer_id", "name", "email", "status", "created_at"],
      "properties": {
        "customer_id": {
          "type": "string",
          "format": "uuid",
          "description": "作成された顧客のID"
        },
        "name": {
          "type": "string",
          "maxLength": 100,
          "description": "顧客名"
        },
        "email": {
          "type": "string",
          "format": "email",
          "description": "メールアドレス"
        },
        "status": {
          "type": "string",
          "enum": ["active", "inactive", "prospect"],
          "description": "顧客ステータス"
        },
        "created_at": {
          "type": "string",
          "format": "date-time",
          "description": "顧客作成日時（ISO-8601形式）"
        }
      }
    }
  }
}
```

##### 2.3.2.5 AIを活用したインターフェース設計と検証

AIは、インターフェース設計の生成、検証、整合性チェックなど様々な場面で活用できます。以下に実践的なプロンプト例を示します。

1. **インターフェース設計の自動生成**

```markdown
# Cursorチャットでの指示例

以下の要件に基づいて、商品管理APIのOpenAPI仕様（3.0）を設計してください：

要件：
- 商品の登録、取得、更新、削除が可能なRESTful API
- 商品は名前、説明、価格、在庫数、カテゴリ、画像URL、ステータス（公開/非公開）を持つ
- 商品検索はカテゴリ、ステータス、価格範囲でフィルタリング可能
- ページネーション対応
- JWT認証必須
- レスポンスはJSONで、エラー応答も標準化
- 商品登録時にはデータバリデーションを厳格に行う

出力は完全なYAML形式でお願いします。
```

2. **インターフェース間の整合性検証**

```markdown
# Windsurfでの指示例

以下のインターフェース定義を比較し、整合性の問題を特定してください：

1. 顧客管理サービスのOpenAPI仕様：api-specs/customer-service.yaml
2. 注文管理サービスのOpenAPI仕様：api-specs/order-service.yaml

特に以下の観点で検証してください：
- 共通のデータモデル（顧客情報など）の定義に不一致がないか
- API間で使用する識別子の型や形式に不一致がないか
- エラーレスポンスの形式に不一致がないか
- 命名規則（キャメルケース/スネークケースなど）に不一致がないか

問題点を発見した場合は、具体的な修正案も提示してください。
```

3. **イベントスキーマの生成**

```markdown
# Clineでの指示例

以下のユースケースに基づいて、注文処理に関連するイベントスキーマを生成してください：

ユースケース：
1. ユーザーが商品を注文すると「OrderCreatedEvent」が発行される
2. 支払いが完了すると「OrderPaidEvent」が発行される
3. 注文が発送されると「OrderShippedEvent」が発行される
4. 注文がキャンセルされると「OrderCancelledEvent」が発行される

各イベントは以下の要素を含める必要があります：
- 標準的なイベントヘッダー（イベントID、タイプ、タイムスタンプ、ソース）
- イベント固有のペイロード（注文情報など）

出力は、各イベントのJSONスキーマ（draft-07）形式でお願いします。
```

4. **バックワード互換性チェック**

```markdown
# Cursorチャットでの指示例

以下の2つのバージョンのAPI仕様を比較し、バックワード互換性を検証してください：

旧バージョンのOpenAPI仕様：api-specs/v1.0/customer-api.yaml
新バージョンのOpenAPI仕様：api-specs/v1.1/customer-api.yaml

以下の観点でバックワード互換性を確認し、問題がある場合は指摘してください：
1. エンドポイントの削除や変更
2. 必須パラメータの追加
3. 既存フィールドの削除
4. 既存フィールドの型変更
5. 列挙型の値の削除

問題が発見された場合、どのように修正すればバックワード互換性を維持できるか提案してください。
```

5. **gRPCサービス定義からRESTful API仕様への変換**

```markdown
# Windsurfでの指示例

以下のProtocol Buffers定義（gRPC）から、同等のRESTful API仕様（OpenAPI 3.0）を生成してください：

Proto定義ファイル：protos/inventory_service.proto

変換時の注意点：
- gRPCのメソッドを適切なHTTPメソッドとパスにマッピング
- gRPCのフィールド名をJSONプロパティ名に変換（スネークケース→キャメルケース）
- gRPCのenumを適切なOpenAPIのenum定義に変換
- gRPCのストリーミングメソッドは適切なREST代替手段を提案
- gRPCのメタデータをHTTPヘッダーにマッピング

出力はYAML形式のOpenAPI 3.0仕様でお願いします。
```

##### 2.3.2.6 インターフェース設計のポイントと実践ノウハウ

1. **一貫性の確保**
   - 命名規則（URL、パラメータ、プロパティ名）の統一
   - エラーレスポンスの構造統一
   - 日付/時刻フォーマット（ISO-8601推奨）の統一
   - ページネーションパターンの統一

2. **バージョニング戦略**
   - URL内バージョン（例：`/api/v1/customers`）
   - ヘッダーベースバージョン（例：`Accept: application/vnd.example.v1+json`）
   - クエリパラメータバージョン（例：`/api/customers?version=1`）
   - 明示的なバージョニングポリシーの策定（バックワード互換性の保証期間など）

3. **ドキュメント自動生成**
   - OpenAPI仕様からSwagger UIによるインタラクティブドキュメント生成
   - Protocol BuffersからgRPCリファレンスドキュメント生成
   - 生成ドキュメントをCI/CDパイプラインで自動的に公開

4. **モック・テスト環境の自動化**
   - OpenAPI仕様からモックサーバー自動生成（Prism、Mirage JSなど）
   - 契約駆動テスト（Consumer Driven Contracts）の導入
   - APIテストの自動化（Postman Collections、REST Assured、PyRestTestなど）

5. **セキュリティ設計の組み込み**
   - 認証方式の標準化（JWT、OAuth 2.0、APIキーなど）
   - 認可ポリシーの明確化（ロールベース、属性ベースなど）
   - レート制限の設定（全体/ユーザー別/エンドポイント別）
   - 入力検証ルールの明確化

6. **エラーハンドリングの標準化**
   - エラーコードの体系化（HTTP状態コード + アプリケーション固有コード）
   - エラーメッセージの多言語対応
   - 詳細エラー情報の適切な提供（バリデーションエラーの詳細など）
   - 実行コンテキスト情報（リクエストID、タイムスタンプなど）の付加

7. **開発者エクスペリエンスの向上**
   - SDKの自動生成（OpenAPI Generator、Protocol Buffers Compilerなど）
   - ポスタマン（Postman）コレクションの自動生成
   - 開発者ポータルでの使いやすいドキュメント提供
   - サンプルコードの充実

8. **イベント駆動設計のベストプラクティス**
   - イベントバージョニング戦略の導入
   - イベントスキーマレジストリによるスキーマ管理（Schema Registry）
   - コンシューマー互換性を考慮したスキーマ進化ルール
   - デッドレターキュー（DLQ）などの例外処理パターン導入

##### 2.3.2.7 Cursorを使った標準インターフェース仕様書管理の実践例

```markdown
# Cursorの実践テクニック

## フォルダ構造

```
project-root/
├── api-specs/                       # API仕様ディレクトリ
│   ├── schemas/                     # 共通スキーマ定義
│   │   ├── common.yaml              # 共通コンポーネント
│   │   ├── customers.yaml           # 顧客関連スキーマ
│   │   └── errors.yaml              # エラーレスポーススキーマ
│   ├── services/                    # サービス別API仕様
│   │   ├── customer-service.yaml    # 顧客サービスAPI
│   │   ├── order-service.yaml       # 注文サービスAPI
│   │   └── payment-service.yaml     # 決済サービスAPI
│   └── standards/                   # API設計標準
│       ├── naming-conventions.md    # 命名規則
│       └── response-standards.md    # レスポンス標準
├── event-schemas/                   # イベントスキーマディレクトリ
│   ├── customer-events.json         # 顧客関連イベント
│   ├── order-events.json            # 注文関連イベント
│   └── standards/                   # イベント設計標準
│       └── event-guidelines.md      # イベント設計ガイドライン
├── proto/                           # Protocol Buffersディレクトリ
│   ├── customer/                    # 顧客サービスProtoファイル
│   │   └── v1/                      # v1バージョン
│   │       └── customer_service.proto
│   └── common/                      # 共通定義Protoファイル
│       └── v1/
│           └── common_types.proto
└── scripts/                         # ユーティリティスクリプト
    ├── generate-docs.sh             # ドキュメント生成スクリプト
    ├── validate-apis.sh             # API仕様検証スクリプト
    └── compatibility-check.sh       # 互換性チェックスクリプト
```

## API仕様のバージョン管理と互換性検証

```bash
# Cursorターミナルでの実行例

# APIスキーマ検証
npx @stoplight/spectral-cli lint api-specs/services/customer-service.yaml

# 旧バージョンとの互換性検証
npx openapi-diff api-specs/services/v1.0/customer-service.yaml \
  api-specs/services/v1.1/customer-service.yaml > changes-report.md

# ドキュメント生成
npx @redocly/cli build-docs api-specs/services/customer-service.yaml \
  -o public/docs/customer-service.html
```

## Cursorプロンプトテンプレート

```markdown
# @generate_rest_api.md
RESTful APIの設計を行います。

サービス名: {{service_name}}
リソース: {{resources}}
認証方式: {{auth_method}}
バージョニング: {{versioning}}

以下の要素を含むOpenAPI 3.0仕様のYAMLを生成してください：
- ベースURL設計
- リソースごとのCRUD操作
- クエリパラメータ
- リクエストボディ
- レスポンス定義
- エラーハンドリング
- データ型と制約
- 認証・認可方式
```

## AI支援によるインターフェース整合性チェック

```markdown
# Cursorチャット指示例

プロジェクトのすべてのAPI仕様（api-specs/services/ディレクトリ内のYAMLファイル）を分析し、
以下の観点での整合性を確認してください：

1. 命名規則の一貫性（キャメルケース/スネークケースなど）
2. データ型の一貫性（特に共通で使用される項目）
3. エラーレスポース形式の一貫性
4. 認証方式の一貫性
5. ページネーション方法の一貫性
6. 日付/時刻フォーマットの一貫性

問題があれば、すべての仕様に適用できる標準化案を提案してください。
```
```

##### 2.3.2.8 ClineによるAPIモック生成と利用例

```bash
# Clineによるモックサーバー自動生成と起動例

# OpenAPI仕様からモックサーバー生成
cline "api-specs/services/customer-service.yaml ファイルを読み込み、
Prismを使ったモックサーバーを起動するためのコマンドを実行してください。
ポートは4010を使い、すべてのリクエストに対して動的なレスポンスを生成するように設定してください。"

# 実行結果
# > npx @stoplight/prism-cli mock -p 4010 --dynamic api-specs/services/customer-service.yaml
# > Prism is listening on http://127.0.0.1:4010
```

```bash
# Clineによるテストコード生成例

cline "api-specs/services/customer-service.yaml ファイルのCustomer APIに対する
自動テストをJestとSupertest使って作成してください。
GET /customers エンドポイントと POST /customers エンドポイントのテストを優先的に含めてください。
認証は 'Authorization: Bearer {token}' 形式の模擬トークンを使用して実装してください。"
```

##### 2.3.2.9 WindsurfによるAPI実装とSDK自動生成

```markdown
# Windsurfでの実装指示例

以下のOpenAPI仕様に基づいて、Express.jsとTypeScriptで顧客管理APIを実装してください：

ファイル: api-specs/services/customer-service.yaml

実装要件:
1. コントローラーとサービスレイヤーを分離したクリーンアーキテクチャ
2. TypeScriptの型は自動生成して利用
3. JWTによる認証処理を含める
4. エラーハンドリングのミドルウェアを実装
5. リクエストのバリデーションを実装
6. ユニットテストを含める

出力は、READMEを含む完全なプロジェクト構造にしてください。
```

```markdown
# API SDK生成指示例

以下のOpenAPI仕様に基づいて、TypeScriptクライアントSDKを生成し、使用例を示してください：

ファイル: api-specs/services/customer-service.yaml

要件:
1. OpenAPI Generatorを使用
2. TypeScriptとFetchAPIを使用
3. エラーハンドリングを含む
4. 認証トークンの管理機能
5. 簡潔な使用例
```

APIとイベント設計においては、現在のベストプラクティスとされる「API First」と「イベントファースト」アプローチを採用し、実装前に設計を十分に詰めることが重要です。CursorやWindsurfなどのAIエージェント・ツールを活用することで、設計の一貫性確保、検証、ドキュメント生成などを効率化できます。標準インターフェース仕様書は、チーム間の協業の基盤となるため、明確で詳細な定義と、常に最新の状態を維持する仕組みが成功の鍵となります。
