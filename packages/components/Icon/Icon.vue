<template>
  <i
    class="er-icon"
    :class="{ [`er-icon--${props.type}`]: props.type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";
import { computed } from "vue";

defineOptions({
  name: "ErIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();
const filterProps = computed(() => omit(props, ["type", "color"]));

const customStyles = computed(() => {
  if (props.color) {
    return {
      color: props.color,
    };
  }
  return {};
});
</script>

<style scoped>
@import "./style.css";
</style>
