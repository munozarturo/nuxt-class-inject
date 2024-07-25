import type { NitroAppPlugin } from "nitropack";

import { script } from "#injected-script";

export default <NitroAppPlugin>function (nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}</script>`);
  });
};
