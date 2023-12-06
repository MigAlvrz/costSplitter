import { Component, OnInit, signal } from '@angular/core';
import { Icost } from '../../../../core/interfaces/Icost';
import { CostsService } from '../../../../core/services/costs.service';
import { NewBillComponent } from "../new-bill/new-bill.component";
import { NewFriendComponent } from "../../../friends/components/new-friend/new-friend.component";

@Component({
    selector: 'app-bills-list',
    standalone: true,
    templateUrl: './bills-list.component.html',
    styleUrl: './bills-list.component.scss',
    imports: [NewBillComponent, NewFriendComponent]
})
export class BillsListComponent {
  costs : Icost[] = []

  constructor(private costsService : CostsService) {}

  ngOnInit() {
    this.costs = this.costsService.orderCostsByDate();
  }

  convertDate = (date: Date) => {
    const diff = new Date().getTime() - new Date(date).getTime();

    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(mins / 60); 
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `Hace ${days} días`
    } else if (hours > 0) {
      return `Hace ${hours} horas`
    } else if (mins > 0) {
      return `Hace ${mins} minutos`
    } else {
      return "hace unos segundos"
    }
  }


}
