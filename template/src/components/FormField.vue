<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  autocomplete: String,
  required: Boolean,
  error: String,
  hint: String
})
const emits = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})
</script>

<template>
  <div class="form-field">
    <label v-if="label" class="form-field__label">
      {{ label }}
    </label>
    <input
      class="form-field__input"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :aria-invalid="Boolean(error)"
      @input="inputValue = $event.target.value"
    />
    <p v-if="hint && !error" class="form-field__hint">{{ hint }}</p>
    <p v-if="error" class="form-field__error">{{ error }}</p>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field__label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
}

.form-field__input {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.95rem;
  line-height: 1.4;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-field__input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.12);
}

.form-field__hint {
  font-size: 0.8rem;
  color: #64748b;
}

.form-field__error {
  font-size: 0.8rem;
  color: #dc2626;
}
</style>
