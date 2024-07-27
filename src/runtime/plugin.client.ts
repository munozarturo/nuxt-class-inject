import { ref, watch, computed } from "vue";
import { globalName, storageKey } from "#nuxt-class-inject-options";
import { defineNuxtPlugin } from "#app";

interface ClassInjectHelper {
  getClassList: () => string[]
  addClassName: (className: string) => void
  removeClassName: (className: string) => void
}

const helper = (window[globalName] || {}) as unknown as ClassInjectHelper;

function getStoredClasses(): string[] {
  try {
    const classList = localStorage.getItem(storageKey);
    if (classList) return JSON.parse(classList);
    else {
      const classList = helper.getClassList();
      localStorage.setItem(storageKey, JSON.stringify(classList));
      return classList;
    }
  }
  catch {
    return [];
  }
}

export default defineNuxtPlugin((_nuxtApp) => {
  const _classList = ref<string[]>(getStoredClasses());

  const classList = computed({
    get: () => _classList.value,
    set: (classList: string[]) => {
      _classList.value = classList;
    },
  });

  watch(
    classList,
    (newClasses, oldClasses) => {
      const classesToAdd = newClasses.filter(c => !oldClasses.includes(c));
      const classesToRemove = oldClasses.filter(c => !newClasses.includes(c));

      classesToAdd.forEach(c => helper.addClassName(c));
      classesToRemove.forEach(c => helper.removeClassName(c));

      localStorage.setItem(storageKey, JSON.stringify(newClasses));
    },
    { deep: true },
  );

  _classList.value.forEach(className => helper.addClassName(className));

  return {
    provide: {
      classInject: {
        unknown: false,
        classList: classList,
      },
    },
  };
});
