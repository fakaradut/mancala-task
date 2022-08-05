import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSideComponent } from './player-side.component';

describe('PlayerSideComponent', () => {
  let component: PlayerSideComponent;
  let fixture: ComponentFixture<PlayerSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
