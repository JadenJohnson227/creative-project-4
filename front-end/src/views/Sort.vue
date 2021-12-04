<template>
  <div class="sort">
    <h1>Sort Page</h1>

    <div class="sort1">
      <div class="form">
        <label>Select Sort: </label>
        <select id="selectSort" >
          <option value="likes">Likes</option>
          <option value="dislikes">Dislikes</option>
        </select>
        <button @click="sort">Sort</button>
      </div>

    </div>


    <h2>Your Feed</h2>
    <div class="sort" v-for="item in sortedItems.slice()" :key="item.id">
      <div class="content">
        <h3>{{item.comment}}</h3>
        <p><em>-{{item.name}}</em></p>
      </div>
      <div class="like-buttons">
        <button @click="like(item)">Like {{item.likes}}</button>
        <button @click="dislike(item)">Dislike {{item.dislikes}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Sort',

  data() {
    return {
      name: "",
      comment:"",
      items: [],
      sortedItems: [],
    }
  },
  created() {
    this.getItems();
  },

  methods: {


    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async sort() {
      try{
        let e = document.getElementById("selectSort");
        let sortValue = e.value;
        this.getItems();
        if(sortValue=="likes"){
          this.items.sort(function(a,b){return b.likes-a.likes});
          this.sortedItems = this.items;
        }else{
          this.items.sort(function(a,b){return a.dislikes-b.dislikes});
          this.sortedItems = this.items;
        }
      } catch(error) {
        console.log(error);
      }
    }
  }


}
</script>

<style scoped>


.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}



/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

</style>
