import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  result: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['status'] === 'success') {
        this.result = {
          status: params['status'],
          planet_name: params['planet_name'],
          timeTaken: params['timeTaken'],
        };
      } else {
        this.result = {
          status: params['status'],
        };
      }
    });
  }

  startAgain() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
