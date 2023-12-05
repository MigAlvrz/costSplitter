import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BillsListComponent } from "./features/bills/components/bills-list/bills-list.component";
import { FormsModule } from '@angular/forms';
import { FriendsBalanceComponent } from './features/friends/components/friends-balance/friends-balance.component';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, FormsModule, BillsListComponent, FriendsBalanceComponent, HeaderComponent]
})
export class AppComponent {
  title = 'CostSplitter';
}
