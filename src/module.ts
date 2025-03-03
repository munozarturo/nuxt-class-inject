import { promises as fsp } from "node:fs";
import { addPlugin, addTemplate, createResolver, defineNuxtModule } from "@nuxt/kit";

import { resolve } from "pathe";

const DEFAULTS: ModuleOptions = {
  storageKey: "nuxt-class-inject",
  globalName: "__NUXT_CLASS_INJECT__",
  fallback: [],
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-class-inject",
    configKey: "classInject",
  },
  defaults: DEFAULTS,
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Read script from disk and add to options
    const scriptPath = await resolver.resolve("./script.min.js");
    const scriptRaw = await fsp.readFile(scriptPath, "utf-8");
    type ScriptOption = "storageKey" | "globalName" | "fallback";
    const script = scriptRaw
      .replace(/"<%= options\.([^ ]+) %>"/g, (_, option: ScriptOption) => {
        if (option === "fallback") {
          return JSON.stringify(options[option]);
        }
        return `"${options[option]}"`;
      })
      .trim();

    // Inject options via virtual template
    nuxt.options.alias["#nuxt-class-inject-options"] = addTemplate({
      filename: "nuxt-class-inject-options.mjs",
      getContents: () =>
        Object.entries(options)
          .map(
            ([key, value]) =>
              `export const ${key} = ${JSON.stringify(value, null, 2)}
      `,
          )
          .join("\n"),
    }).dst;

    const runtimeDir = await resolver.resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    for (const template of ["plugin.client", "plugin.server"]) {
      addPlugin(resolve(runtimeDir, template));
    }

    // Nuxt 3 and Bridge - inject script
    nuxt.hook("nitro:config", (config) => {
      config.externals = config.externals || {};
      config.externals.inline = config.externals.inline || [];
      config.externals.inline.push(runtimeDir);
      config.virtual = config.virtual || {};
      config.virtual["#nuxt-class-inject-script"] = `export const script = ${JSON.stringify(
        script,
        null,
        2,
      )}`;
      config.plugins = config.plugins || [];
      config.plugins.push(resolve(runtimeDir, "nitro-plugin"));
    });
  },
});

export interface ModuleOptions {
  /**
   * @default 'nuxt-class-inject'
   */
  storageKey: string
  /**
   * @default '__NUXT_CLASS_INJECT__'
   */
  globalName: string
  /**
   * @default '[]'
   */
  fallback: string[]
}
