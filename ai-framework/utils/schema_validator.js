/**
 * JSONスキーマ検証ユーティリティ
 * 指定されたJSONデータがスキーマに適合しているかを検証します
 */

const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

const ajv = new Ajv({ allErrors: true });

/**
 * JSONデータをスキーマに対して検証します
 * 
 * @param {Object} data 検証するJSONデータ
 * @param {String} schemaPath スキーマファイルへのパス
 * @returns {Object} 検証結果 { valid: boolean, errors: Array }
 */
function validateAgainstSchema(data, schemaPath) {
  try {
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    const schema = JSON.parse(schemaContent);
    
    const validate = ajv.compile(schema);
    const valid = validate(data);
    
    return {
      valid,
      errors: validate.errors || []
    };
  } catch (error) {
    return {
      valid: false,
      errors: [{ message: `スキーマ検証中にエラーが発生しました: ${error.message}` }]
    };
  }
}

/**
 * ファイルを読み込んでスキーマ検証を行います
 * 
 * @param {String} jsonFilePath 検証するJSONファイルのパス
 * @param {String} schemaPath スキーマファイルへのパス
 * @returns {Object} 検証結果 { valid: boolean, errors: Array }
 */
function validateFile(jsonFilePath, schemaPath) {
  try {
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
    const data = JSON.parse(jsonContent);
    
    return validateAgainstSchema(data, schemaPath);
  } catch (error) {
    return {
      valid: false,
      errors: [{ message: `ファイル読み込み中にエラーが発生しました: ${error.message}` }]
    };
  }
}

module.exports = {
  validateAgainstSchema,
  validateFile
};
