<template>
  <ScrollToTop />
  <div class="w-full max-w-[700px] flex flex-col gap-4 px-4 pt-4 pb-8">
    <h1 class="text-5xl font-bold">nuxt-class-inject</h1>
    <p class="text-lg">
      <code class="bg-foreground text-background p-1">nuxt-class-inject</code>
      is a Nuxt module that allows persistent dynamic class injection before rendering. It is useful
      for things like dynamic styling; since it injects CSS classes into the
      <code class="bg-foreground text-background p-1">
        {{`
        <html />
        `}}</code
      >&nbsp;component before rendering occurs on the client side it prevents common issues like
      style flashing.
    </p>
    <p class="text-lg">
      This is achieved by leveraging the browser&lsquo;s local storage. Since it can be accessed
      before rendering by using Nitro plugins Nuxt can determine what classes should be applied to
      the
      <code class="bg-foreground text-background p-1">
        {{`
        <html />
        `}}</code
      >&nbsp;tag before the content is loaded. As an added bonus this also persists the injected
      classes.
    </p>
    <p class="text-lg">
      Try it out by using the
      <code class="bg-foreground text-background p-1">customize</code>&nbsp;button at the top right
      of this page.
    </p>
    <h2 class="text-3xl font-bold" id="contents">contents</h2>
    <ul class="text-lg flex flex-col gap-1 pl-4">
      <li>
        <a href="#features" class="hover:bg-foreground hover:text-background p-1"> features </a>
      </li>
      <li>
        <a href="#setup" class="hover:bg-foreground hover:text-background p-1"> setup </a>
      </li>
      <li>
        <a href="#usage" class="hover:bg-foreground hover:text-background p-1"> usage </a>
      </li>
      <li>
        <a href="#configuration" class="hover:bg-foreground hover:text-background p-1">
          configuration
        </a>
      </li>
      <li>
        <a href="#tailwind-css" class="hover:bg-foreground hover:text-background p-1">
          tailwind css
        </a>
      </li>
    </ul>
    <h2 class="text-3xl font-bold" id="features">features</h2>
    <h2 class="text-3xl font-bold" id="setup">setup</h2>
    <h2 class="text-3xl font-bold" id="usage">usage</h2>
    <h2 class="text-3xl font-bold" id="configuration">configuration</h2>
    <h2 class="text-3xl font-bold" id="tailwind-css">tailwind css</h2>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "nuxt-class-inject",
});
</script>
