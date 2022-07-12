let page = 1;
let pages = 1;
let movieSearch;

$(document).ready(function () {
    pageName = location.pathname.split('/').slice(-1)[0]
    let searchVal = sessionStorage.getItem('searchVal')
    pageName == 'index.html' && searchVal == null ? getMovie() : void (0)
    console.log(searchVal)
    if (searchVal != null) {
        $('#searchInput').val(searchVal)
        searchMovie(searchVal)
        sessionStorage.removeItem('searchVal')
    }
    $('#searchIcon').click(() => {
        searchMovie($('#searchInput').val())
    })

    $('#catalog-more').click(() => {
        getMovie(movieSearch)
    })
})

$('#searchInput').keypress(function (e) {
    let key = e.which
    searchVal = $('#searchInput').val()
    if (key == 13 && searchVal != '') {
        searchMovie(searchVal)
        return false
    }
});

function searchMovie(searchVal) {
    if (searchVal != '') {
        pageName = location.pathname.split('/').slice(-1)[0]
        if (pageName != 'index.html') {
            sessionStorage.setItem('searchVal', $('#searchInput').val())
            window.location = 'index.html'
        } else {
            page = 1
            pages = 1
            movieSearch = searchVal
            getMovie(searchVal)
        }
    }
}

function getMovie(movie) {
    if (movie != undefined) {
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=621a38ea28e6852ab9d8b72132a24df3&language=pt-br&page=${page}&include_adult=false`)
            .then((response) => {
                let movies = response.data.results
                pages = response.data.total_pages
                listMovies(movies)
            })
    } else {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=621a38ea28e6852ab9d8b72132a24df3&language=pt-br&page=${page}`)
            .then((response) => {
                let movies = response.data.results
                pages = response.data.total_pages
                listMovies(movies)
            })
    }
}

function listMovies(movies) {
    let output = ''
    console.log(movies)
    $.each(movies, (index, movie) => {

        output += `
        <div class="catalog-movies">
            <div>
                <a onclick="movieSelected('${movie.poster_path}', '${movie.vote_average}', '${movie.title}', '${(movie.overview).replace(/"/g, '')}')"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="catalog-poster"></a>
            </div>
            <div class="catalog-vote">
                <i class="fa-solid fa-star"><span>${movie.vote_average}</span></i>
            </div>
            <p class="catalog-title">${movie.title}</p>
        </div>`
    })

    page == 1 ? $('#catalog').html(output) : $('#catalog').append(output)
    if (page < pages) {
        $('#catalog-more').html(`
        <p class="catalog-more-p">Carregar mais <i class="fa-solid fa-plus"></i></p>
        `)
        page++
    } else {
        $('#catalog-more').empty()
    }
}

function movieSelected(poster, vote, title, overview) {
    sessionStorage.setItem('moviePoster', poster)
    sessionStorage.setItem('movieVote', vote)
    sessionStorage.setItem('movieTitle', title)
    sessionStorage.setItem('movieOverview', overview)
    window.location = 'movie.html'
}

function loadMoviePage() {
    let output = ''
    let moviePoster = sessionStorage.getItem('moviePoster')
    let movieVote = sessionStorage.getItem('movieVote')
    let movieTitle = sessionStorage.getItem('movieTitle')
    let movieOverview = sessionStorage.getItem('movieOverview')
    output = `
    <img src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="poster" class="poster">
    <i class="fa-solid fa-star"><span>${movieVote}</span></i>
    <p>${movieTitle}</p>
    <p class="p-justified">${movieOverview}</p>`
    $('#movie-selection').html(output)
}