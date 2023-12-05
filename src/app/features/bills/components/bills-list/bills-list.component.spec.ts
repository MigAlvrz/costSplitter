import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsListComponent } from './bills-list.component';
import { CostsService } from '../../../../core/services/costs.service';
import { Icost } from '../../../../core/interfaces/Icost';

describe('BillsListComponent', () => {
  let component: BillsListComponent;
  let fixture: ComponentFixture<BillsListComponent>;
  let costsService: jasmine.SpyObj<CostsService>;

  beforeEach(() => {
    const spyCostsService = jasmine.createSpyObj('CostsService', ['orderCostsByDate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: CostsService, useValue: spyCostsService },
      ],
    });

    fixture = TestBed.createComponent(BillsListComponent);
    component = fixture.componentInstance;
    costsService = TestBed.inject(CostsService) as jasmine.SpyObj<CostsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
