import { Injectable } from '@angular/core';
import { Ifriend } from '../interfaces/Ifriend';
import { Icost } from '../interfaces/Icost';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  friends: Ifriend[] = [];

  constructor() {
    this.loadFriends()
   }

  loadFriends = (): void => {
    let friends: Ifriend[] = []
    const friendsJson = localStorage.getItem("friends");
    
    if (friendsJson) {
      friends = JSON.parse(friendsJson).map((element: any) => {
        return element as Ifriend
      })
    }
    this.friends = friends;
  }

  getFriends = (): Ifriend[] => {
    return this.friends;
  }

  getFriendByPos = (index: number) => {
    return this.friends[index]
  }

  addFriend = (name: string, Costs : Icost[]): boolean => {
    const newFriend : Ifriend = { name: name, payments: []}
    this.friends.push(newFriend);
    localStorage.setItem("friends", JSON.stringify(this.friends));
    this.orderFriendsByBalance(Costs);
    return this.friends.some((value: Ifriend) => value.name === name);
  }

  orderFriendsByBalance = (Costs : Icost[]) => {
    this.friends = this.friends.sort((friend1: Ifriend, friend2: Ifriend) => {
      return this.getFriendBalance(friend2, Costs) - this.getFriendBalance(friend1, Costs);
    })
  }

  getFriendBalance = (friend: Ifriend, costs: Icost[]): number => {
    let balance = 0;
    friend.payments.forEach((payment) => {
      if (friend.name === payment.reciver) {
        const totalCost = costs.find((cost: Icost) => cost.id === payment.costID)?.totalCost
        if (totalCost) 
         balance += totalCost
      } else if (!payment.payed) {
        balance -= payment.cost;
      } 
    })
    return Number.parseFloat(balance.toFixed(2));
  }
}
