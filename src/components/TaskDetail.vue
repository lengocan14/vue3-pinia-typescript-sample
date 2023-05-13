<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i 
        class="material-icons" 
        @click.prevent="$emit('onDeleteClicked', task.id)"
        >
        delete
      </i>
      <i 
        class="material-icons"
        :class="{active: task.isFav}" 
        @click.prevent="$emit('onFavClicked', task.id)" >
        favorite
      </i>
    </div>
  </div>
</template>

<script setup lang="ts">
import type ITask from '@/types/ITask';
import type { PropType } from 'vue';


const props = defineProps({
  task: {
    type: Object as PropType<ITask>,
    required: true
  }
})

</script>
