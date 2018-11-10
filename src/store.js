import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    currentTodoId: null
  },
  mutations: {
    async loadTodos(state) {
      const response = await axios.get("http://localhost:3000/users");
      state.todos = response.data;
    },
    createTodo(state, text, price) {
      const todo = {
        text,
        price
      };
      todo.id = state.todos.length + 1;
      state.todos.push(todo);
      axios.post("http://localhost:3000/users", todo);

      //отправка на бэк
    },
    updateTodo(state, todo) {
      state.todos.map(oldTodo => {
        if (oldTodo.id === todo.id) {
          return todo;
        }
        return oldTodo;
      });
      axios.put(`http://localhost:3000/users/${todo.id}`, todo);
    },
    deleteTodo(state, todo) {
      state.todos.splice([todo.id - 1], 1);
      axios.delete(`http://localhost:3000/users/${todo.id}`, todo);

      // отправка на бэк
    }
  },
  actions: {
    createTodo(context, todo) {
      context.commit("createTodo", todo);
    },
    deleteTodo(context, todo) {
      context.commit("deleteTodo", todo);
    },
    updateTodo(context, todo) {
      context.commit("updateTodo", todo);
    },
    loadTodos(context) {
      context.commit("loadTodos");
    }
  }
});
