import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsListComponent } from './bills-list.component';
import { CostsService } from '../../../../core/services/costs.service';
import { Icost } from '../../../../core/interfaces/Icost';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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

  it('should show a "No costs!" message when costs signal is an empty array', async () => {
    component.costs = [];
    fixture.detectChanges();
    await fixture.whenRenderingDone()
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('No costs!');
  });



});
