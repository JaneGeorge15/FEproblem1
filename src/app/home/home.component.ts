import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  step: number = 1;

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToSearch() {
    if (this.step == 1) {
      this.step = 2;
    } else {
      this.router.navigate(['/falcone-search'], { replaceUrl: true });
    }
  }
}
