import { Component, Input, OnInit } from '@angular/core';
import { Actor } from '../Actor';

@Component({
  selector: 'app-actor-list',
  standalone: false,
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css',
})
export class ActorListComponent implements OnInit {
  @Input() actors: Actor[] = [];
  averagePopularity: number = 0;

  ngOnInit() {
    this.calculateAveragePopularity();
  }

  calculateAveragePopularity(): void {
    if (this.actors.length === 0) {
      this.averagePopularity = 0;
      return;
    }

    const sum = this.actors.reduce((acc, actor) => acc + actor.popularity, 0);
    this.averagePopularity = Math.round((sum / this.actors.length) * 10) / 10;
  }
}
