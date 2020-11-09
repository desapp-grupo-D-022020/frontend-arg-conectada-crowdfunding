import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from '../project';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      { id: 1, name: 'Quilmes', province: 'Buenos Aires', conectivity: 85, raised: 80_000, pct_left_to_reach_goal: 5 },
      { id: 2, name: 'Lanus', province: 'Buenos Aires', conectivity: 15, raised: 1_000, pct_left_to_reach_goal: 80 },
      { id: 3, name: 'Berazategui', province: 'Buenos Aires', conectivity: 80, raised: 50_000, pct_left_to_reach_goal: 10 },
      { id: 4, name: 'Florencio Varela', province: 'Buenos Aires', conectivity: 95, raised: 35_000, pct_left_to_reach_goal: 10 },
      { id: 5, name: 'Almirante Brown', province: 'Buenos Aires', conectivity: 40, raised: 40_000, pct_left_to_reach_goal: 1 },
    ];
    return {projects};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(projects: Project[]): number {
    return projects.length > 0 ? Math.max(...projects.map(hero => hero.id)) + 1 : 11;
  }
}