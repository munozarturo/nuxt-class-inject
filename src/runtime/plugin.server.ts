import { ref, computed } from "vue";
import type { ClassInjectInstance } from "./types";
import { defineNuxtPlugin, useHead, useState } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  const _classList = ref<string[]>([]);

  const classList = computed({
    get: () => _classList.value,
    set: (classList: string[]) => {
      _classList.value = classList;
    },
  });

  const classInject: ClassInjectInstance = {
    unknown: true,
    classList,
  };

  const providedClassInject = nuxtApp.ssrContext?.islandContext
    ? ref({})
    : useState<ClassInjectInstance>("class-inject", () => classInject);

  const htmlAttrs: Record<string, string> = {};
  useHead({ htmlAttrs });

  return {
    provide: {
      classInject: providedClassInject,
    },
  };
});
