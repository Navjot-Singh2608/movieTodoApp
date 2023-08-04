import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Movie } from 'src/app/models/movie';
import { MovieState } from '../reducers/movie.reducer';
import * as fromRouter from '@ngrx/router-store';
import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';

export const movieSelector = createSelector(
  (state: MovieState) => state.movies,
  (movies: ReadonlyArray<Movie>) => movies
);

export const movieUserSelector = createSelector(
  (state: MovieState) => state.movies,
  (state: MovieState) => state.user,
  (movies: ReadonlyArray<Movie>, user: Readonly<string>) => {
    console.log(user);
    // return movies.filter((movie: Movie) => movie.userName === user);
    return movies;
  }
);

export const greater = (amount: number) =>
  createSelector(movieSelector, (movies) => {
    return movies.filter((movie: Movie) => movie.earning >= amount);
  });

// const routeParams = createSelector(
//   (state: MovieState) => state.router.state,
//   (state) => state.params
// );
export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const selectRouter = createFeatureSelector<
  any,
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectRouteDataParam, // factory function to select a route data param
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getRouterSelectors();

export const movie = createSelector(
  movieSelector,
  selectRouteParams,
  (movies: ReadonlyArray<Movie>, { id }) => {
    return movies.filter((m) => m.id === Number(id))[0];
  }
);
