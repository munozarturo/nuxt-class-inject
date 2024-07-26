import { $fetch, setup } from "@nuxt/test-utils";
import { describe, expect, it } from "vitest";

import { fileURLToPath } from "node:url";

const fixture = fileURLToPath(new URL("../../playground", import.meta.url));

describe("ssr: true, target: server, prod mode", async () => {
  await setup({
    server: true,
    build: true,
    fixture,
    nuxtConfig: { ssr: true },
  });

  it("render", async () => {
    const html = await $fetch("/");
    expect(html).toContain('getItem("nuxt-class-inject")');
  });
});

// describe.skip('ssr: true, csp hash on script', async () => {
//   await setup({
//     server: true,
//     fixture,
//     nuxtConfig: {
//       // render: {
//       //   csp: true
//       // }
//     }
//   })

//   it('csp hash on script', async () => {
//     const { headers } = await fetch('/')
//     expect(headers.get('content-security-policy')).toContain('sha256-')
//   })
// })
