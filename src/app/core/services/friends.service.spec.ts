import { TestBed } from '@angular/core/testing';

import { FriendsService } from './friends.service';
import { Icost } from '../interfaces/Icost';
import { Ifriend } from '../interfaces/Ifriend';

describe('FriendsService', () => {
  let service: FriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsService);
    localStorage.clear()
    service.addFriend("Pepe Perez", [])
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new friend', () => {
    const initialFriendsCount = service.getFriends().length;
    const newName = 'Jose Perez';
    const newCosts: Icost[] = []; 

    const success = service.addFriend(newName, newCosts);

    const updatedFriendsCount = service.getFriends().length;
    expect(updatedFriendsCount).toBe(initialFriendsCount + 1);
    console.log(updatedFriendsCount);
    
    
    const addedFriend = service.getFriendByPos(updatedFriendsCount -1);
    expect(success).toBeTrue();
    expect(addedFriend.name).toBe(newName);
  });

  it('should order friends by balance correctly', () => {
    const initialFriends = service.getFriends();
    const initialCosts: Icost[] = []; 

    initialFriends.forEach((friend, index) => {
      const isPayed = index % 2 == 0;
      friend.payments = [
        {
          reciver: 'Fake reciver',
          costID: 0,
          payed: index % 2 == 0,
          cost: 10, 
        },
      ];
    });

    initialFriends.forEach((friend) => service.friends.push(friend));

    service.orderFriendsByBalance(initialCosts);

    const sortedFriends = service.getFriends();
    const firstBalance = service.getFriendBalance(sortedFriends[0], initialCosts)
    const secondBalance = service.getFriendBalance(sortedFriends[1], initialCosts)
    
    expect(firstBalance).toBeGreaterThanOrEqual(secondBalance);
    
  });
});
