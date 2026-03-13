<template>
  <div class="er-collapse">
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from "./types";
import { provide, ref, watch, watchEffect } from "vue";
import { COLLAPSE_CTX_KEY } from "./constant";
import { debugWarn } from "@toy-elementhh/utils";

const COMP_NAME = "ErCollapse" as const;
defineOptions({
  name: COMP_NAME,
});

const props = defineProps<CollapseProps>();
const emit = defineEmits<CollapseEmits>();

const activeNames = ref(props.modelValue);

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, "accordion mode should only have one active item");
  }
});

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value];
  if (props.accordion) {
    _activeNames = _activeNames[0] === item ? [] : [item];
    updateActiveNames(_activeNames);
    return;
  }

  const index = _activeNames.indexOf(item);
  if (index > -1) {
    _activeNames.splice(index, 1);
  } else {
    _activeNames.push(item);
  }
  updateActiveNames(_activeNames);
}

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames;
  emit("update:modelValue", newNames);
  emit("change", newNames);
}

watch(
  () => props.modelValue,
  (newVal) => {
    updateActiveNames(newVal);
  },
);

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<style scoped>
@import "./style.css";
</style>
