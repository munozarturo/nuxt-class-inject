<template>
  <div class="relative flex flex-col bg-background-secondary group">
    <div class="flex flex-row bg-foreground-secondary text-background py-1 px-2 justify-between">
      <p>{{ lang }}</p>
      <button @click="copy">{{ copyText }}</button>
    </div>
    <pre ref="codeBlock" class="p-2 overflow-x-auto">
        <code><slot></slot></code>
    </pre>
    <div
      v-if="file"
      class="absolute bottom-1 right-1 p-1 text-sm bg-background-secondary text-foreground-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-0 group-[.show-file]:opacity-100"
    >
      {{ file }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  lang: {
    type: String,
    required: false,
  },
  file: {
    type: String,
    required: false,
  },
});

const parentDiv = ref<HTMLElement | null>(null);

const showFile = () => {
  parentDiv.value?.classList.add("show-file");
};

const hideFile = () => {
  parentDiv.value?.classList.remove("show-file");
};

onMounted(() => {
  parentDiv.value = document.querySelector(".relative.flex.flex-col.bg-background-secondary");
  if (parentDiv.value) {
    parentDiv.value.addEventListener("mouseenter", hideFile);
    parentDiv.value.addEventListener("mouseleave", showFile);
  }
});

onUnmounted(() => {
  if (parentDiv.value) {
    parentDiv.value.removeEventListener("mouseenter", hideFile);
    parentDiv.value.removeEventListener("mouseleave", showFile);
  }
});

const copyText = ref<string>("copy");
const codeBlock = ref<HTMLPreElement | null>(null);

function copy(): void {
  if (codeBlock.value) {
    try {
      navigator.clipboard.writeText(codeBlock.value.textContent || "");
      copyText.value = "copied!";
      setTimeout(() => {
        copyText.value = "copy";
      }, 2000);
    } catch (e: any) {
      copyText.value = "error copying";
      setTimeout(() => {
        copyText.value = "copy";
      }, 2000);
    }
  } else {
    copyText.value = "nothing to copy";
    setTimeout(() => {
      copyText.value = "copy";
    }, 2000);
  }
}
</script>
