import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorfeedComponent } from './doctorfeed.component';

describe('DoctorfeedComponent', () => {
  let component: DoctorfeedComponent;
  let fixture: ComponentFixture<DoctorfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorfeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
