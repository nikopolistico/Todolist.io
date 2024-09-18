<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref({
  business: [],
  personal: []
});

const name = ref('')

const input_content = ref('')
const input_category = ref(null)

// Compute sorted todos by category
const todos_asc = computed(() => ({
  business: todos.value.business.sort((a, b) => a.createdAt - b.createdAt),
  personal: todos.value.personal.sort((a, b) => a.createdAt - b.createdAt)
}));

// Debounce function to limit how often a function is called
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

// Update localStorage with name
const updateName = debounce((newVal) => {
  localStorage.setItem('name', newVal);
}, 300); // Debounce delay in milliseconds

// Update localStorage with todos
const updateTodos = debounce((newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal));
}, 300); // Debounce delay in milliseconds

// Watch for changes in name and todos to update localStorage
watch(name, (newVal) => {
  updateName(newVal);
})

watch(todos, (newVal) => {
  updateTodos(newVal);
}, {
  deep: true
})

// Add a new todo to the selected category
const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return;
  }

  todos.value[input_category.value].push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime()
  });
  
  // Reset input fields
  input_content.value = '';
  input_category.value = null;
}

// Remove a todo from its category with confirmation
const removeTodo = (todo) => {
  if (confirm('Are you sure you want to remove this todo?')) {
    todos.value[todo.category] = todos.value[todo.category].filter((t) => t !== todo);
    // Update localStorage after removing a todo
    updateTodos(todos.value);
  }
}

// Toggle edit mode for a todo
const toggleEdit = (todo) => {
  todo.editable = !todo.editable
}

// Update a todo after editing
const updateTodo = (todo) => {
  todo.editable = false
}

// Load name and todos from localStorage on mounted
onMounted(() => {
  name.value = localStorage.getItem('name') || '';
  
  try {
    todos.value = JSON.parse(localStorage.getItem('todos')) || { business: [], personal: [] };
  } catch (error) {
    console.error('Failed to parse todos from localStorage:', error);
    todos.value = { business: [], personal: [] };
  }
})
</script>


<template>
<v-container style="border: 2px solid purple; padding: 20px; box-shadow: 10px 10px 10px; background-color: azure;" rounded>
  <v-card-title class="text-h3"><span class="mdi mdi-playlist-edit"></span>TODO-LIST</v-card-title>
    <v-row class="mb-4">
      <v-col cols="12">
        <v-text-field 
          label="What's your name?" 
          v-model="name" 
          filled 
          placeholder="Name here"
          class="greeting title"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="12" md="6">
        <v-card class="pa-4 create-todo" style="border: 2px solid purple;">
          <h3 class="mb-3">CREATE A TODO</h3>
          <v-form @submit.prevent="addTodo">
            <v-text-field 
              id="input"
              v-model="input_content" 
              label="What's on your todo list?" 
              placeholder="e.g. make a video"
              filled
              class="create-todo-input"
              required
            ></v-text-field>

            <v-radio-group v-model="input_category" row>
              <v-radio label="Business" value="business"></v-radio>
              <v-radio label="Personal" value="personal"></v-radio>
            </v-radio-group>

            <v-btn type="submit" style="background-color: blueviolet; color: aliceblue;">Add todo</v-btn>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4 todo-list" style="border: 2px solid sandybrown;">
          <h3 class="mb-3">TODO LIST</h3>

          <!-- Business Todos -->
          <v-card class="mb-4">
            <v-card-title>Business Todos</v-card-title>
            <v-list>
              <v-list-item 
                v-for="todo in todos_asc.business" 
                :key="todo.createdAt" 
                class="todo-item"
                :class="{ 'done': todo.done }"
              >
                <v-list-item-content class="todo-content">
                  <v-checkbox 
                    v-model="todo.done" 
                    class="mr-4"
                    :label="todo.content"
                    v-if="!todo.editable"
                  ></v-checkbox>
                  <v-text-field 
                    v-if="todo.editable" 
                    v-model="todo.content" 
                    class="mr-4"
                  ></v-text-field>
                </v-list-item-content>

                <v-list-item-action class="actions">
                  <v-btn icon @click="toggleEdit(todo)" v-if="!todo.editable">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="updateTodo(todo)" v-if="todo.editable">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn icon @click="removeTodo(todo)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- Personal Todos -->
          <v-card>
            <v-card-title>Personal Todos</v-card-title>
            <v-list>
              <v-list-item 
                v-for="todo in todos_asc.personal" 
                :key="todo.createdAt" 
                class="todo-item"
                :class="{ 'done': todo.done }"
              >
                <v-list-item-content 
                :class="{ 'todo-content': true, 'completed': todo.done }"
                class="todo-content">
                  <v-checkbox 
                    v-model="todo.done" 
                    class="mr-4"
                    :label="todo.content"
                    v-if="!todo.editable"
                  ></v-checkbox>
                  <v-text-field 
                    v-if="todo.editable" 
                    v-model="todo.content" 
                    class="mr-4"
                  ></v-text-field>
                </v-list-item-content>

                <v-list-item-action class="actions">
                  <v-btn icon @click="toggleEdit(todo)" v-if="!todo.editable">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="updateTodo(todo)" v-if="todo.editable">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn icon @click="removeTodo(todo)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.todo-content{
  text-decoration: none;
}

.completed {
  text-decoration: line-through;
  color: gray; /* Optional: Change color to indicate completed status */
}
</style>
