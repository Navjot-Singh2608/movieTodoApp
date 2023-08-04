import { Component } from '@angular/core';
import { Movie } from '../models/movie';
import { Store } from '@ngrx/store';
import {
  addMovies,
  assignUser,
  getMovies,
  logout,
} from '../store/actions/movie.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  movies: Movie[] = [];
  newMovie: Movie = new Movie();
  title = 'movieApp';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(): void {
    this.store.dispatch(getMovies());
    this.store.dispatch(assignUser('Mohit'));
    // this.dataService.getMovies().subscribe((movies: Movie[]) => {
    //   this.movies = movies;
    // });
  }

  addNewMovies(): void {
    this.store.dispatch(addMovies(this.newMovie));
    this.newMovie = new Movie();
    // this.dataService.addMovies(this.newMovie).subscribe((res) => {
    //   this.getAllMovies();
    //   this.newMovie = new Movie();
    // });
  }

  changeUser(): void {
    this.store.dispatch(assignUser('Sanjit'));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
