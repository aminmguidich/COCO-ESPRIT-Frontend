import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFrontComponent } from './contact-front.component';

describe('ContactFrontComponent', () => {
  let component: ContactFrontComponent;
  let fixture: ComponentFixture<ContactFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
