function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _crypto = require('crypto');
const _crypto2 = _interopRequireDefault(_crypto);

const _pegjs = require('pegjs');
const _pegjs2 = _interopRequireDefault(_pegjs);


const getCacheKey = function getCacheKey(fileData, filePath, configString, options) {
  return _crypto2.default.createHash('md5').update(fileData).digest('hex');
};

const process = function process(sourceText, sourcePath, config, options) {
  return 'module.exports = ' + _pegjs2.default.generate(sourceText, { output: 'source' });
};

const transformer = {
  getCacheKey: getCacheKey,
  process: process
};

module.exports = transformer;