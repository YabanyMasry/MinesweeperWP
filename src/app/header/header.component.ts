import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
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
        <li class="nav-item">
          <a class="nav-link btn btn-outline-light mx-1" href="#" (click)="openSignUpModal()">Sign Up</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn btn-outline-light mx-1" href="#" (click)="openLoginModal()">Login</a>
        </li>
        <li class="nav-item">
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
        <form>
          <div class="form-group">
            <label for="username">Username/Email</label>
            <input type="text" id="username" class="form-control" placeholder="Enter Username/Email">
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
            <input type="text" id="newUsername" class="form-control" [(ngModel)]="newUser.username" name="username" placeholder="Enter Username">
          </div>
          <div class="form-group">
            <label for="newEmail">Email</label>
            <input type="email" id="newEmail" class="form-control" [(ngModel)]="newUser.email" name="email" placeholder="Enter Email">
          </div>
          <div class="form-group">
            <label for="newPassword">Password</label>
            <input type="password" id="newPassword" class="form-control" [(ngModel)]="newUser.password" name="password" placeholder="Enter Password">
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
export class HeaderComponent {
  newUser = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

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
    console.log('Signing up user:', this.newUser);
    this.userService.signUp(this.newUser).subscribe(
      response => {
        console.log('User signed up successfully', response);
        this.closeSignUpModal();
      },
      error => {
        console.error('Error signing up', error);
      }
    );
  }
}