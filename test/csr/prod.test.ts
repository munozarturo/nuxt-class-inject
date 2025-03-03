import { fileURLToPath } from "node:url";
import { $fetch, setup } from "@nuxt/test-utils";
import { describe, expect, it } from "vitest";

const fixture = fileURLToPath(new URL("../../playground", import.meta.url));

describe("ssr: false, target: server, prod mode", async () => {
  await setup({
    server: true,
    build: true,
    fixture,
    nuxtConfig: { ssr: false },
  });

  it("render", async () => {
    const html = await $fetch("/");
    expect(html).toContain("getItem(\"nuxt-class-inject\")");
  });
});
