"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacePlaceholders = exports.readEmailTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
function readEmailTemplate(templateName) {
    const templatePath = `src/email-templates/${templateName}.html`;
    return fs_1.default.readFileSync(templatePath, 'utf8');
}
exports.readEmailTemplate = readEmailTemplate;
function replacePlaceholders(template, data) {
    for (const [key, value] of Object.entries(data)) {
        const placeholder = `{{${key}}}`;
        template = template.replace(new RegExp(placeholder, 'g'), value);
    }
    return template;
}
exports.replacePlaceholders = replacePlaceholders;
