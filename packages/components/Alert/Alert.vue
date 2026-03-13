<template>
  <transition name="er-alert-fade">
    <div
      v-show="visible"
      class="er-alert"
      :class="{
        [`er-alert__${type}`]: type,
        [`er-alert__${effect}`]: effect,
        'text-center': center,
      }"
      role="alert"
    >
      <er-icon
        v-if="showIcon"
        class="er-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      >
      </er-icon>
      <div class="er-alert__content">
        <span
          class="er-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>

        <p class="er-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="er-alert__close" v-if="closable">
          <er-icon icon="xmark" @click.stop="close"></er-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from "./types";
import { ref, computed } from "vue";
import { typeIconMap } from "@toy-elementhh/utils";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  closable: true,
  effect: "light",
});

const emit = defineEmits<AlertEmits>();
const slots = defineSlots();

const visible = ref(true);
const withDescription = computed(() => props.description || slots.default);
const iconName = computed(() => {
  return typeIconMap.get(props.type) ?? "circle-info";
});

function close() {
  visible.value = false;
  emit("close");
}

function open() {
  visible.value = true;
}

defineExpose<AlertInstance>({
  open,
  close,
});
</script>

<style scoped>
@import "./style.css";
</style>
