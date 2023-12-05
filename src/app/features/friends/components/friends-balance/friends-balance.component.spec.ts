import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsBalanceComponent } from './friends-balance.component';

describe('FriendsBalanceComponent', () => {
  let component: FriendsBalanceComponent;
  let fixture: ComponentFixture<FriendsBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendsBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
