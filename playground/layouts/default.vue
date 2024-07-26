<template>
  <div
    class="w-full min-h-screen flex flex-col items-center bg-background text-foreground"
  >
    <div
      class="w-full h-16 flex flex-row gap-4 items-center justify-end px-8 py-4"
    >
      <ThemeMenu />
      <a
        href="https://github.com/munozarturo/nuxt-class-inject"
        target="_blank"
        class="hover:bg-foreground hover:text-background p-1"
      >
        <GitHubLogo class="w-6 h-6" />
      </a>
    </div>
    <slot />
  </div>
</template>
