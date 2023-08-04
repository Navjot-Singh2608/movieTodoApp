import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class InMemoryService implements InMemoryDbService {
  constructor() {}

  createDb() {
    return {
      movies: this.mockMovies(),
    };
  }

  private mockMovies(): Movie[] {
    const movie = new Movie(
      'Avengers: Endgame',
      10,
      new Date('26 Apr, 2019 05:30:00'),
      'Mohit'
    );
    movie.id = 1;

    const movie1 = new Movie(
      'Avengers: Infinity War',
      20,
      new Date('27 Apr, 2018 05:30:00'),
      'Rohit'
    );
    movie1.id = 2;

    const movie2 = new Movie(
      'Age of Ultron',
      30,
      new Date('01 May, 2015 05:30:00'),
      'Mohit'
    );
    movie2.id = 3;

    const movies = [movie, movie1, movie2];
    return movies;
  }
}
