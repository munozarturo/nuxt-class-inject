import { addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit";

import { promises as fsp } from "node:fs";
import { resolve } from "pathe";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // load script
    const scriptPath = await resolver.resolve("./script.min.js");
    const scriptRaw = await fsp.readFile(scriptPath, "utf-8");
    const script = scriptRaw;

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
