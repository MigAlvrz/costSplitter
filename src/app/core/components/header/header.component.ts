import { Component } from '@angular/core';
import { NewBillComponent } from "../../../features/bills/components/new-bill/new-bill.component";
import { NewFriendComponent } from "../../../features/friends/components/new-friend/new-friend.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [NewBillComponent, NewFriendComponent]
})
export class HeaderComponent {

}
