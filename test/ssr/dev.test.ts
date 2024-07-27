import { fileURLToPath } from "node:url";
import { $fetch, setup } from "@nuxt/test-utils";
import { describe, expect, it } from "vitest";

const fixture = fileURLToPath(new URL("../../playground", import.meta.url));

describe("ssr: true, dev mode", async () => {
  await setup({
    server: true,
    dev: true,
    fixture,
  });

  it("render", async () => {
    const html = await $fetch("/");
    expect(html).toContain("getItem(\"nuxt-class-inject\")");
  });
});
