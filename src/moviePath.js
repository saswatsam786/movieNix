const key = process.env.MOVIE_API_KEY;

// const moviePath = {
//   trending: `https://api.themoviedb.org/3/trending/all/week?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&sort_by=popularity.desc`,
//   originals: `https://api.themoviedb.org/3/movie/now_playing?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&page=1`,
//   action: `https://api.themoviedb.org/3/discover/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&with_genres=28`,
//   animation: `https://api.themoviedb.org/3/discover/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&with_genres=16`,
//   horror: `https://api.themoviedb.org/3/discover/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&with_genres=27`,
//   comedy: `https://api.themoviedb.org/3/discover/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&with_genres=35`,

//   crime: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&with_genres=80`,
// };

const moviePath = [
  {
    heading: "Trending Now",
    url: `https://api.themoviedb.org/3/trending/all/week?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&sort_by=popularity.desc`,
  },
  {
    heading: "MovieNix Originals",
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&page=1`,
  },
  {
    heading: "Action Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&with_genres=28`,
  },
  {
    heading: "Animated Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&with_genres=16`,
  },
  {
    heading: "Horror Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&with_genres=27`,
  },
  {
    heading: "Comedy Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&with_genres=35`,
  },
  {
    heading: "Crime Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&with_genres=80`,
  },
];

export default moviePath;

// https://api.themoviedb.org/3/movie/438631/videos?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b
// Movie search
