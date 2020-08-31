import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtService } from '@services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';//new FormControl('username');
  password = '';//new FormControl('password');

  constructor(private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
  }

  login = function() {
    if (this.jwtService.loggedIn){
      this.router.navigate(['articles']);
    } 

    //TODO: throw errors if login failed
  }
}
