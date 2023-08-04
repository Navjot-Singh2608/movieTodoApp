import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
// import { movie } from '../store/selector/movie.selector';
import { MovieState } from '../store/reducers/movie.reducer';
import { Movie } from '../models/movie';
import { Observable, of } from 'rxjs';
import { movie } from '../store/selector/movie.selector';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movie$ = this.store.pipe(select(movie));
  constructor(private store: Store<MovieState>) {}

  ngOnInit(): void {}
}
