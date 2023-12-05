import { Injectable } from '@angular/core';
import { Icost } from '../interfaces/Icost';
import { FriendsService } from './friends.service';
import { Ifriend } from '../interfaces/Ifriend';

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  costs: Icost[] = []

  constructor(private friendsService: FriendsService) {
    this.loadCosts()
   }

  loadCosts = (): void => {
    let costs = [] 
    let costsJSon = localStorage.getItem("costs")
    if (costsJSon) {
      costs = JSON.parse(costsJSon).map((element: any) => {
        return element as Icost
      })
    }
    this.costs = costs
  }

  getCosts = () : Icost[] => {
    return this.costs
  }

  getCostById = (id: number) : Icost | undefined => {
    return this.costs.find((cost: Icost) => cost.id === id)
  }

  addCost = (totalCost: number, description: string, payer: string, date: Date, friendsThatPayed: Ifriend[]) : boolean => {
    const newCost = {totalCost: totalCost, description: description, payer: payer, date: date, id: this.costs.length};
    this.costs.push(newCost);
    this.processPayment(newCost, friendsThatPayed);
    this.orderCostsByDate()
    localStorage.setItem("costs", JSON.stringify(this.costs));
    localStorage.setItem("friends", JSON.stringify(this.friendsService.getFriends()))
    return this.costs.some((value: Icost) => value.id === newCost.id);
  }

  orderCostsByDate = () : Icost[] => {
    return this.costs.sort((cost1, cost2) => {
      return new Date(cost2.date).getTime() - new Date(cost1.date).getTime();
    })
  }

  processPayment = (cost: Icost, friendsThatPayed: Ifriend[]) => {
    const friends = this.friendsService.getFriends();
    const individualCost = cost.totalCost / friends.length
    friends.forEach((friend: Ifriend) => {
        friend.payments.push({costID: cost.id, cost: individualCost, reciver: cost.payer, payed: friendsThatPayed.some((element: Ifriend) => element.name === friend.name) || cost.payer === friend.name})
    })

  }


}
