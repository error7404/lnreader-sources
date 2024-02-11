/**
 * This generator is for most sites that uses the LightNovel WordPress Theme:
 * https://themesia.com/lightnovel-wordpress-theme/
 * 
 * it should work for all sites that uses this theme (highest version tested: 1.1.5)
 * to know the version of the theme you can add "/wp-content/themes/lightnovel/style.css"
 * to the site url and check the version in the file
 * or you can check the version by entering the url in : "https://www.wpthemedetector.com"
 * (it sometimes hallucinates for version 1.0.X as 1.0)
 */


/** =========================ADD A NEW SOURCE=========================
 * To add a new source you need to add it to sources.json:
 * - id: the id of the source (something unique)
 * - sourceName: the name of the source (the name that will be displayed in the app)
 * - sourceSite: the site url
 * - options: the options of the source
 *  - lang: the language of the source (default: "English") (check that the language
 *    exists in the languages (check folder names in "plugins/"))
 *  - reverseChapter: if the chapters are in reverse order
 *    (if the first chapter of the list is 1 set it to true)
 * 
 * To add an icon to the source you need to find the icon of the site
 * (try the favicon of the site (https://site.com/favicon.ico)
 * (don't forget to convert it to png))
 * and add it to the folder "icons/multisrc/lightnovelwp" named as the id of the source
 * 
 * To add filters to a source you need to run the script "get_filters.ts"
 * (./node_modules/.bin/ts-node scripts/multisrc/lightnovelwp/get_filters.ts
 * (if you are in the root of the project) (and you have run "npm install" before))
 * and follow the instructions (url is easier and faster but sometimes it doesn't work)
 */

import { ScrpitGeneratorFunction } from "../generate";
import { LightNovelWPMetadata } from "./template";
import list from "./sources.json";
import { readFileSync } from "fs";
import path from "path";

export const generateAll: ScrpitGeneratorFunction = function (name) {
  return list.map((source: LightNovelWPMetadata) => {
    let filters: any = {};
    try {
      filters = require(`./filters/${source.id}`);
      source.filters = filters.filters;
    } catch (e) {}
    console.log(`[${name}] Generating:`, source.id, source.filters? "\t🔎with filters🔍" : "\t🚫no filters🚫");
    return generator(source);
  });
};

const generator = function generator(source: LightNovelWPMetadata) {
  const LightNovelWPTemplate = readFileSync(path.join(__dirname, "template.ts"),{
    encoding: "utf-8",
  });

  const pluginScript = `
  ${LightNovelWPTemplate}
const plugin = new LightNovelWPPlugin(${JSON.stringify(source)});
export default plugin;
    `.trim();

  return {
    lang: source.options?.lang || "English",
    filename: source.sourceName,
    pluginScript,
  };
};
