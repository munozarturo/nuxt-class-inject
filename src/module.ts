import { addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit";

import { promises as fsp } from "node:fs";
import { resolve } from "pathe";

const DEFAULTS: ModuleOptions = {
  classPrefix: "",
  storageKey: "nuxt-class-inject",
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
    type ScriptOption = "storageKey" | "classPrefix";
    const script = scriptRaw
      .replace(
        /<%= options\.([^ ]+) %>/g,
        (_, option: ScriptOption) => options[option]
      )
      .trim();

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
      config.virtual[
        "#injected-script"
      ] = `export const script = ${JSON.stringify(script, null, 2)}`;
      config.plugins = config.plugins || [];
      config.plugins.push(resolve(runtimeDir, "nitro-plugin"));
    });
  },
});

export interface ModuleOptions {
  /**
   * @default 'nuxt-class-inject'
   */
  storageKey: string;
  /**
   * @default ''
   */
  classPrefix: string;
}
