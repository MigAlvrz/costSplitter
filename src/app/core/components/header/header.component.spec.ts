import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NewBillComponent } from '../../../features/bills/components/new-bill/new-bill.component';
import { NewFriendComponent } from '../../../features/friends/components/new-friend/new-friend.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NewBillComponent, NewFriendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the app-new-bill component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-new-bill')).toBeTruthy();
  });

  it('should contain the app-new-friend component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-new-friend')).toBeTruthy();
  });
});
