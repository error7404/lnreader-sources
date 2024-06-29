import list from './sources.json' with { type: 'json' };
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateAll = function () {
  list.sort((a, b) => a.id.length - b.id.length);
  return list.map(source => {
    try {
      const filters = JSON.parse(
        readFileSync(`${__dirname}/filters/${source.id}.json`, 'utf-8'),
      );
      source.filters = filters;
    } catch (e) {}
    console.log(
      `[lightnovelwp] Generating: ${source.id}`.padEnd(50),
      source.filters ? '🔎with filters🔍' : '🚫 no filters 🚫',
    );
    return generator(source);
  });
};

const generator = function generator(source) {
  const LightNovelWPTemplate = readFileSync(
    './scripts/multisrc/lightnovelwp/template.ts',
    {
      encoding: 'utf-8',
    },
  );

  const pluginScript = `
${LightNovelWPTemplate.replace(
  '// CustomJS HERE',
  source.options?.customJs || '',
)}
const plugin = new LightNovelWPPlugin(${JSON.stringify(source)});
export default plugin;
    `.trim();

  return {
    lang: source.options?.lang || 'English',
    filename: source.sourceName,
    pluginScript,
  };
};
