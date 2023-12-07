import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSplitterComponent } from './cost-splitter.component';

describe('CostSplitterComponent', () => {
  let component: CostSplitterComponent;
  let fixture: ComponentFixture<CostSplitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostSplitterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the FriendsBalanceComponent', () => {
    const friendsBalanceComponent = fixture.nativeElement.querySelector('app-friends-balance');
    expect(friendsBalanceComponent).toBeDefined();
  });

  it('should create the BillsListComponent', () => {
    const billsListComponent = fixture.nativeElement.querySelector('app-bills-list');
    expect(billsListComponent).toBeDefined();
  });
});
