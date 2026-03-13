<template>
  <div class="er-collapse-item" :class="{ 'is-disabled': disabled }">
    <div
      class="er-collapse-item__header"
      @click="handleClick"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
    >
      <span class="er-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <er-icon icon="angle-right" class="header-angle"></er-icon>
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="er-collapse-item__wrapper" v-show="isActive">
        <div class="er-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { type CollapseItemProps } from "./types";
import { inject, computed } from "vue";
import { COLLAPSE_CTX_KEY } from "./constant";
import ErIcon from "../Icon/Icon.vue";
import transitionEvents from "./transitionEvents";

defineOptions({
  name: "ErCollapseItem",
});

const props = defineProps<CollapseItemProps>();

const collapseCtx = inject(COLLAPSE_CTX_KEY);
const isActive = computed(() => {
  return collapseCtx?.activeNames.value.includes(props.name);
});

function handleClick() {
  if (props.disabled) return;
  collapseCtx?.handleItemClick(props.name);
}
</script>

<style scoped>
@import "./style.css";
</style>
