import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    template: `
<div class="main-content">
    <header>
        <h1>Welcome to Minesweeper!</h1>
        <div class="line"></div>
        <p>
            A classic single-player puzzle game that challenges your logic and deduction skills! 
            Your goal is to clear a rectangular board filled with hidden "mines" without detonating any of them. 
            By using clues about the number of neighboring mines in each square, you can deduce where the mines are located and flag them accordingly.
        </p>
    </header>

    <section>
  <h2>Game Difficulty</h2>
  <div class="line"></div>
  <div *ngIf="userId; else loginPrompt" class="difficulty-levels">
    <div class="difficulty">
      <h3>Beginner</h3>
      <a href="http://localhost:8080/?rows=9&cols=9&mines=10"><img src="beginner.png" alt="Beginner Level"></a>
      <p>Easy 9x9 grid with 10 mines.</p>
    </div>
    <div class="difficulty">
      <h3>Intermediate</h3>
      <a href="http://localhost:8080/?rows=16&cols=16&mines=40"><img src="intermediate.png" alt="Intermediate Level"></a>
      <p>Medium 16x16 grid with 40 mines.</p>
    </div>
    <div class="difficulty">
      <h3>Expert</h3>
      <a href="http://localhost:8080/?rows=16&cols=30&mines=99"><img src="expert.png" alt="Expert Level"></a>
      <p>Challenging 30x16 grid with 99 mines.</p>
    </div>
  </div>
  <ng-template #loginPrompt>
    <div class="login-prompt">
      <p>Please log in to access the game.</p>
    </div>
  </ng-template>
</section>


    <section>
        <h2>Leaderboards</h2>
        <div class="line"></div>
        <ul>
            <li *ngFor="let score of topScores">
            <strong>{{ score.username }}</strong>: {{ score.score }} points
            </li>
        </ul>
    </section>


    <section>
        <h2>Scoring System</h2>
        <div class="line"></div>
        <p>Your score increases as you successfully clear squares without detonating any mines. Points are awarded based on the difficulty level and the number of squares cleared consecutively:</p>
        <ul>
            <li><strong>Beginner Level</strong>: Clearing a square awards <strong>10 points</strong>.</li>
            <li><strong>Intermediate Level</strong>: Clearing a square awards <strong>20 points</strong>.</li>
            <li><strong>Expert Level</strong>: Clearing a square awards <strong>30 points</strong>.</li>
        </ul>
    </section>

    <section>
        <h2>Losing the Game</h2>
        <div class="line"></div>
        <p>The game ends when you click on a square containing a mine, resulting in an explosion. Use your deduction skills to identify safe squares before making a move.</p>
    </section>
    </div>
  `,
    styles: `
      :host {
      display: flex;
      flex-direction: column;
      background-color: #121212;
      color: #e0e0e0;
      min-height: 100vh;
      margin: 0;
      padding: 0;
    }
    .main-content {
      flex: 1;
      padding: 3rem;
      max-width: 1000px;
      margin: 2rem auto;
      background-color: #1e1e1e;
      border: 1px solid #333;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding-bottom: 3rem;
    }

    .line {
        width: 100%;
        height: 1px;
        background-color: #333;
        margin: 10px 0 20px;
    }
    .difficulty-levels {
        display: flex;
        justify-content: space-around;
        text-align: center;
        margin-bottom: 20px;
    }
    .difficulty {
        width: 30%;
    }
    .difficulty img {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
    }
  `
})
export class HomeComponent implements OnInit {
    topScores: any[] = [];
    userId: string = '';

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.userId = this.getCookie('userId');

        this.fetchTopScores();
    }

    fetchTopScores() {
        this.http.get<any>('http://localhost:8000/api/topscores')
            .subscribe({
                next: (response) => {
                    if (Array.isArray(response)) {
                        this.topScores = response;
                    } else if (response && response.topScores) {
                        this.topScores = response.topScores;
                    } else {
                        console.error('Unexpected response format', response);
                    }
                },
                error: (error) => {
                    console.error('Error fetching top scores', error);
                }
            });
    }

    getCookie(name: string): string {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return '';
    }

}