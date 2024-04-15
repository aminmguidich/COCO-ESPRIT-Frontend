import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeilleurPostComponent } from './meilleur-post.component';

describe('MeilleurPostComponent', () => {
  let component: MeilleurPostComponent;
  let fixture: ComponentFixture<MeilleurPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeilleurPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeilleurPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
