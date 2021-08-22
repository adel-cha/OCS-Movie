<template>
  <div class="home">
    <div class="feature-card">
      <router-link to="/movie/tt0409591">
        <img src="../assets/images/cover.jpg" 
        alt="james bond" class="featured-img">
        <div class="detail">
          <h3>Invasion</h3>
          <p>
          Trois ans après le crash du vaisseaux alien à Moscou, Yulya a développé d'étranges pouvoirs et devient un cobaye pour le Ministère de la Défense. Enfermée dans un laboratoire secret, les scientifiques et les militaires décortiquent ses sentiments. 
          </p>
        </div>
      </router-link>
    </div>
    <Search :setMovies="setMovies"/>
    <div class="movies-list">  
      <MovieItem  v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import MovieItem from '../components/MovieItem.vue';
import Search from '../components/Search.vue';
export default {
  components: { MovieItem,Search },
  setup(){
    const movies= ref([]);

    const setMovies=(data)=>{
    movies.value=data;
    }

    return {
      setMovies,
      movies
    }
  }
}
</script>
<style lang="scss">
  .home{
    .feature-card{
      position: relative;

      .featured-img{
        display: block;
        width:100%;
        object-fit: cover;
        position: relative;
        z-index: 0;
      }
      .detail{
        position: absolute;
        left:0;
        right:0;
        bottom: 0;
        background-color: rgba(0,0,0,0.6) ;
        padding:16px;
        z-index:1;
        h3{
          color:#FFF;
          margin-bottom: 16px;
        }  
        p{
          color:#FFF;
        }
      }
    }

    .movies-list{
      display: flex;
      flex-wrap: wrap;
      margin: 0px 8px;
    }
  }
</style>