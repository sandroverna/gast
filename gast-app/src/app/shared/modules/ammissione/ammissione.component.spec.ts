import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmmissioneComponent } from './ammissione.component';

describe('AmmissioneComponent', () => {
  let component: AmmissioneComponent;
  let fixture: ComponentFixture<AmmissioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmmissioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmmissioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
