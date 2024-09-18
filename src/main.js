import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
  // Update local storage after removing a todo
  localStorage.setItem('todos', JSON.stringify(todos.value));
}

// Function to toggle editing mode
const toggleEdit = (todo) => {
  todo.editable = !todo.editable;
}

// Function to update a todo item
const updateTodo = (todo) => {
  todo.editable = false;
  // Update local storage after editing a todo
  localStorage.setItem('todos', JSON.stringify(todos.value));
}
