import { Component } from '@angular/core';
import { Ifriend } from '../../../../core/interfaces/Ifriend';
import { FriendsService } from '../../../../core/services/friends.service';
import { CostsService } from '../../../../core/services/costs.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-bill',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-bill.component.html',
  styleUrl: './new-bill.component.scss'
})
export class NewBillComponent {
  isModalOpen: boolean = false;
  errorMessage: any = undefined;
  friends: Ifriend[] = [];
  friendsThatPayed: Ifriend[] = [];
  amount : string | undefined;
  description: string | undefined;
  payer: string = "-1";
  date: any;

  constructor(private friendService: FriendsService, private costService: CostsService) {}

  ngOnInit() {
    this.friends = this.friendService.getFriends()
  }

  toggleModal = (): void => {
    this.isModalOpen = !this.isModalOpen
    this.resetModal();
    }

  resetModal = (): void => {
      this.description = undefined;
      this.amount = undefined;
      this.payer = "-1";
      this.date = undefined;
    }

  preventToggle = (event: Event): void => {
    event.stopPropagation()
  }

  addNewPayment = (): void => {
    if (!this.amount || !this.description || this.payer === "-1" || !this.date ) {  
      this.errorMessage = "Por favor, rellena todos los campos"
    } else {
      this.costService.addCost(Number.parseFloat(this.amount),this.description,this.payer,new Date(this.date), this.friendsThatPayed);
      this.friendService.orderFriendsByBalance(this.costService.getCosts())
      this.toggleModal()
    }
    
  }

  checkedPayed = (index: any) => {
    this.friendsThatPayed.push(this.friendService.getFriendByPos(index))
  }


}
