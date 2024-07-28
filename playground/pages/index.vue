<template>
  <ScrollToTop class="" />
  <div class="w-full max-w-[700px] flex flex-col gap-8 px-4 pt-4 pb-8">
    <ProseSection id="top">
      <ProseH1>nuxt-class-inject</ProseH1>
      <ProseP> Dynamic class injection before client rendering. </ProseP>
      <ProseP>
        Fast and efficient dynamic CSS class injection. CSS classes are injected into the
        <ProseCode>
          {{ `
          <html />
          ` }} </ProseCode
        >&nbsp;component before rendering avoiding flashing on client load.
      </ProseP>
    </ProseSection>
    <ProseSection id="features" class="flex flex-col gap-4">
      <ProseH2>features</ProseH2>
      <ul class="text-md md:text-lg flex flex-col gap-1 pl-4 list-disc">
        <li>Nuxt3 and Nuxt Bridge support</li>
        <li>
          Inject CSS classes into
          <ProseCode>
            {{ `
            <html />
            ` }}
          </ProseCode>
          &nbsp;tag before browser rendering
        </li>
        <li>Works with client side and universal rendering</li>
        <li>Injected CSS classes persist across same-browser sessions</li>
        <li>Supports IE9+</li>
      </ul>
    </ProseSection>
    <ProseSection id="live-demo">
      <ProseH2>live demo</ProseH2>
      <ProseP>
        You can see this module in action by using the
        <ProseCode>customize</ProseCode>&nbsp;button at the top right of this page.
      </ProseP>
    </ProseSection>
    <ProseSection id="contents">
      <ProseH2>table of contents</ProseH2>
      <ul class="text-md md:text-lg flex flex-col gap-1 pl-4 list-disc">
        <li>
          <a href="#setup" class="hover:bg-foreground-secondary hover:text-background p-1">
            setup
          </a>
        </li>
        <li>
          <a href="#usage" class="hover:bg-foreground-secondary hover:text-background p-1">
            usage
          </a>
        </li>
        <li>
          <a href="#configuration" class="hover:bg-foreground-secondary hover:text-background p-1">
            configuration
          </a>
        </li>
        <li>
          <a href="#tailwind-css" class="hover:bg-foreground-secondary hover:text-background p-1">
            tailwind css
          </a>
        </li>
        <li>
          <a href="#notes" class="hover:bg-foreground-secondary hover:text-background p-1">
            notes
          </a>
        </li>
        <li>
          <a href="#credit" class="hover:bg-foreground-secondary hover:text-background p-1">
            credit
          </a>
        </li>
      </ul>
    </ProseSection>
    <ProseSection id="setup" class="flex flex-col gap-4">
      <ProseH2>setup</ProseH2>
      <ProseP>
        Add the <ProseCode>nuxt-class-inject</ProseCode>&nbsp;dependency to your project.
      </ProseP>
      <MultiPre
        :tabs="['yarn', 'npm', 'pnpm']"
        :contents="{
          yarn: '\nyarn add --dev nuxt-class-inject',
          npm: '\nnpm install --save-dev nuxt-class-inject',
          pnpm: '\npnpm install --save-dev nuxt-class-inject',
        }"
      />
      <ProseP>
        Then add <ProseCode>nuxt-class-inject</ProseCode>&nbsp;to the
        <ProseCode>modules</ProseCode>&nbsp;section of your <ProseCode>nuxt.config.ts</ProseCode>
      </ProseP>
      <ProsePre lang="bash" file="nuxt.config.ts">
        {{ nuxtConfigDefineModule }}
      </ProsePre>
    </ProseSection>
    <ProseSection id="usage" class="flex flex-col gap-4">
      <div class="w-full flex flex-row items-center gap-4">
        <ProseH2>usage</ProseH2>
        <a
          href="https://github.com/munozarturo/nuxt-class-inject-example"
          target="_blank"
          class="hover:bg-foreground hover:text-background p-1 flex flex-row items-center gap-2"
        >
          <GitHubLogo class="w-6 h-6" />
          <p class="text-xl font-bold">example</p>
        </a>
      </div>
      <ProseP>
        The injected <ProseCode>classList</ProseCode> can be accessed through
        <ProseCode>$classInject</ProseCode> directly. This helper has two properties:
      </ProseP>
      <ul class="text-md md:text-lg flex flex-col gap-1 pl-4 list-disc">
        <li>
          <ProseCode>unknown</ProseCode>: a boolean value, <ProseCode>true</ProseCode> if the
          <ProseCode>classList</ProseCode> is unknown, <ProseCode>false</ProseCode> otherwise.
        </li>
        <li>
          <ProseCode>classList</ProseCode>: the list of injected classes, update it to change
          injected classes.
        </li>
      </ul>
      <ProsePre lang="vue" file="app.vue">
        {{ exampleApp }}
      </ProsePre>
    </ProseSection>
    <ProseSection id="configuration" class="flex flex-col gap-4">
      <ProseH2>configuration</ProseH2>
      <ProseP>
        You can configure the module through the <ProseCode>classInject</ProseCode> property in your
        <ProseCode>nuxt.config.js</ProseCode>. The default options are
      </ProseP>
      <ProsePre lang="ts" file="nuxt.config.js">
        {{ nuxtCofigConfigModule }}
      </ProsePre>
      <ProseP>The config options are:</ProseP>
      <ul class="text-md md:text-lg flex flex-col gap-1 pl-4 list-disc">
        <li>
          <ProseCode>storageKey</ProseCode>: the storage key used to store injected classes in the
          browser&lsquo;s local storage
        </li>
        <li>
          <ProseCode>globalName</ProseCode>: the global name used by the module which is used to
          inject JavaScript into the
          <ProseCode>window</ProseCode>
        </li>
        <li>
          <ProseCode>fallback</ProseCode>: the classes to inject in case no classes are found in
          local storage
        </li>
      </ul>
    </ProseSection>
    <ProseSection id="tailwind-css" class="flex flex-col gap-4">
      <div class="flex flex-row items-center gap-4">
        <ProseH2>tailwind css</ProseH2>
        <a
          href="https://github.com/munozarturo/nuxt-class-inject-tailwind-example"
          target="_blank"
          class="hover:bg-foreground hover:text-background p-1 flex flex-row items-center gap-2"
        >
          <GitHubLogo class="w-6 h-6" />
          <p class="text-xl font-bold">example</p>
        </a>
      </div>
      <ProseP>
        To work with Tailwind CSS change your CSS classes to change the value of variables:
      </ProseP>
      <ProsePre lang="vue" file="app.vue">
        {{ tailwindExampleApp }}
      </ProsePre>
      <ProseP>
        Then register thos variables in the <ProseCode>tailwind.config.js</ProseCode> file:
      </ProseP>
      <ProsePre lang="js" file="tailwind.config.js">
        {{ tailwindConfig }}
      </ProsePre>
    </ProseSection>
    <ProseSection id="notes" class="flex flex-col gap-4">
      <ProseH2>notes</ProseH2>
      <ProseP> There are a couple of things to keep in mind when using this module. </ProseP>
      <ol class="text-md md:text-lg flex flex-col gap-1 pl-6 list-decimal">
        <li>
          Since the &ldquo;source of truth&rdquo; for the injected classes is on the client side
          (the browser&lsquo;s storage), it means that during SSR the injected class list is not
          known.
        </li>
        <li class="space-y-4">
          The exposed <ProseCode>classList</ProseCode> is a <ProseCode>{{ refType }}</ProseCode> so
          that the only way of upating the value is by overwriting it. This is done because
          <ProseCode>vue</ProseCode>&lsquo;s reactivity for arrays works on property access and
          assignment and not internal array modifications. The correct manner of updating
          <ProseCode>classList</ProseCode> list is as follows:
        </li>
      </ol>
      <ProsePre lang="vue">
        {{ updateClassList }}
      </ProsePre>
    </ProseSection>
    <ProseSection id="credit" class="flex flex-col gap-4">
      <ProseH2>credit</ProseH2>
      <ProseP>
        This module is &ldquo;heavily inspired&rdquo; by the
        <a
          href="https://github.com/nuxt-modules/color-mode"
          target="_blank"
          class="underline bg-foreground-secondary text-background p-1"
          >nuxt-color-mode</a
        >&NonBreakingSpace;module. i.e. I comlpetely ripped it off, altered it slightly to better
        suit my needs, and called it my own.
      </ProseP>
    </ProseSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "nuxt-class-inject",
});

const nuxtConfigDefineModule = `
export default defineNuxtConfig({
  modules: [
    "nuxt-class-inject", 
  ],
});`;

const nuxtCofigConfigModule = `
export default defineNuxtConfig {
  modules: ["nuxt-class-inject",],
  classInject: {
    storageKey: "nuxt-class-inject",
    globalName: "__NUXT_CLASS_INJECT__",
    fallback: [""],
  },
}`;

const exampleApp = `
<template>
    <div>
        <button
            v-for="theme in themes"
            @click="setTheme(theme)"
        >
            {{ theme }}
        </button>
    </div>
</template>

<script setup lang="ts">
const { $classInject } = useNuxtApp();

const themes: string[] = ["theme-light", "theme-dark"];
const setTheme = (theme: string) => {
    const current: string[] = $classInject.classList.value;

    const classList = current.filter((cls) => {
      return !cls.startsWith("theme-")
    });
    classList.push(theme);

    $classInject.classList.value = classList;
};
<\/script>

<style lang="css">
.theme-light {
    background-color: #1e1e1e;
    color: #fefefe;
}

.theme-dark {
    background-color: #fefefe;
    color: #1e1e1e;
}
</style>
`;

const tailwindExampleApp = `
<style lang="css">
.theme-light {
    --foreground: #1e1e1e;
    --background: #fefefe;
}

.theme-dark {
    --foreground: #fefefe;
    --background: #1e1e1e;
}
</style>
`;

const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            colors: {
                foreground: "var(--foreground)",
                background: "var(--background)",
            },
        },
    },
};
`;

const refType = "WriteableComputedRef<string[]>";

const updateClassList = ` 
const classList: string[] = $classInject.classList.value;

// make changes to classList

$classInject.classList.value = classList;`;
</script>
