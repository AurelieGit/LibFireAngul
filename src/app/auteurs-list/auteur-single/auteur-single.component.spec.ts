import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuteurSingleComponent } from './auteur-single.component';

describe('AuteurSingleComponent', () => {
  let component: AuteurSingleComponent;
  let fixture: ComponentFixture<AuteurSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuteurSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuteurSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
