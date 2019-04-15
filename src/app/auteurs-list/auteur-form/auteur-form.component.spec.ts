import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuteurFormComponent } from './auteur-form.component';

describe('AuteurFormComponent', () => {
  let component: AuteurFormComponent;
  let fixture: ComponentFixture<AuteurFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuteurFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuteurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
