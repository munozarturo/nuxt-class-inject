<template>
  <button
    class="flex flex-row gap-2 p-1 hover:bg-foreground hover:text-background transition-colors duration-200"
    :class="{ 'bg-foreground text-background': menuOpen }"
    @click="toggleMenu()"
  >
    <p class="text-lg font-bold">customize</p>
  </button>
  <div v-if="menuOpen" class="fixed inset-0 backdrop-blur-sm z-30" @click="closeMenu()" />
  <div
    class="w-1/5 h-fit flex flex-col gap-2 fixed top-24 right-12 bg-foreground text-background transform transition-all duration-200 ease-in-out z-40 overflow-y-auto p-4"
    :class="menuOpen ? 'translate-x-0 opacity-100' : ' translate-x-[120%] opacity-0'"
  >
    <div class="w-full h-fit flex flex-row justify-between">
      <h2 class="text-xl font-bold">theme</h2>
      <button class="mr-1 hover:text-background-secondary text-xl" @click="closeMenu()">x</button>
    </div>
    <hr class="text-primary" />
    <div class="flex flex-col w-full h-fit gap-4">
      <div class="flex flex-col gap-2">
        <h3 class="text-md font-bold">font type</h3>
        <div class="flex flex-row gap-2 px-2">
          <button
            v-for="fontType in fontTypes"
            @click="setFont(fontType)"
            class="px-1 py-0.5"
            :class="{
              'bg-background text-foreground': fontType === currentFont,
            }"
          >
            {{ fontType }}
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-md font-bold">color scheme</h3>
        <div class="flex flex-wrap gap-2 px-2">
          <button
            v-for="theme in themes"
            @click="setTheme(theme)"
            class="px-1 py-0.5"
            :class="{
              'bg-background text-foreground': theme === currentTheme,
            }"
          >
            {{ theme }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const classInject = useClassInject();

const menuOpen = ref<boolean>(false);

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);

const fontTypes: string[] = ["sans", "serif", "mono"];
const currentFont = ref<string | null>(null);

const themes: string[] = ["light", "paper", "dark", "desert", "ocean", "forest"];
const currentTheme = ref<string | null>(null);

const setFont = (font: string) => {
  const current: string[] = classInject.classList.value as unknown as string[];

  const classList = current.filter((cls) => !cls.startsWith("font-"));
  classList.push(`font-${font}`);

  classInject.classList.value = classList;
  currentFont.value = font;
};

const setTheme = (theme: string) => {
  const current: string[] = classInject.classList.value as unknown as string[];

  const classList = current.filter((cls) => !cls.startsWith("theme-"));
  classList.push(`theme-${theme}`);

  classInject.classList.value = classList;
  currentTheme.value = theme;
};

const computeCurrentFontAndTheme = () => {
  const current: string[] = classInject.classList.value as unknown as string[];

  fontTypes.forEach((font) => {
    if (current.includes(`font-${font}`)) currentFont.value = font;
  });

  themes.forEach((theme) => {
    if (current.includes(`theme-${theme}`)) currentTheme.value = theme;
  });
};

onMounted(() => {
  computeCurrentFontAndTheme();
});
</script>
