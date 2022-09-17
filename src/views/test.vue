	
<template>
  <div class="add">
    <input
      type="text"
      class="add__input"
      placeholder="Enter your task here"
      v-model="user"
      v-on:keyup.enter="addTodoItem"
      @click="addtodoItem"
    />
    <button class="add__button" v-on:click="addTodoItem">
      <span class="blind">Add</span>
    </button>
        <button v-on:click="addTodoItem">dd</button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      user1: JSON.parse(localStorage.getItem("user")) || "",
    };
  },
  methods: {
    addTodoItem() {
      if (this.user !== "") {
        console.log("-----");
        var value = {
          name: this.user,
          date: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
          completed: false
        };
        localStorage.setItem('user', JSON.stringify(value));
        this.clearInput();
      }
    },
    clearInput() {
      console.log("-----222");
      this.user = "";
    },
    getPost() {
       let userInformation = JSON.parse(localStorage.getItem("userInformation"));
    }
  }
}
</script>


