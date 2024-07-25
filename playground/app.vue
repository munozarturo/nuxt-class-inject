<template>
  <div>Nuxt module playground!</div>
  <div class="">
    <p>{{ $classInject.classList }}</p>
    <button v-for="theme in themes" @click="setTheme(theme)">
      {{ theme }}
    </button>
    <button v-for="font in fonts" @click="setFont(font)">
      {{ font }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { $classInject } = useNuxtApp();

const themes: string[] = ["light-theme", "dark-theme", "sepia-theme"];
const fonts: string[] = ["font-sans", "font-serif", "font-mono"];

const setTheme = (val: string) => {
  // Remove all theme classes
  $classInject.classList.value = $classInject.classList.value.filter(
    (v) => !themes.includes(v)
  );
  // Add the new theme
  $classInject.classList.value.push(val);
};

const setFont = (val: string) => {
  // Remove all font classes
  $classInject.classList.value = $classInject.classList.value.filter(
    (v) => !fonts.includes(v)
  );
  // Add the new font
  $classInject.classList.value.push(val);
};
</script>
