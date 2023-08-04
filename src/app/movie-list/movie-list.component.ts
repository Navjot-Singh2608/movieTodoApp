import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Movie } from '../models/movie';
import { DataService } from '../services/data.service';
import { MovieState } from '../store/reducers/movie.reducer';
import { Subject, takeUntil } from 'rxjs';
import {
  deleteMovie,
  getMovies,
  updateMovie,
} from '../store/actions/movie.action';
import {
  movieSelector,
  movieUserSelector,
} from '../store/selector/movie.selector';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  @Input()
  movies: Movie[] = [];
  done = new Subject();
  movies$ = this.store.pipe(select(movieUserSelector));
  selectedIndex: any = null;
  earning = 0;

  // movies$ = this.store.select('movies');
  constructor(
    private dataService: DataService,
    private store: Store<MovieState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getMovies());
    this.movies$
      .pipe(takeUntil(this.done))
      .subscribe((data) => (this.movies = JSON.parse(JSON.stringify(data))));
  }

  enableEdit(movie: any, index: any): void {
    this.selectedIndex = index;
    this.earning = movie.earning;
  }

  cancelEdit(): void {
    this.selectedIndex = null;
  }

  // update the earning from the input then dispatch update action
  update(movie: Movie): void {
    const m = { ...movie };
    m.earning = this.earning;
    // dispatch action to update
    this.store.dispatch(updateMovie(m));
    this.selectedIndex = null;
  }

  deleteMovie(movieId: any): void {
    this.store.dispatch(deleteMovie(movieId));
  }

  ngOnDestroy(): void {
    // this.done.next();
    this.done.complete();
  }
}
