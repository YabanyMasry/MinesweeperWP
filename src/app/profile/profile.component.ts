import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



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

        </div>
    </section>

    <section>
    <h2>Billing Information</h2>
    <div class="line"></div>
    <div class="profile-info">
      <div class="profile-item">
        <label>Billing Address:</label>
        <span>{{ billingAddress }}</span>
      </div>
      <div class="profile-item">
        <label>Card Number:</label>
        <span>{{ cardNumber }}</span>
      </div>
      <div class="profile-item">
        <label>Cardholder Name:</label>
        <span>{{ cardholderName }}</span>
      </div>
      <div class="profile-item">
        <label>Expiry Date:</label>
        <span>{{ expiry }}</span>
      </div>
      <div class="profile-item">
        <label>CVV:</label>
        <span>{{ cvv }}</span>
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
export class ProfileComponent implements OnInit {
    constructor(private http: HttpClient) { }
    username: string = '';
    email: string = '';
    bestScore: number = 0;
    gamesPlayed: number = 0;
    userId: string = '';
    billingAddress: string = '';
    cardNumber: string = '';
    cardholderName: string = '';
    expiry: string = '';
    cvv: string = '';

    ngOnInit() {
        this.username = this.getCookie('username');
        this.email = this.getCookie('email');
        this.userId = this.getCookie('userId');
        this.gamesplayed();
        this.highestscore();

        const paymentInfo = JSON.parse(sessionStorage.getItem('paymentInfo') || '{}');
        this.billingAddress = paymentInfo.billingAddress || '';
        this.cardNumber = this.maskCardNumber(paymentInfo.cardNumber || '');
        this.cardholderName = paymentInfo.cardholderName || '';
        this.expiry = paymentInfo.expiry || '';
        this.cvv = this.maskCVV(paymentInfo.cvv || '');
      }

    gamesplayed() {
        this.http.get(`http://localhost:8000/api/users/${this.userId}/games-played`).subscribe((data: any) => {
            this.gamesPlayed = data.gamesPlayed;
        });
    }

    highestscore() {
        this.http.get(`http://localhost:8000/api/users/${this.userId}/highest-score`).subscribe((data: any) => {
            this.bestScore = data.highestScore.score;
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

    maskCardNumber(cardNumber: string): string {
        return cardNumber.replace(/\d(?=\d{4})/g, '*');
      }
    
      maskCVV(cvv: string): string {
        return cvv.replace(/\d/g, '*');
      }
}