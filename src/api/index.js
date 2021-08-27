export const getMovieDetails =(type,id)=>{
    return fetch(`https://api.ocs.fr/apps/v2/details/${type}/${id}`)
        .then(response =>response.json());
}

export const getSearchMovies=(value)=>{
    return fetch(`https://api.ocs.fr/apps/v2/contents?search=title=${value}`)
            .then(response =>response.json())
}