import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuteursListComponent } from './auteurs-list.component';

describe('AuteursListComponent', () => {
  let component: AuteursListComponent;
  let fixture: ComponentFixture<AuteursListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuteursListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuteursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
