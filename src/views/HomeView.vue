<template>
  <div>

    <div class="new-task-form">
      <TaskForm @onformSubmited="addTaskHandler" />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>


    <TaskList :tasks="tasks" :loading="loading" :filter="filter"
      @onDeleteClicked="deleteTaskClickHandler"
      @onFavClicked="favClickHander"
    />

    <button @click="resetStore">reset the data</button>
  </div>
</template>

<script setup lang="ts">
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';

import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import type ITask from '@/types/ITask';
import { watch } from 'vue';

const taskStore = useTaskStore();
const { loading } = storeToRefs(taskStore);
taskStore.getTasks();

const tasks = ref([] as ITask[]);
tasks.value = taskStore.tasks;

const filter = ref("all");

const deleteTaskClickHandler = (id: string) => {
  taskStore.deleteTask(id);
  updateTask();
}

const favClickHander = (id: string) => {
  taskStore.favTask(id);
  updateTask();
}

const addTaskHandler = (newTask: string) => {
  const task: ITask = {
    id: Math.floor(Math.random() * 1000000).toString(),
    title: newTask,
    isFav: false
  }

  taskStore.addTask(task);
  
  updateTask();
  filter.value = "all"
}

watch(filter, () => {
  switch (filter.value) {
    case "favs":
      tasks.value = taskStore.favs;
      break;
  
    default:
      tasks.value = taskStore.tasks;
      break;
  }
})

const resetStore = () => {
  taskStore.getTasks();
  tasks.value = taskStore.tasks;
  filter.value = "all"
}

const updateTask = () => {
  tasks.value = taskStore.tasks;
}

</script>
