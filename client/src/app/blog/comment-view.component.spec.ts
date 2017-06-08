import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentViewComponent } from './comment-view.component';

describe('CommentViewComponent', () => {
  let component: CommentViewComponent;
  let fixture: ComponentFixture<CommentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
