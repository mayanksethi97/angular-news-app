import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.scss']
})
export class AppLandingComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate(path){
    this.router.navigate([`/${path}`]);
  }

}
