<template>
  <v-text-field
    :label="placeholder"
    :type="type"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :rules="computedRules"
    variant="outlined"
    density="comfortable"
    clearable
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  type: { type: String, default: "text" },
  placeholder: String,
  required: { type: Boolean, default: false },
  rules: { type: Array as () => ((v: any) => true | string)[], default: () => [] }
});

const computedRules = computed(() => {
  const r = [...props.rules];

  if (props.required) {
    r.unshift((v: string) => !!v || "This field is required");
  }

  return r;
});
</script>
