<template>
  <div>
    <form @submit.prevent="onFormSubmited">
    <input 
      type="text" 
      placeholder="I need to..."
      v-model="newTask"
    >
    <button>Add</button>
  </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newTask = ref("")

const emit = defineEmits(["onformSubmited"])

const onFormSubmited = () => {
  emit("onformSubmited", newTask.value);
  newTask.value = "";
}

</script>
