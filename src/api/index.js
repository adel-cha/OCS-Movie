export const getMovieDetails =(type,id)=>{
    return fetch(`https://api.ocs.fr/apps/v2/details/${type}/${id}`)
        .then(response =>response.json());
}