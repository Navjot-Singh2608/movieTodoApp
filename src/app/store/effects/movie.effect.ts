import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, EmptyError, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  delay,
  exhaustMap,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';

import {
  getMovies,
  getMoviesSuccess,
  addMovies,
  addMoviesSuccess,
  updateMovie,
  deleteMovie,
  updateMovieSuccess,
  deleteMovieSuccess,
} from '../actions/movie.action';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MovieEffects {
  loadMovie$ = createEffect(() =>
    this.action$.pipe(
      ofType(getMovies),
      exhaustMap(() => {
        return this.dataService
          .getMovies()
          .pipe(map((movies) => getMoviesSuccess(movies)));
      })
    )
  );

  addMovie$ = createEffect(() =>
    this.action$.pipe(
      ofType(addMovies),
      tap((movie) => console.log(movie)),
      concatMap((movie) =>
        this.dataService
          .addMovies(movie)
          .pipe(map((newMovie) => addMoviesSuccess(newMovie)))
      )
    )
  );

  deleteMovie$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteMovie),
      mergeMap(({ movieId }) =>
        this.dataService.deleteMovie(movieId).pipe(
          map(() => deleteMovieSuccess(movieId)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateMovie$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateMovie),
      concatMap(({ movie }) =>
        this.dataService.updateMovies(movie).pipe(
          map(() => updateMovieSuccess(movie)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private action$: Actions, private dataService: DataService) {}
}
