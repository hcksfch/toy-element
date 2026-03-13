<template>
  <component
    :is="tag"
    class="er-button"
    ref="_ref"
    :type="tag === 'button' ? nativeType : undefined"
    :disabled="disabled || loading"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-loading': loading,
      'is-disabled': disabled,
    }"
    :autofocus="autofocus"
    @click="
      (e: MouseEvent) =>
        useThrottle ? handleBtnClickThrottled(e) : handleBtnClick(e)
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <er-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <er-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    ></er-icon>
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * Button.vue
 * Button.test.tsx
 * types.ts
 * style.css
 * constants.ts
 */
import { ref, computed, inject } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { throttle } from "lodash-es";
import ErIcon from "../Icon/Icon.vue";
import { BUTTON_GROUP_CONTEXT_KEY } from "./constant";

defineOptions({
  name: "ErButton",
});
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 500,
});
const emits = defineEmits<ButtonEmits>();

const slots = defineSlots();
const ctx = inject(BUTTON_GROUP_CONTEXT_KEY, null);
const _ref = ref<HTMLButtonElement>();

const size = computed(() => ctx?.size ?? props.size ?? "");
const type = computed(() => ctx?.type ?? props.type ?? "");
const disabled = computed(() => ctx?.disabled || props.disabled || false);
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0",
}));

const handleBtnClick = (event: MouseEvent) => emits("click", event);

const handleBtnClickThrottled = throttle(
  handleBtnClick,
  props.throttleDuration,
  { trailing: false },
);

defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type,
});
</script>

<style scoped>
@import "./style.css";
</style>
