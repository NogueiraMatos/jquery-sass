// (function() {
//     getMovie()
// })()

// Fazer a função auto-executável acima fucionar quando inicializar
// https://developers.themoviedb.org/3/movies/get-popular-movies

$(document).ready(function () {
    
    $('#searchIcon').click(() => {
        let searchText = $('#searchInput').val()
        if (searchText != '') {getMovie(searchText)}
    })
})

function getMovie(movie) {
    if (movie != '') {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=621a38ea28e6852ab9d8b72132a24df3&language=pt-br&page=1&include_adult=false`)
        .then((response) => {
            //tem várias páginas
            let movies = response.data.results
            //colocar o else aqui. Transformar o código abaixo em função
            console.log(movies)
            let output = ''
            $.each(movies, (index, movie) => {
                output += `
                <div class="catalog-movies">
                    <div>
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="catalog-poster">
                    </div>
                    <div class="catalog-vote">
                        <i class="fa-solid fa-star"></i><span>${movie.vote_average}</span>
                    </div>
                    <p class="catalog-title">${movie.title}</p>
                </div>`
            })
            $('#catalog').html(output)
            //$('body').html(output)
            console.log(output)
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
