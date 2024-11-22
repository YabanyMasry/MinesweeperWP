import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
        <div class="difficulty-levels">
            <div class="difficulty">
                <h3>Beginner</h3>
                <img src="beginner.png" alt="Beginner Level">
                <p>Easy 9x9 grid with 10 mines.</p>
            </div>
            <div class="difficulty">
                <h3>Intermediate</h3>
                <img src="intermediate.png" alt="Intermediate Level">
                <p>Medium 16x16 grid with 40 mines.</p>
            </div>
            <div class="difficulty">
                <h3>Expert</h3>
                <img src="expert.png" alt="Expert Level">
                <p>Challenging 30x16 grid with 99 mines.</p>
            </div>
        </div>
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
export class HomeComponent {

}
