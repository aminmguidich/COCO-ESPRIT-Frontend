import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/BackOffice/Back-Core/Services/User/_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token!: string;
  password!: string;
  message: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
  }

  resetPassword(): void {
    if (this.token && this.password) {
      this.message = 'Please wait, it may take a few seconds...'; // Show the "Please wait" message

      this.authService.resetPassword(this.token, this.password).subscribe(
        response => {
          console.log(response);
          // Optionally, you can redirect the user to the login page after successful password reset
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
          if (error.status === 200) {
            console.log('Password reset successful!');
            // Assuming data.message contains a success message
            this.message = 'Password reset successful!';
          } else {
            console.error('Failed to reset password:', error);
            this.message = 'An error occurred while resetting the password. Please try again later.';
          }
        }
      );
    }
  }
}
