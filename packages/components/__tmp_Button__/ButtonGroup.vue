<template>
  <div class="er-button-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { ButtonGroupProps } from "./types";
import { provide, reactive, toRef } from "vue";
import { BUTTON_GROUP_CONTEXT_KEY } from "./constant";

defineOptions({
  name: "ErButtonGroup",
});

const props = defineProps<ButtonGroupProps>();

provide(
  BUTTON_GROUP_CONTEXT_KEY,
  reactive({
    size: toRef(props, "size"),
    type: toRef(props, "type"),
    disabled: toRef(props, "disabled"),
  }),
);
</script>

<style scoped>
@import "./style.css";
</style>
