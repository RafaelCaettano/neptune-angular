import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterErrorComponent } from './register-error.component';

describe('RegisterErrorComponent', () => {
  let component: RegisterErrorComponent;
  let fixture: ComponentFixture<RegisterErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
