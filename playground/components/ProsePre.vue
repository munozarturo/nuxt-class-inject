<template>
  <div class="relative flex flex-col bg-background-secondary group">
    <div class="flex flex-row bg-foreground-secondary text-background py-1 px-2 justify-between">
      <p>{{ lang }}</p>
      <p>{{ file }}</p>
    </div>
    <pre ref="codeBlock" class="p-2 overflow-x-auto">
        <code><slot></slot></code>
    </pre>
    <button
      @click="copy"
      class="absolute bottom-2 right-2 p-1 text-sm bg-foreground text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-[.show-file-multi]:opacity-100"
    >
      {{ copyText }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
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
