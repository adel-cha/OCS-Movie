<template>
  <div class="home">
    <div ref="header">
    <Search :setMovies="setMovies" />
    </div>
    
    <MovieSlide />
    <div class="movies-list" ref="moviesBloc">  
      <MovieItem  v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import MovieItem from '../components/MovieItem.vue';
import Search from '../components/Search.vue';
import MovieSlide from '../components/MovieSlide.vue';
export default {
  components: { MovieItem,Search,MovieSlide},
  setup(){
    const movies= ref([]);
    const header=ref(null);
    const moviesBloc = ref(null);
    const setMovies=(data)=>{
      movies.value=data;
    }

    const stickHeader=()=>{
      if(header.value){
        const sticky = header.value.offsetTop;
        if (window.pageYOffset > sticky) {
          header.value.classList.add("sticky");
        } else {
          header.value.classList.remove("sticky");
        }
      }
   
    }
     window.onscroll = function() {stickHeader()};
    return {
      setMovies,
      moviesBloc,
      header,
      movies
    }
  },

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
        bottom: 0;
        width: 100%;
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
    .sticky {
      position: fixed;
      top: 0;
      left: 0;
      background-color: #35495e;
      width: 100%;
      z-index: 1;
    }

  }

</style>