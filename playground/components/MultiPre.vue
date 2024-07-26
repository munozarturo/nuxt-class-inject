<template>
  <div class="relative flex flex-col bg-background-secondary">
    <div class="flex flex-row justify-between bg-foreground-secondary">
      <div class="flex">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'cursor-pointer transition-colors duration-200 py-1 px-2 text-background',
            activeTab === tab
              ? 'bg-background-secondary text-foreground'
              : 'hover:bg-background-secondary hover:text-foreground',
          ]"
        >
          {{ tab }}
        </button>
      </div>
      <button @click="copy" class="py-1 px-2 text-background">
        {{ copyText }}
      </button>
    </div>
    <pre ref="codeBlock" class="p-2 whitespace-pre-wrap overflow-x-auto bg-background-secondary">
      {{ activeContent }}
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
import { ref, computed } from "vue";

const props = defineProps<{
  tabs: string[];
  contents: Record<string, string>;
  file?: string;
}>();

const activeTab = ref(props.tabs[0]);
const activeContent = computed(() => props.contents[activeTab.value] || "");

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
