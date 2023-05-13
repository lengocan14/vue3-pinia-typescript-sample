import { defineStore } from "pinia";
import { ref } from "vue";
import type ITask from "@/types/ITask";
import { computed } from "vue";

export const useTaskStore = defineStore("task", () => {

  const tasks = ref([] as ITask[])
  const loading = ref(true)

  function getTasks() {
    loading.value = true;

    let dt: ITask[] = [
      {
        "id": "1",
        "title": "play gloomhaven",
        "isFav": false
      },
      {
        "id": "2",
        "title": "mow the lawn",
        "isFav": true
      },
      {
        "title": "become an eldern lord",
        "isFav": true,
        "id": "3"
      },
      {
        "title": "eat some pinapples",
        "isFav": false,
        "id": "4"
      },
      {
        "title": "have a pooooo",
        "isFav": true,
        "id": "562070"
      }
    ]
    tasks.value = dt
    loading.value = false;
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function favTask(id: string) {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return;
    task.isFav = !task.isFav;
  }

  async function addTask(newTask: ITask) {
    loading.value = true;
    
    // Making loading effect
    await sleep();

    tasks.value.push(newTask)
    loading.value = false;
  }

  const favs = computed(() => tasks.value.filter(t => t.isFav))

  const sleep = () => new Promise(r => setTimeout(r, 200));

  return { tasks, loading, favs, getTasks, deleteTask, favTask, addTask}
}) 
