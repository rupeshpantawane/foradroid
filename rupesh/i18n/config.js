const { I18n } = require('i18n');
const helper = require("../helpers/common.helper")



function myfunction(req, response) {

}


const i18n = new I18n({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  directory: __dirname + '/languages',
});
module.exports = i18n;
module.exports = myfunction;
