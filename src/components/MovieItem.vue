<template>
   <div class="movie">
        <router-link :to="details[4]==='serie'?'/detail/'+details[4]+'/'+details[5]:'/movie/'+details[4]+'/'+details[5]" class="movie-link">
            <div class="product-image">
            <img :src="'https://statics.ocs.fr'+movie.imageurl" alt="Movie Poster">
            <div class="type">{{details[4]}}</div>
            </div>
            <div class="detail">
                <h3>{{movie.title[0].value}}</h3>
                <p>{{movie.subtitle}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props:["movie"],
    data(props){
      console.log(props.movie.detaillink);
      return{
        details:props.movie.detaillink.split("/")
      }
    }
}
</script>

<style  lang="scss">
@media screen and (max-width: 768px){
    .movie{
        max-width: 50%;
        flex: 1 1 50%;
        padding: 16px 8px;   
    }
}
@media screen and (min-width: 768px) {
    .movie{
        max-width: 25%;
        flex: 1 1 25%;
        padding: 16px 8px;   
    }
}
@media only screen and (min-width: 992px) {
   .movie{
        max-width: 20%;
        flex: 1 1 20%;
        padding: 16px 8px;   
    } 
}
    .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-image{
            position:relative;
            display:block;
            img{
              display:block;
              width:100%;
              height: 275px;
              object-fit:cover;
            }
            .type{
              position:absolute;
              padding: 8px 16px;
              background-color:#ff9800;
              color:#FFF;
              bottom:16px;
              left:0px;
              text-transform: capitalize;
            }
          }
          .detail{
            background-color: #496583;
            padding:16px 8px;
            flex: 1 1 100%;
            border-radius:0px 0px 8px 8px;
            
            .year{
              color: #AAA;
              font-size: 14px;
            }
            h3{
              color:#FFF;
              font-weight: 600;
              font-size:18px;
            }
            p{
                  color: #ff9800;
            }
          }
      }
</style>