<template>
  <div class="feature-card">
      <VueAgile :speed="500" :autoplay="true" :autoplaySpeed="5000" >
        <template v-slot:prevButton><fa icon="chevron-left" /></template>
        <template v-slot:nextButton><fa icon="chevron-right" /></template>
        <router-link  v-for="slide in slides" :key="slide.id" :to="'/movie/'+slide.id">
            <img :src="getImgUrl(slide.image)" 
            :alt="slide.title" class="featured-img">
            <div class="detail">
            <h3>{{slide.title}}</h3>
            <p>
            {{slide.description}}
            </p>
            </div>
        </router-link>
      </VueAgile>
    </div>
</template>

<script >
import { VueAgile } from 'vue-agile'
export default {
  components: {VueAgile},
  data(){
      return{
            slides:[
                {
                    id:"tt0409591",
                    title:'Invasion',
                    description:"Trois ans après le crash du vaisseaux alien à Moscou, Yulya a développé d'étranges pouvoirs et devient un cobaye pour le Ministère de la Défense. Enfermée dans un laboratoire secret, les scientifiques et les militaires décortiquent ses sentiments.", 
                    image:"cover.jpg"
                },
                 {
                    id:"tt0409592",
                    title:'Film club',
                    description:"Trois ans après le crash du vaisseaux alien à Moscou, Yulya a développé d'étranges pouvoirs et devient un cobaye pour le Ministère de la Défense. Enfermée dans un laboratoire secret, les scientifiques et les militaires décortiquent ses sentiments.", 
                    image:"cover2.jpg"
                },
                {
                    id:"tt0409593",
                    title:'The swordsman Code',
                    description:"Trois ans après le crash du vaisseaux alien à Moscou, Yulya a développé d'étranges pouvoirs et devient un cobaye pour le Ministère de la Défense. Enfermée dans un laboratoire secret, les scientifiques et les militaires décortiquent ses sentiments.", 
                    image:"cover3.jpg"
                },
                {
                    id:"tt0409594",
                    title:'The dark element',
                    description:"Trois ans après le crash du vaisseaux alien à Moscou, Yulya a développé d'étranges pouvoirs et devient un cobaye pour le Ministère de la Défense. Enfermée dans un laboratoire secret, les scientifiques et les militaires décortiquent ses sentiments.", 
                    image:"cover4.jpg"
                },
            ]
        }
  },
  methods:{
    getImgUrl(pic) {
        return require('../assets/images/'+pic)
    }
  }
}
</script>

<style lang="scss">
    .agile {
        width: 100%;
    }
    .agile__actions {
        margin-top: 20px;
    }
    .agile__nav-button {
        background: transparent;
        position: relative;
        bottom:25VW;
        padding: 0px 10px;
        border: none;
        color: #ccc;
        cursor: pointer;
        font-size: 25px;
        transition-duration: 0.3s;
    }
    .agile__nav-button:hover {
        color: #888;
    }
    .agile__dot {
        margin: 0 10px;
    }
    .agile__dot button {
        background-color:#ff9800;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: block;
        height: 10px;
        font-size: 0;
        line-height: 0;
        margin: 0;
        padding: 0;
        transition-duration: 0.3s;
        width: 10px;
    }
    .agile__dot--current button, .agile__dot:hover button {
        background-color: #888;
    }
</style>