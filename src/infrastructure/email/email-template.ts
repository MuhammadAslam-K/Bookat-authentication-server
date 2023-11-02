import fs from 'fs';

export function readEmailTemplate(templateName: string): string {
    const templatePath = `src/email-templates/${templateName}.html`;
    return fs.readFileSync(templatePath, 'utf8');
}

export function replacePlaceholders(template: string, data: Record<string, string>): string {
    for (const [key, value] of Object.entries(data)) {
        const placeholder = `{{${key}}}`;
        template = template.replace(new RegExp(placeholder, 'g'), value);
    }
    return template;
}
