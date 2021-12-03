<template>
<div class="home">
  <section class="feed">
    <h2>Write a Tweet...</h2>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
        <p></p>
        <textarea v-model="comment" placeholder="Comment"></textarea>
        <p></p>
        <button @click="upload">Upload</button>
      </div>
    </div>
    <h2>Your Feed</h2>
    <div class="post" v-for="item in items.slice().reverse()" :key="item.id">
      <div class="content">
        <h3>{{item.comment}}</h3>
        <p><em>-{{item.name}}</em></p>
      </div>
      <div class="like-button" v-if="!item.liked">
        <button @click="like(item)">Like</button>
      </div>
      <div class="like-button" v-else>
        <button @click="like(item)">Unlike</button>
      </div>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data(){
    return{
      name: "",
      comment:"",
      items: [],
      findName: "",
      findItem: null,
    }
  },
  created() {
    this.getItems();
  },
  /*computed: {
    posts() {
      return this.items;
    }
  },*/
  methods: {
    async getItems() {
      try{
        let response = await axios.get("/api/items");
        console.log(response);
        this.items = response.data;
        return true;
      } catch(error){
        console.log(error);
      }
    },
    async upload() {
      try {
        await axios.post('/api/items', {
          name: this.name,
          comment: this.comment,
          liked: false
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async like(item) {
      console.log(item._id);
      try {
        await axios.put("/api/items/like/" + item._id)
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
  .post {
    width: 40%;
    margin: 20px auto;
    border: 2px solid blue;
    border-radius: 15px;
  }

  .like-button {
    margin-bottom: 20px;
  }

  .content {
    margin: auto;
  }

</style>
