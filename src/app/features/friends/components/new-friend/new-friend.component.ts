import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendsService } from '../../../../core/services/friends.service';
import { CostsService } from '../../../../core/services/costs.service';

@Component({
  selector: 'app-new-friend',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-friend.component.html',
  styleUrl: './new-friend.component.scss'
})
export class NewFriendComponent {
  isModalOpen: boolean = false;
  errorMessage: string | undefined;
  name: string | undefined;

  constructor(private friendService: FriendsService, private costsService: CostsService) {}

  toggleModal = (): void => {
    this.isModalOpen = !this.isModalOpen
    this.name = undefined;
    }

  preventToggle = (event: Event): void => {
      event.stopPropagation()
  }
    
  addNewFriend = (name?: string) => {
    if (name) {
        this.friendService.addFriend(name, this.costsService.getCosts())
        this.toggleModal()
    } else {
        this.errorMessage = "Por favor, introduce el nombre de tu amigo"
    }
  } 
}
