<template>
<div class="home">
  <section class="comment-gallery">
    <div class="comment" v-for="item in items" :key="item.id">
      <h2>{{item.name}}</h2>
      
      <p>{{item.comment}}</p>
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
      items:[],
    }
  },
  created(){
    this.getItems();
  },
  methods:{
    async getItems(){
      try{
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch(error){
        console.log(error);
      }
    }
  },
}
</script>
