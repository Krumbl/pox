import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcSummaryComponent } from './pc-summary.component';

describe('PcSummaryComponent', () => {
  let component: PcSummaryComponent;
  let fixture: ComponentFixture<PcSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
