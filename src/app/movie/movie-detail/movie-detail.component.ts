import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  durationHours: number = 0;
  durationMinutes: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetail(Number(id)).subscribe({
        next: (data) => {
          this.movie = data;
          this.calculateDuration();
        },
        error: (error) => {
          console.error('Error loading movie detail:', error);
          this.router.navigate(['/movies']);
        }
      });
    }
  }

  calculateDuration(): void {
    if (this.movie) {
      this.durationHours = Math.floor(this.movie.duration / 60);
      this.durationMinutes = this.movie.duration % 60;
    }
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }
}
