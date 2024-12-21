import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [UserService],
  template: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">
      <img src="mine.png" alt="Mine" class="mine-icon">
      Minesweeper
    </a>
    <div class="collapse navbar-collapse justify-content-end">
      <ul class="navbar-nav">
      <li class="nav-item" *ngIf="!userId">
        <a class="nav-link btn btn-outline-light mx-1" href="#" (click)="openSignUpModal()">Sign Up</a>
      </li>
      <li class="nav-item" *ngIf="!userId">
        <a class="nav-link btn btn-outline-light mx-1" href="#" (click)="openLoginModal()">Login</a>
      </li>
      <li class="nav-item" *ngIf="userId">
        <a class="nav-link btn btn-outline-light mx-1" (click)="navigateToProfile()">Profile</a>
      </li>
      </ul>
    </div>
  </div>
</nav>
<div class="modal" id="loginModal" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Login</h5>
        <button type="button" class="close" (click)="closeLoginModal()">
          &times;
        </button>
      </div>
      <div class="modal-body">
        <form (ngSubmit)="login()">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" id="email" class="form-control" placeholder="Enter Email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Password">
          </div>
          <div class="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" (click)="closeLoginModal()">Close</button>
            <button type="submit" class="btn btn-primary">Log in</button>
          </div>
        </form>
        </div>
    </div>
  </div>
</div>
<div class="modal" id="signUpModal" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Sign Up</h5>
        <button type="button" class="close" (click)="closeSignUpModal()">
          &times;
        </button>
      </div>
      <div class="modal-body">
        <form (ngSubmit)="signUp()">
          <div class="form-group">
            <label for="newUsername">Username</label>
            <input type="text" id="newUsername" class="form-control" [(ngModel)]="newUser.username" name="username" placeholder="Enter Username" required>
          </div>
          <div class="form-group">
            <label for="newEmail">Email</label>
            <input type="email" id="newEmail" class="form-control" [(ngModel)]="newUser.email" name="email" placeholder="Enter Email" required>
          </div>
          <div class="form-group">
            <label for="newPassword">Password</label>
            <input type="password" id="newPassword" class="form-control" [(ngModel)]="newUser.password" name="password" placeholder="Enter Password" required>
          </div>
          <div class="form-group">
            <label for="cardNumber">Credit Card Number</label>
            <input type="text" id="cardNumber" class="form-control" [(ngModel)]="newUser.credit_card.number" name="cardNumber" placeholder="Enter Credit Card Number" pattern="\d{16}" required>
          </div>
          <div class="form-group">
            <label for="expirationDate">Expiration Date (MM/YY)</label>
            <input type="text" id="expirationDate" class="form-control" [(ngModel)]="newUser.credit_card.expiry" name="expirationDate" placeholder="MM/YY" pattern="\d{2}/\d{2}" required>
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" class="form-control" [(ngModel)]="newUser.credit_card.cvv" name="cvv" placeholder="Enter CVV" pattern="\d{3}" required>
          </div>
          <div class="form-group">
            <label for="cardholderName">Cardholder Name (optional)</label>
            <input type="text" id="cardholderName" class="form-control" [(ngModel)]="newUser.credit_card.cardholderName" name="cardholderName" placeholder="Enter Cardholder Name">
          </div>
          <div class="form-group">
            <label for="billingAddress">Billing Address (optional)</label>
            <input type="text" id="billingAddress" class="form-control" [(ngModel)]="newUser.credit_card.billingAddress" name="billingAddress" placeholder="Enter Billing Address">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" (click)="closeSignUpModal()">Close</button>
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [
    `
    @import url('https://fonts.googleapis.com/css2?family=Doto:wght@850&display=swap');
    
    .navbar-dark {
      background-color: #181818;
      padding: 0.2rem 0.6rem; /* Decreased padding to make the navbar smaller */
    }
    .navbar-brand {
      color: #e0e0e0;
      font-family: 'Doto', sans-serif;
      font-size: 1.8rem;
      display: flex;
      align-items: center;
    }
    .mine-icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .container {
      padding: 0 1.2rem;
    }
    .nav-link {
      padding: 0.4rem 0.8rem;
      border-radius: 5px;
      font-size: 1.1rem;
      transition: background-color 0.3s, color 0.3s;
    }
    .nav-link:hover {
      background-color: #343a40;
      color: #b0b0b0; /* Changed text color to a darker color */
    }
    .btn-outline-light:hover {
      color: #e0e0e0; /* Ensure button text color changes to a darker color */
    }
    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
    }
    .modal-dialog {
      width: 400px;
      max-width: 100%;
    }
    .modal-content {
      background-color: #333;
      color: #ddd;
      border: none;
      border-radius: 5px;
      overflow: hidden;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #444;
    }
    .modal-title {
      font-size: 2rem;
    }
    .close {
      background: none;
      border: none;
      color: #ddd;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .modal-body {
      padding: 1rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #555;
      border-radius: 3px;
      background-color: #222;
      color: #ddd;
    }
    .form-control::placeholder {
      color: #666;
    }
    .forgot-password {
      margin-bottom: 1rem;
      text-align: right;
    }
    .forgot-password a {
      color: #6db3f2;
      text-decoration: none;
    }
    .forgot-password a:hover {
      text-decoration: underline;
    }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 0.5rem;
    }
    .btn {
      background-color: #555;
      color: #ddd;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      margin-right: 0.5rem;
    }
    .btn:hover {
      background-color: #666;
    }
    .btn-primary {
      background-color: #6db3f2;
      color: #fff;
    }
    .btn-primary:hover {
      background-color: #559dd4;
    }
    `
  ]
})
export class HeaderComponent implements OnInit {
  userId: string = '';
  newUser = {
    username: '',
    email: '',
    password: '',
    credit_card: {
      number: '',
      expiry: '',
      cvv: '',
      cardholderName: '',
      billingAddress: ''
    }
  };

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }


  ngOnInit() {
    this.userId = this.getCookie('userId');
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

  openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openSignUpModal() {
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closeSignUpModal() {
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  signUp() {
    this.http.post('http://localhost:8000/api/users', this.newUser) // Adjust the URL to your PHP file
      .subscribe({
        next: (response: any) => {
          console.log('User created successfully', response);
          // Handle success (e.g., close the modal, show a success message, etc.)
          this.closeSignUpModal();
  
          // Securely store payment info in session storage
          const paymentInfo = {
            cardNumber: this.newUser.credit_card.number,
            expiry: this.newUser.credit_card.expiry,
            cvv: this.newUser.credit_card.cvv,
            cardholderName: this.newUser.credit_card.cardholderName,
            billingAddress: this.newUser.credit_card.billingAddress
          };
          sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
        },
        error: (error) => {
          console.error('Signup error', error);
          if (error.status === 422 && error.error.errors) {
            // Display validation errors to the user
            alert('Validation errors: ' + JSON.stringify(error.error.errors));
          } else {
            // Handle other errors (e.g., show a generic error message)
            alert('Signup failed. Please try again later.');
          }
        }
      });
  }

  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    console.log('Logging in with ', email);
    console.log('Logging in with ', password);

    const payload = { email, password };

    this.http.post('http://localhost:8000/api/users/login', payload)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          document.cookie = `userId=${response.user.id}; path=/`;
          document.cookie = `username=${response.user.username}; path=/`;
          document.cookie = `email=${response.user.email}; path=/`;

          this.closeLoginModal();
          this.navigateToProfile();
        },
        error: (error) => {
          console.error('Login error', error);
          if (error.status === 422) {
            alert('Login failed. Please check your credentials and try again.');
          } else {
            alert('An unexpected error occurred. Please try again later.');
          }
        }
      });
  }

}