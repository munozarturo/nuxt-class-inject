import { Ref } from "vue";

// Define the ClassInjectInstance interface
interface ClassInjectInstance {
  classList: Ref<string[]>;
}

// Define the PluginInjection interface for your module
interface PluginInjection {
  $classInject: ClassInjectInstance;
}

// Nuxt Bridge & Nuxt 3
declare module "#app" {
  interface NuxtApp extends PluginInjection {}
}

// Nuxt 3
declare module "vue-router" {
  interface RouteMeta {
    classInject?: string[];
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends PluginInjection {}
}
