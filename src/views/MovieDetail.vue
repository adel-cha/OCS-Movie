<template>
    <div class="movie-detail">
        <router-link to="/" class="back-link">
            <fa icon="arrow-circle-left" />
        </router-link>
        <div class="description-item" >
            <h2>{{movie.title[0].value}}</h2>
           
        </div>
        <div class="player-item">
            <div v-show="!showPlayer" class="imagePlayer"  >
                <img  :src="'https://statics.ocs.fr'+movie.fullscreenimageurl" alt="Movie Poster" width="800" >
                <fa  icon="play-circle" @click="togglePlay" />
            </div>
            <VideoPlayer
                v-if="showPlayer"
                :license-server="licenseServer"
                :manifest-url="manifestUrl"
                :poster-url="posterUrl"
            />
        </div>
         <div class="description-item" >
         <p>{{movie.summary}}</p>
          </div>
    </div>
</template>

<script>
import {ref, onBeforeMount} from "vue" ;
import {useRoute} from 'vue-router';
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
    components: { VideoPlayer },
    data(){
        return{
            showPlayer:false,
            licenseServer: 'https://widevine-proxy.appspot.com/proxy',
            manifestUrl:
                'https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd',
            posterUrl:
                'https://upload.wikimedia.org/wikipedia/commons/a/a7/Big_Buck_Bunny_thumbnail_vlc.png'
        }
    },
    methods:{
        togglePlay(){
            this.showPlayer=!this.showPlayer;
        }
    },
    setup(){
    const movie= ref({});
    const route =useRoute();

    onBeforeMount(()=>{
        fetch(`https://api.ocs.fr/apps/v2/details/${route.params.type}/${route.params.id}`)
        .then(response =>response.json())
            .then(data=>{
                movie.value= data.contents;
            });
    })
    return{
        movie
    }
    }
}
</script>

<style lang="scss">

.movie-detail{
    padding:16px;
    .back-link{
        font-size: 25px;
        color: #ff9800;
        float: left;
        margin-right: 5px;
    }
    .player-item{
        padding:16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h2{
        color:#FFF;
        font-size:28px;
        font-weight:600;
        margin-bottom: 16px;
    }
    .featured-img{
        display:block;
        max-width:100%;
        margin-bottom:16px;
    }
    p{
        color: #FFF;
        font-size:18px;
        line-height:1.4;
    }
}
.imagePlayer{
    svg{
        font-size: 100px;
        position: relative;
        bottom: 200px;
        opacity: 0.9;
        cursor: pointer;
        color: #ff9800;
        right: 50%;
    }
    svg:hover{
        border-radius: 50%;
        box-shadow: 0px 5px 19px 12px rgba(255, 255, 255,0.5);
        padding: 0px;
        margin: 0;
        opacity: 1 !important;
    }
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.max-w-full {
  max-width: 100%;
}
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
</style>