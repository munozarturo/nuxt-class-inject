import { $fetch, setup } from "@nuxt/test-utils";
import { describe, expect, it } from "vitest";

import { fileURLToPath } from "node:url";

const fixture = fileURLToPath(new URL("../../playground", import.meta.url));

describe("ssr: false, dev mode", async () => {
  await setup({
    server: true,
    dev: true,
    fixture,
    nuxtConfig: { ssr: false },
  });
  it("renders", async () => {
    const html = await $fetch("/");
    expect(html).toContain('getItem("nuxt-class-inject")');
  });
});
