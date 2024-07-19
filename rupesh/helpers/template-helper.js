const ejs = require("ejs");
4
const renderTemplate = async (templateFileName, templateData) => {
    const template = ejs.renderFile(`views/email/${templateFileName}`, templateData);
    
    return template;
};

module.exports = {
    renderTemplate
};