import { Component } from '@angular/core';
import { NewBillComponent } from '../../../cost-splitter/features/bills/features/new-bill/new-bill.component';
import { NewFriendComponent } from '../../../cost-splitter/features/friends/features/new-friend/new-friend.component';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [NewBillComponent, NewFriendComponent]
})
export class HeaderComponent {

}
