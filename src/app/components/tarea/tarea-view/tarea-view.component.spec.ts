import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaViewComponent } from './tarea-view.component';

describe('TareaViewComponent', () => {
  let component: TareaViewComponent;
  let fixture: ComponentFixture<TareaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
