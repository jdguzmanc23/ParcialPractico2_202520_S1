import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  onSelect(movie: Movie) {
    this.router.navigate(['/movies', movie.id]);
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
      }
    });
  }
}
