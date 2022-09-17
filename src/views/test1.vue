<!-- App.vue -->
<template>
  <div id="app">
  <div class="add">
    <input
      type="text"
      class="add__input"
      placeholder="Enter your task here"
      v-model="user"
      v-on:keyup.enter="addTodoItem"
    />
    <button class="add__button" v-on:click="addTodoItem">
      <span class="blind">Add</span>
    </button>
  </div>
  </div>
</template>
 
<script>
 
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    addOneItem(todoItem) {
      // 빈 내용인 경우
      if (todoItem === "") {
        this.showModal = !this.showModal;
        this.modalText = "The form is empty. Please enter your task.";
        return false;
      }
      // 중복되는 내용인 경우
      for (let i = 0; i < this.todoItems.length; i++) {
        if (this.todoItems[i].item === todoItem) {
          this.showModal = !this.showModal;
          this.modalText = "I think you've already had the task.";
          return false;
        }
      }
      // 저장할 정보
      var value = {
        item: todoItem,
        date: `${getDate().date} ${getDate().week}`,
        time: getDate().time,
        completed: false
      };
      localStorage.setItem(todoItem, JSON.stringify(value));
      this.todoItems.push(value);
    },
    //...
  },
  components: {
    Modal
  }
}
</script>