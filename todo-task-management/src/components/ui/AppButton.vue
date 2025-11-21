<template>
  <v-btn
   type="button"
    :color="color"
    :disabled="disabled"
    @click="handleClick"
    class="text-sm"
    rounded="lg"
    elevation="0"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  variant: {
    type: String,
    default: "primary", // primary | secondary | danger
  },
  disabled: Boolean,
});

const emit = defineEmits(["click"]);

// Map variants to Vuetify colors
const color = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "grey";
    case "danger":
      return "red-darken-1";
    default:
      return "primary";
  }
});

function handleClick(e: Event) {
  e.preventDefault();  // prevents submit
  e.stopPropagation();
  // emit click to parent
  // @ts-ignore
  emit('click');
}
</script>
