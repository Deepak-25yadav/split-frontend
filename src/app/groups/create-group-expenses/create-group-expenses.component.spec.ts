import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupExpensesComponent } from './create-group-expenses.component';

describe('CreateGroupExpensesComponent', () => {
  let component: CreateGroupExpensesComponent;
  let fixture: ComponentFixture<CreateGroupExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
