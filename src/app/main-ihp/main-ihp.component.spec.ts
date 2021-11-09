import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIhpComponent } from './main-ihp.component';

describe('MainIhpComponent', () => {
  let component: MainIhpComponent;
  let fixture: ComponentFixture<MainIhpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainIhpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainIhpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
