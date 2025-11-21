<template>
  <v-text-field
    :type="type"
    :placeholder="placeholder"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    variant="outlined"
    density="comfortable"
    hide-details="auto"
    class="w-full"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
