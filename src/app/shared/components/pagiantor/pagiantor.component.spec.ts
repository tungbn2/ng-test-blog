import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagiantorComponent } from './pagiantor.component';

describe('PagiantorComponent', () => {
  let component: PagiantorComponent;
  let fixture: ComponentFixture<PagiantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagiantorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagiantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
