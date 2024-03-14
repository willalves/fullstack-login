<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ""
  },
  inputClass: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label">
      <span class="text-gray-500 text-sm">{{ label }}</span>
    </label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :class="inputClass"
    />
  </div>
</template>
