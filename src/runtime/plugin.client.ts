import { defineNuxtPlugin } from "#app";
import { globalName } from "#nuxt-class-inject-options";
import { useState } from "#imports";

const helper = (window[globalName] || {}) as unknown as {
  addClassName: (className: string) => void;
  removeClassName: (className: string) => void;
};

export default defineNuxtPlugin((nuxtApp) => {});
