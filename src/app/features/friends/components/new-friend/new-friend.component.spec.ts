import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFriendComponent } from './new-friend.component';

describe('NewFriendComponent', () => {
  let component: NewFriendComponent;
  let fixture: ComponentFixture<NewFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFriendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
