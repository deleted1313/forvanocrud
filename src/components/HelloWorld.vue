<template>
  <div>
    <input v-model="todoText">
    <button @click="createTodos">
      Create todo
    </button>
    <div v-for="todo in todos">
      {{todo.text}} {{todo.price}} <span @click="deleteTodo(todo)">x</span> <span @click="startUpdateTodo(todo)">+</span>
      <input v-if="currentTodoId === todo.id" v-model="newTodoText">
      <input v-if="currentTodoId === todo.id" v-model="newTodoPrice">
      <button v-if="currentTodoId === todo.id" @click="updateTodo(todo)">Update Todo</button>
      <span v-if="currentTodoId === todo.id" @click="clearForm">закрыть ебаный инпут</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function() {
    return {
      todoText: "",
      currentTodoId: null,
      newTodoText: "",
      newTodoPrice: ""
    };
  },
  created() {
    this.$store.dispatch("loadTodos");
  },
  methods: {
    createTodos() {
      this.$store.dispatch("createTodo", this.todoText);
    },
    deleteTodo(todo) {
      this.$store.commit("deleteTodo", todo);
    },
    startUpdateTodo(todo) {
      console.log(todo.text);
      this.newTodoPrice = todo.price;
      this.newTodoText = todo.text;
      this.$store.currentTodoId = todo.id;
      this.currentTodoId = todo.id;
    },
    updateTodo(todo) {
      todo.text = this.newTodoText;
      todo.price = this.newTodoPrice;
      this.$store.commit("updateTodo", todo);
    },
    clearForm() {
      this.currentTodoId = null;
      this.newTodoText = "";
      this.newTodoPrice = "";
    }

  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->