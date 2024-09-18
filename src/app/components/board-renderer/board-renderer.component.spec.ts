import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardRendererComponent } from './board-renderer.component';

describe('BoardRendererComponent', () => {
  let component: BoardRendererComponent;
  let fixture: ComponentFixture<BoardRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
