import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaIndexComponent } from './tarea-index.component';

describe('TareaIndexComponent', () => {
  let component: TareaIndexComponent;
  let fixture: ComponentFixture<TareaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
