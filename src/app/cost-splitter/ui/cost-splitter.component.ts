import { Component } from '@angular/core';
import { FriendsBalanceComponent } from '../features/friends/features/friends-balance/friends-balance.component';
import { BillsListComponent } from '../features/bills/features/bills-list/bills-list.component';


@Component({
    selector: 'app-cost-splitter',
    standalone: true,
    templateUrl: './cost-splitter.component.html',
    styleUrl: './cost-splitter.component.scss',
    imports: [FriendsBalanceComponent, BillsListComponent]
})
export class CostSplitterComponent {

}
