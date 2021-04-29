import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListingComponent } from './food-listing.component';

describe('FoodListingComponent', () => {
  let component: FoodListingComponent;
  let fixture: ComponentFixture<FoodListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
