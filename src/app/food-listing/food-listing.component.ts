import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/models/Hotel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-food-listing',
  templateUrl: './food-listing.component.html',
  styleUrls: ['./food-listing.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class FoodListingComponent implements OnInit {

  constructor(private _apiService: ApiService, 
    private route: ActivatedRoute,
    private router:Router) {}

  private hotels: Hotel[] = [];
  public selectHotels: Hotel[] = [];
  location: number;
  notFound: boolean = false;

  ngOnInit(): void {
    this.location = parseInt(this.route.snapshot.paramMap.get('location'));
    this._apiService.getHotels().subscribe(
      data => {
        this.hotels = data.hotels;
        this.hotels.forEach( (hotel) => {
          if (hotel.zipcode == this.location) {
            this.selectHotels.push(hotel);
          }
        });
        if (this.selectHotels.length > 0) {
          this.notFound = false;
          
        } else {
          this.notFound = true;
        }
      }
    );
  }

  gotoHotel(id: number) {
    console.log(id);
    this.router.navigate(['api/v1/orders/', id])
  }

}
