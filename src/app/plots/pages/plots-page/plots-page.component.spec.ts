import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsPageComponent } from './plots-page.component';

describe('PlotsPageComponent', () => {
  let component: PlotsPageComponent;
  let fixture: ComponentFixture<PlotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
