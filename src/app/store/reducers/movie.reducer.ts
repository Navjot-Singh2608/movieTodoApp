import {
  combineReducers,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Movie } from 'src/app/models/movie';
import {
  addMovies,
  addMoviesSuccess,
  assignUser,
  deleteMovieSuccess,
  getMoviesSuccess,
  updateMovieSuccess,
} from '../actions/movie.action';
import { RouterReducerState } from '@ngrx/router-store';

export interface MovieState {
  movies: ReadonlyArray<Movie>;
  user: string;
  router: RouterReducerState<any>;
}

const initialState: ReadonlyArray<Movie> = [];

export const movieReducer = createReducer(
  initialState,
  on(getMoviesSuccess, (state, { movies }) => {
    return [...movies];
  }),
  on(addMoviesSuccess, (state, { movie }) => [...state, movie]),
  on(deleteMovieSuccess, (state, { movieId }) =>
    state.filter((movie) => movie.id !== movieId)
  ),
  on(updateMovieSuccess, (state, { movie }) => {
    const movies = state.map((m) => {
      if (m.id === movie.id) {
        return movie;
      }
      return m;
    });
    return movies;
  })
);

const initialUserSate = 'Mohit';
export const userReducer = createReducer(
  initialUserSate,
  on(assignUser, (state, { user }) => user)
);

// export const reducers = combineReducers<MovieState>({
//   movies: movieReducer,
//   user: userReducer,
// });
