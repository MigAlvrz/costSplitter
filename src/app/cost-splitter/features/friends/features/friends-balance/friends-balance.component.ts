import { Component, signal } from '@angular/core';
import { Ifriend, Ipayment } from '../../../../../core/interfaces/Ifriend';
import { FriendsService } from '../../../../../core/services/friends.service';
import { CostsService } from '../../../../../core/services/costs.service';

@Component({
  selector: 'app-friends-balance',
  standalone: true,
  imports: [],
  templateUrl: './friends-balance.component.html',
  styleUrl: './friends-balance.component.scss'
})
export class FriendsBalanceComponent {
  friends = signal<Ifriend[]>([])
  friendPayments = signal<Ipayment[]>([])
  selectedFriend : Ifriend | undefined = undefined;

  constructor(private friendsService: FriendsService, private costsService: CostsService) {}

  ngOnInit() {
    this.friendsService.orderFriendsByBalance(this.costsService.getCosts())
    this.friends.set(this.friendsService.getFriends())
  }

  getBalance = (friend: Ifriend) : number => {
    return this.friendsService.getFriendBalance(friend, this.costsService.getCosts());
  }
  getCostDescription = (costId: number) : string => {
    const description = this.costsService.getCostById(costId)?.description
    if (description) {
      return description
    }
    return ''
  } 

  setPayments = (friend: Ifriend) : void => {
    this.friendPayments.set(friend.payments.filter((payment: Ipayment) => !payment.payed));
    this.selectedFriend = friend;
  }

  clearPayments = () : void => {
    this.friendPayments.set([]);
    this.selectedFriend = undefined
  }
}
