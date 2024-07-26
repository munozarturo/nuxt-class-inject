import { defineNuxtPlugin, useHead, useState } from "#imports";
import { reactive, ref } from "vue";

interface ClassListInstance {
  value: string[];
}

export default defineNuxtPlugin((nuxtApp) => {
  const classList = nuxtApp.ssrContext?.islandContext
    ? ref([])
    : useState<ClassListInstance>("class-inject", () =>
        reactive({
          value: [],
        })
      ).value;

  const htmlAttrs: Record<string, string> = {};
  useHead({ htmlAttrs });

  // Provide the classList to the app
  nuxtApp.provide("classInject", {
    classList: classList,
  });
});
