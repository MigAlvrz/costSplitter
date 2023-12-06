import { TestBed } from '@angular/core/testing';

import { CostsService } from './costs.service';
import { Ifriend } from '../interfaces/Ifriend';
import { FriendsService } from './friends.service';
import { Icost } from '../interfaces/Icost';

describe('CostsService', () => {
  let costsService: CostsService;
  let friendsService: FriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CostsService, FriendsService],
    });
    costsService = TestBed.inject(CostsService);
    friendsService = TestBed.inject(FriendsService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(costsService).toBeTruthy();
  });

  it('should add a new cost', () => {
    costsService.costs = [
      {totalCost: 10, description: "cost 1", payer: "Fake Payer", date: new Date(), id: 0},
      {totalCost: 10, description: "cost 2", payer: "Fake Payer", date: new Date(), id: 1},
    ]
    const initialCostsLength = costsService.getCosts().length;
    const totalCost = 10;
    const description = 'Test cost';
    const payer = 'Faker Reciver';
    const date = new Date();
    const friendsThatPayed: Ifriend[] = [];

    costsService.addCost(totalCost, description, payer, date, friendsThatPayed);

    const newCostsLength = costsService.getCosts().length;
    expect(newCostsLength).toBe(initialCostsLength + 1);

    const addedCost = costsService.getCosts()[newCostsLength - 1];
    expect(addedCost.totalCost).toBe(totalCost);
    expect(addedCost.description).toBe(description);
    expect(addedCost.payer).toBe(payer);
  });

  it('should order costs by date', () => {
    const totalCost = 10;
    const description = 'Test cost2';
    const payer = 'Faker Reciver';
    const date = new Date();
    const friendsThatPayed: Ifriend[] = [];

    costsService.addCost(totalCost, description, payer, date, friendsThatPayed);
    const initialCosts = costsService.getCosts();
  
    const firstCost = initialCosts[0].description;

    expect(firstCost).toEqual(description);
    
  });

  it('should process payments correctly', () => {
    friendsService.friends = [
      {name : "Pepe Perez", payments: []} as Ifriend,
      {name : "Jose Perez", payments: []} as Ifriend
    ]
    costsService.costs = [
      {totalCost: 10, description: "cost 1", payer: "Fake Payer", date: new Date(), id: 0},
      {totalCost: 10, description: "cost 2", payer: "Fake Payer", date: new Date(), id: 1},
    ]

    const payer = "Fake Friend";
    const totalCost = 10;
    costsService.addCost(totalCost, 'Test cost', payer, new Date(), []);

    const friends = friendsService.getFriends()
    
    const addedCost = costsService.getCosts().filter((c: Icost) => c.id === costsService.getCosts().length-1);
    
    const newPayment = friends[0].payments.filter((p) => p.costID === addedCost[0].id)
    
    expect(newPayment[0]).toBeTrue;
    expect(newPayment[0].reciver).toEqual(payer)
    expect(newPayment[0].cost).toEqual(totalCost / friends.length)
    
  });
  
});
