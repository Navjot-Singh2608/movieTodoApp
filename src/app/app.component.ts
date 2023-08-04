import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addMovies, assignUser, getMovies } from './store/actions/movie.action';
import { Movie } from './models/movie';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'movieApp';
  movies: Movie[] = [];
  newMovie: Movie = new Movie();
  constructor(private dataService: DataService, private store: Store) {}

  ngOnInit(): void {}

  getAllMovies(): void {
    this.store.dispatch(getMovies());
    // this.dataService.getMovies().subscribe((movies: Movie[]) => {
    //   this.movies = movies;
    // });
  }

  addNewMovies(): void {
    this.store.dispatch(addMovies(this.newMovie));
    // this.dataService.addMovies(this.newMovie).subscribe((res: any) => {
    //   this.getAllMovies();
    //   this.newMovie = new Movie();
    // });
  }
  changeUser(): void {
    this.store.dispatch(assignUser('Rohit'));
  }
}
