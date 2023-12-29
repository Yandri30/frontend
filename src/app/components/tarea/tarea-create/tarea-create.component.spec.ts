import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaCreateComponent } from './tarea-create.component';

describe('TareaCreateComponent', () => {
  let component: TareaCreateComponent;
  let fixture: ComponentFixture<TareaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
