<template>
  <div>
    <!-- loading -->
    <div class="loading" v-if="loading">Loading tasks...</div>

    <!-- task list -->
    <div class="task-list">
      <p v-if="filter === 'favs'">You have {{ tasks.length }} tasks in your favs </p>
      <p v-else>You have total {{ tasks.length }} tasks</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetail :task="task" 
          @onDeleteClicked="onDeleteClicked" 
          @onFavClicked="onFavClicked"
          />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type ITask from '@/types/ITask';
import type { PropType } from 'vue';
import TaskDetail from './TaskDetail.vue';

const props = defineProps({
  tasks: {
    type: Array as PropType<ITask[]>,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  },
  filter : {
    type: String,
    default: "all"
  }
})

const emit = defineEmits(["onDeleteClicked", "onFavClicked"])

const onDeleteClicked = (id: string) => {
  emit("onDeleteClicked", id);
}

const onFavClicked = (id: string) => {
  emit("onFavClicked", id);
}

</script>
