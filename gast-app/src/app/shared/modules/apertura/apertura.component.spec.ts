import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaComponent } from './apertura.component';

describe('AperturaComponent', () => {
  let component: AperturaComponent;
  let fixture: ComponentFixture<AperturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AperturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
