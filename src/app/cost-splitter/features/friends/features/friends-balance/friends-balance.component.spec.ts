import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsBalanceComponent } from './friends-balance.component';
import { FriendsService } from '../../../../../core/services/friends.service';
import { CostsService } from '../../../../../core/services/costs.service';
import { Ifriend, Ipayment } from '../../../../../core/interfaces/Ifriend';

describe('FriendsBalanceComponent', () => {
  let component: FriendsBalanceComponent;
  let fixture: ComponentFixture<FriendsBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FriendsBalanceComponent],
      providers: [FriendsService, CostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendsBalanceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show 'No hay ningún amigo... Aun!'", async() => {
    spyOn(component, 'friends').and.returnValue([])
    fixture.detectChanges();
    await fixture.whenRenderingDone()
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('No hay ningún amigo... Aun!');
  })

  it('should get data for friends and balance', () => {
    const friendsService = TestBed.inject(FriendsService);
    const costsService = TestBed.inject(CostsService);

    const fakeFriends: Ifriend[] = [
      {name : "Pepe Perez", payments: []} as Ifriend,
      {name : "Jose Perez", payments: []} as Ifriend
    ];
    const fakeCosts: any = [
      {totalCost: 10, description: "cost 1", payer: "Fake Payer", date: new Date(), id: 0},
      {totalCost: 10, description: "cost 2", payer: "Fake Payer", date: new Date(), id: 1},
    ];

    spyOn(friendsService, 'orderFriendsByBalance');
    spyOn(friendsService, 'getFriends').and.returnValue(fakeFriends);
    spyOn(costsService, 'getCosts').and.returnValue(fakeCosts);

    fixture.detectChanges();

    expect(friendsService.orderFriendsByBalance).toHaveBeenCalledWith(fakeCosts);
    expect(component.friends()).toEqual(fakeFriends);
  });

  it('should set payments and selected friend', () => {
    const fakePayment = {reciver: 'Fake reciver', costID: 0, payed: false, cost: 10 } as Ipayment
    const fakeFriend: Ifriend = {name : "Pepe Perez", payments: [fakePayment]} as Ifriend

    spyOn(component.friendPayments, 'set');

    component.setPayments(fakeFriend);

    expect(component.friendPayments.set).toHaveBeenCalledWith([fakePayment]);
    expect(component.selectedFriend).toEqual(fakeFriend);
  });

  it('should clear payments and selected friend', () => {
    spyOn(component.friendPayments, 'set');
    component.clearPayments();

    expect(component.friendPayments.set).toHaveBeenCalledWith([]);
    expect(component.selectedFriend).toBeUndefined();
  });


});
