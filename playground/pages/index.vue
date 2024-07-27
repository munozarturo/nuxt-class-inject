<template>
  <ScrollToTop />
  <div class="w-full max-w-[700px] flex flex-col gap-8 px-4 pt-4 pb-8">
    <ProseSection id="top">
      <ProseH1>nuxt-class-inject</ProseH1>
      <ProseP>
        <ProseCode>nuxt-class-inject</ProseCode>
        is a Nuxt module that allows dynamic class injection before client rendering. It is useful
        for things like dynamic styling; since it injects CSS classes into the
        <ProseCode>
          {{`
          <html />
          `}}</ProseCode
        >&nbsp;component before rendering it prevents common issues like style flashing on client
        load.
      </ProseP>
      <ProseP>
        This is achieved by leveraging the browser&lsquo;s local storage. Since it can be accessed
        before rendering by using Nitro plugins Nuxt can determine what classes should be applied to
        the
        <ProseCode>
          {{`
          <html />
          `}}</ProseCode
        >&nbsp;tag before the content is loaded. As an added bonus this also persists the injected
        classes across same-browser sessions.
      </ProseP>
    </ProseSection>
    <ProseSection id="live-demo">
      <ProseH2>live demo</ProseH2>
      <ProseP>
        You can see it in action by using the
        <ProseCode>customize</ProseCode>&nbsp;button at the top right of this page.
      </ProseP>
    </ProseSection>
    <ProseSection id="contents">
      <ProseH2>table of contents</ProseH2>
      <ul class="text-lg flex flex-col gap-1 pl-4 list-disc">
        <li>
          <a href="#features" class="hover:bg-foreground-secondary hover:text-background p-1">
            features
          </a>
        </li>
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
    <ProseSection id="features" class="flex flex-col gap-4">
      <ProseH2>features</ProseH2>
      <ul class="text-lg flex flex-col gap-1 pl-4 list-disc">
        <li>Nuxt 3 and Nuxt Bridge support</li>
        <li>
          Inject classes into
          <ProseCode>
            {{ `
            <html />
            ` }}
          </ProseCode>
          &nbsp;tag before content rendering
        </li>
        <li>Works with client side and universal rendering</li>
        <li>Injected classes persist across sessions</li>
        <li>Supports IE9+</li>
      </ul>
    </ProseSection>
    <ProseSection id="setup" class="flex flex-col gap-4">
      <ProseH2>setup</ProseH2>
      <ProseP>
        Add the <ProseCode>@nuxt-class-inject</ProseCode>&nbsp;dependency to your project.
      </ProseP>
      <MultiPre
        :tabs="['yarn', 'npm', 'pnpm']"
        :contents="{
          yarn: '\nyarn add --dev @nuxt-class-inject',
          npm: '\nnpm install --save-dev @nuxt-class-inject',
          pnpm: '\npnpm install --save-dev @nuxt-class-inject',
        }"
      />
      <ProseP>
        Then add <ProseCode>@nuxt-class-inject</ProseCode>&nbsp;to the
        <ProseCode>modules</ProseCode>&nbsp;section of your <ProseCode>nuxt.config.ts</ProseCode>
      </ProseP>
      <ProsePre lang="bash" file="nuxt.config.ts">{{ nuxtConfigDefineModule }}</ProsePre>
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
        The injected <ProseCode>classList</ProseCode> can be accessed by calling
        <ProseCode>useClassInject()</ProseCode> or by accessing
        <ProseCode>$classInject</ProseCode> directly. This helper has one property:
      </ProseP>
      <ul class="text-lg flex flex-col gap-1 pl-4 list-disc">
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
      <ProsePre lang="ts" file="nuxt.config.js">{{ nuxtCofigConfigModule }}</ProsePre>
      <ProseP>The config options are:</ProseP>
      <ul class="text-lg flex flex-col gap-1 pl-4 list-disc">
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
      <ol class="text-lg flex flex-col gap-1 pl-4 list-decimal">
        <li>
          Since the &ldquo;source of truth&rdquo; for the injected classes is on the client side
          (the browser&lsquo;s storage), it means that during SSR the injected class list is not
          known.
        </li>
        <li>Since the exposed <ProseCode>classList</ProseCode> is a ref to a string array.</li>
      </ol>
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
    "@nuxt-class-inject", 
  ],
});`;

const nuxtCofigConfigModule = `
export default defineNuxtConfig {
  modules: ["@nuxt-class-inject",],
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
</script>
