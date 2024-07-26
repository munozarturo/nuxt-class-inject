import type { NitroAppPlugin } from "nitropack";

import { script } from "#nuxt-class-inject-script";

export default <NitroAppPlugin>function (nitro) {
    nitro.hooks.hook("render:html", (htmlContext) => {
        htmlContext.head.push(`<script>${script}</script>`);
    });
};
