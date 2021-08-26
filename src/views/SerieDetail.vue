<template>
    <div class="movie-detail">
        <router-link to="/" class="back-link">
            <fa icon="arrow-circle-left" />
        </router-link>
        <div class="description-item" >
            <h2 v-if="serie">{{serieTitle}}</h2>
        </div>
        <vue-collapsible-panel-group accordion v-if="serie">
            <vue-collapsible-panel class="collapsePanel" v-for="season in serie.seasons" :key="season.id" :expanded="false">
                <template #title >
                    <div class="Title-box">
                        <div class="Title-img-box">
                            <img :src="'https://statics.ocs.fr'+season.imageurl" :alt="season.subtitle">
                        </div>
                        <div class="Title-text-box">
                            <h3 >{{season.menutitle[0].value}}</h3>
                            <h4>{{season.subtitle}}</h4>
                            <p>{{season.pitch}}</p>
                        </div>
                    </div>
                </template>
                <template #content>
                      <div class="episode-list-box">
                        <div class="episode-box"  v-for="episode in season.episodes" :key="episode.id" @click="showModal(episode)">
                            <div class="episode-img-box">
                                <img :src="'https://statics.ocs.fr'+episode.imageurl" :alt="episode.subtitle">
                                 <fa  icon="play-circle" class="episode-play" />
                            </div>
                            <div class="episode-text-box">
                                <h4>{{"Episode "+episode.menutitlefocus[0].value}}</h4>
                                <p>{{episode.pitch}}</p>
                            </div>
                            <div class="episode-rating-box">
                                <Rating :grade="episode.parentalrating" :maxStars="5" :hasCounter="true" />
                            </div>
                         </div>
                    </div>
                </template>
            </vue-collapsible-panel>
        </vue-collapsible-panel-group>
        <Modal
            v-if="isModalVisible"
            @close="closeModal"
        >
         <template v-slot:header>
            <h3 v-if="serie && selectedEpisode">{{ serie.title[0].value +" - Episode "+selectedEpisode.menutitlefocus[0].value}}</h3>
        </template>
        <template v-slot:body>
            <VideoPlayer
                :license-server="licenseServer"
                :manifest-url="manifestUrl"
                :poster-url="'https://statics.ocs.fr'+selectedEpisode.fullscreenimageurl"
            />
        </template>
         </Modal>
    </div>
  
</template>

<script>
import {ref, onBeforeMount} from "vue" ;
import {useRoute} from 'vue-router';
import Modal from '../components/Modal.vue'
import Rating from '../components/Rating.vue'
import {getMovieDetails} from '@/api'
import VideoPlayer from '@/components/VideoPlayer.vue';
import '../style/collapsible.css'
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
export default {
    components: { VueCollapsiblePanelGroup, VueCollapsiblePanel,Rating,Modal,VideoPlayer},
    data() {
      return {
        isModalVisible: false,
        selectedEpisode:null,
        licenseServer: 'https://widevine-proxy.appspot.com/proxy',
            manifestUrl:
                'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
            posterUrl:
                'https://upload.wikimedia.org/wikipedia/commons/a/a7/Big_Buck_Bunny_thumbnail_vlc.png'
      };
    },
    methods: {
      showModal(episode) {
         this.selectedEpisode=episode;
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    },
    setup(){
        const serie= ref({});
        const serieTitle=ref(null);
        const route =useRoute();
           onBeforeMount(async()=>{
               try{
                    const data = await getMovieDetails(route.params.type,route.params.id);
                    serie.value= data.contents;
                    if(data.contents.title){
                        serieTitle.value= data.contents.title[0].value
                    }
                   
                  }catch(err){
                    console.log(err);
                    return false
                }
              
               
        })
        return{
            serie,
            serieTitle
        }
   }
}
</script>

<style lang="scss">
.vcp__header{
        pointer-events: auto;
    cursor: pointer;
    transition: background-color .3s ease;
}
.vcp__header-title{
      width: 100% !important;
}
.Title-box{
    display: flex;
    color: white;
    cursor: pointer;
    width: 100%;
    .Title-img-box{
        flex:1 1 19%;
        max-width: 19%;
        margin-right: 1%;
        img{
            width:100%;
        }
    }
    .Title-text-box{
     text-transform: capitalize;
        flex:1 1 80%;
        max-width: 80%;
        h4{
            color:#ff9800;
        }
        p{
            font-size: 16px;
            line-height: 2.5;
        }
    }
}
.episode-list-box{
    border: 1px solid #2c3d4e;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: #2e4053;
    box-shadow: 0px 0px 6px rgba(0,0,0,0.2);
    .episode-box{
       display: flex;
        width: 100%;
        cursor: pointer;
     
        border-bottom: 2px solid #2c3d4e;
        .episode-img-box{
            flex: 1 1 15%;
            max-width: 15%;
            img{
            width:90%;
            }
            .episode-play{
                position: relative;
                bottom: 50%;
                right: 50%;
                font-size: 19px;
            }
        }
        .episode-text-box{
            flex:1 1 70%;
            max-width: 70%;
            padding-top: 1%;
            p{
                font-size: 14px;
                line-height: 2.5;
            }
        }
        .episode-rating-box{
            flex:1 1 15%;
            max-width: 15%;
            padding-top: 1%;
        }
    }
   .episode-box:hover{
            background-color: #2c3d4e;
    }
}
 
</style>