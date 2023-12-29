import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaIndexComponent } from './venta-index.component';

describe('VentaIndexComponent', () => {
  let component: VentaIndexComponent;
  let fixture: ComponentFixture<VentaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
