import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/BackOffice/Back-Core/Services/User/_services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  username: string = '';
  message: string = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.message = 'Please wait, it may take a few seconds...'; // Show the "Please wait" message
    
    this.authService.forgotPassword(this.username).subscribe(
      data => {
        console.log('Password reset email sent successfully!');
        this.message = data.message;
      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log('Password reset email sent successfully!');
          // Assuming data.message contains a success message
          this.message = 'Password reset email sent successfully!';
        } else {
          console.error('Failed to send password reset email:', error);
          this.message = 'An error occurred while sending the password reset email. Please try again later.';
        }
      }
    );
  }
  
}
