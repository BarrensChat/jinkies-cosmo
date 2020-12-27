import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtService } from '@services/jwt.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');
  showLoading = false;


  constructor(private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {

  }

  login = function() {

    this.showLoading = true;

    this.jwtService.login(this.email.value, this.password.value)
    .subscribe(data => {
      console.log('logging in->', data);

      this.showLoading = false;

      if (this.jwtService.loggedIn){
        this.router.navigate(['articles']);

      } else {
        console.error('Password or Login incorrect.', this.email.value, this.password.value)

        if(data && data.error) {
          if (data.error.password) {
            this.password.setErrors({'invalid': data.error.password});
          }

          if (data.error.email) {
            this.email.setErrors({'invalid': data.error.email});
          }
        }

        console.log('----', this.email);
      }
    });







  }
}
