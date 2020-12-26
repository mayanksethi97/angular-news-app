import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastHomeComponent } from './podcast-home.component';

describe('PodcastHomeComponent', () => {
  let component: PodcastHomeComponent;
  let fixture: ComponentFixture<PodcastHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
