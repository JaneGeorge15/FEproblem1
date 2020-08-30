import { Component, OnInit } from '@angular/core';
import { FalconeSearchService } from './falcone-search.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-falcone-search',
  templateUrl: './falcone-search.component.html',
  styleUrls: ['./falcone-search.component.scss'],
})
export class FalconeSearchComponent implements OnInit {
  planetList: any;
  vehicleList: any;
  actualVehicleList: any;
  details: any = {
    planet_names: [],
    vehicle_names: [],
  };
  timeTaken: number = 0;

  constructor(
    private falconeSearchService: FalconeSearchService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPlanets(); // Api call to fetch planets
    this.getVehicles(); // Api call to fetch vehicles
  }

  getPlanets() {
    // Api call to fetch planets
    this.spinner.show();
    this.falconeSearchService.getPlanets().subscribe(
      (res: any) => {
        res.forEach((element: any) => {
          element.isSelected = false;
        });
        this.planetList = res;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  getVehicles() {
    // Api call to fetch vehicles
    this.spinner.show();
    this.falconeSearchService.getVehicles().subscribe(
      (res: any) => {
        this.actualVehicleList = _.cloneDeep(res);
        this.vehicleList = res;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  onPlanetSelect(event: any) {
    if (event) {
      this.planetList.forEach((element: any) => {
        // To disable selected planets from the list
        if (element.name === event.name) {
          element.isSelected = true;
        } else {
          if (
            this.details.planet_names.some(function (el: any) {
              return el.name === element.name;
            })
          ) {
            element.isSelected = true;
          } else {
            element.isSelected = false;
          }
        }
      });
      this.getTimeTaken();
    }
  }

  onVehicleSelect(event: any) {
    this.vehicleList.forEach((element: any, index: number) => {
      // To disable selected planets from the list
      if (element.name === event.name) {
        element.total_no -= 1; // Decrease the available vehicle number is selected
      } else {
        if (
          this.details.vehicle_names.some(function (el: any) {
            return el.name === element.name;
          }) === false
        ) {
          this.resetVehicleAvailability(element, index); // Reset unselected Vehicle number on reset
        }
      }
    });
    this.getTimeTaken();
  }

  resetVehicleAvailability(vehicle: any, index: number) {
    // Reset unselected Vehicle number on reset
    if (
      this.actualVehicleList.some(function (el: any) {
        return el.name === vehicle.name;
      })
    ) {
      this.vehicleList[index].total_no = this.actualVehicleList[index].total_no;
    }
  }

  getTimeTaken() {
    // Total time taken calculation
    if (this.details.planet_names && this.details.vehicle_names) {
      this.timeTaken = 0;
      for (var i = 0, len = this.details.planet_names.length; i < len; i++) {
        for (var j = 0, len2 = this.details.vehicle_names.length; j < len2; j++) {
          if (i === j) {
            console.log(this.details.vehicle_names[j]);
            const distance = this.details.planet_names[i].distance;
            const speed = this.details.vehicle_names[j].speed;

            this.timeTaken += distance / speed; // Total time taken calculation
          }
        }
      }
    }
  }

  findFalconeSearch(form: any) {
    // API to fetch token
    if (form.valid) {
      this.falconeSearchService.fetchToken().subscribe(
        (res: any) => {
          if (res.token) {
            this.findFalconeSubmit(res.token);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  findFalconeSubmit(token: string) {
    if (this.details.planet_names && this.details.vehicle_names) {
      this.spinner.show();
      let planet_names: any = [];
      let vehicle_names: any = [];

      this.details.planet_names.forEach((element: any) => {
        planet_names.push(element.name);
      });
      this.details.vehicle_names.forEach((element: any) => {
        vehicle_names.push(element.name);
      });

      let data = {
        planet_names: planet_names,
        vehicle_names: vehicle_names,
        token: token,
      };
      this.falconeSearchService.findFalcone(data).subscribe(
        (res: any) => {
          this.router.navigate(['/search-result'], {
            queryParams: { status: res.status, planet_name: res.planet_name, timeTaken: this.timeTaken },
          });
          this.spinner.hide();
        },
        (error) => {
          this.toastr.error(error.error.error);
          this.spinner.hide();
        }
      );
    }
  }
}
