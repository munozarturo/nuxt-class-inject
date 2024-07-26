import { globalName, storageKey } from "#nuxt-class-inject-options";
import { ref, watch } from "vue";

import { defineNuxtPlugin } from "#app";

interface ClassInjectHelper {
  getClassList: () => string[];
  addClassName: (className: string) => void;
  removeClassName: (className: string) => void;
}

const helper = (window[globalName] || {}) as unknown as ClassInjectHelper;

export default defineNuxtPlugin((nuxtApp) => {
  const getStoredClasses = (): string[] => {
    try {
      const classList = localStorage.getItem(storageKey);
      if (classList) return JSON.parse(classList);
      else {
        const classList = helper.getClassList();
        localStorage.setItem(storageKey, JSON.stringify(classList));
        return classList;
      }
    } catch {
      return [];
    }
  };

  const updateStorage = (classes: string[]) => {
    localStorage.setItem(storageKey, JSON.stringify(classes));
  };

  const classList = ref<string[]>(getStoredClasses());

  // Watch for changes in classList
  watch(
    classList,
    (newClasses, oldClasses) => {
      // Find classes to add
      const classesToAdd = newClasses.filter((c) => !oldClasses.includes(c));
      // Find classes to remove
      const classesToRemove = oldClasses.filter((c) => !newClasses.includes(c));

      // Update DOM
      classesToAdd.forEach((c) => helper.addClassName(c));
      classesToRemove.forEach((c) => helper.removeClassName(c));

      // Update localStorage
      updateStorage(newClasses);
    },
    { deep: true }
  );

  classList.value.forEach((className) => helper.addClassName(className));

  return {
    provide: {
      classInject: {
        classList: classList,
      },
    },
  };
});
