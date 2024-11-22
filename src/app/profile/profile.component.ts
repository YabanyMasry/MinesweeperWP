import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  template: `
<div class="main-content">
    <header>
        <h1>User Profile</h1>
        <div class="line"></div>
        <p>Welcome to your profile page! Here you can view and manage your personal information and game statistics.</p>
    </header>

    <section>
        <h2>Personal Information</h2>
        <div class="line"></div>
        <div class="profile-info">
            <div class="profile-item">
                <label>Username:</label>
                <span>{{ username }}</span>
            </div>
            <div class="profile-item">
                <label>Email:</label>
                <span>{{ email }}</span>
            </div>
        </div>
    </section>

    <section>
        <h2>Game Statistics</h2>
        <div class="line"></div>
        <div class="stats">
            <div class="stat-item">
                <label>Best Score:</label>
                <span>{{ bestScore }}</span>
            </div>
            <div class="stat-item">
                <label>Games Played:</label>
                <span>{{ gamesPlayed }}</span>
            </div>
            <div class="stat-item">
                <label>Games Won:</label>
                <span>{{ gamesWon }}</span>
            </div>
        </div>
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
    .profile-info, .stats {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .profile-item, .stat-item {
        display: flex;
        justify-content: space-between;
        background-color: #2e2e2e;
        padding: 10px;
        border-radius: 5px;
    }
    label {
        font-weight: bold;
    }
  `
})
export class ProfileComponent {
  username: string = 'JohnDoe';
  email: string = 'john.doe@example.com';
  bestScore: number = 1200;
  gamesPlayed: number = 50;
  gamesWon: number = 30;
}