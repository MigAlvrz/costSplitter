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
    spyOn(component, 'costs').and.returnValue([])
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('p').textContent).toContain('No costs!');
  });

  it('Should show card elements when costs contains cost objects', () => {
    const fakeCosts = [
      {totalCost: 10, description: "cost 1", payer: "Fake Payer", date: new Date(), id: 0},
      {totalCost: 10, description: "cost 2", payer: "Fake Payer", date: new Date(), id: 1}
    ]
    spyOn(component, 'costs').and.returnValue(fakeCosts)

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const fakeCards = compiled.querySelectorAll('.card')
    
    expect(component.costs).toHaveBeenCalled()
    expect(fakeCards.length).toEqual(fakeCosts.length)
  })


  describe('convertDate function', () => {
    it('should display "hace unos segundos" for a date less than a minute ago', () => {
      const currentDate = new Date()
      const pastDate = new Date(currentDate.getTime() - 30000)
      const result = component.convertDate(pastDate)
      expect(result).toEqual('hace unos segundos')
    });

    it('should display "Hace 1 minutos" for a date 1 minute ago', () => {
      const currentDate = new Date();
      const pastDate = new Date(currentDate.getTime() - 60000)
      const result = component.convertDate(pastDate)
      expect(result).toEqual('Hace 1 minutos')
    });

    it('should display "Hace X horas" for a date 1 hour ago', () => {
      const currentDate = new Date();
      const pastDate = new Date(currentDate.getTime() - 3600000)
      const result = component.convertDate(pastDate)
      expect(result).toEqual('Hace 1 horas')
    })

    it('should display "Hace 1 días" for a date 1 day ago', () => {
      const currentDate = new Date()
      const pastDate = new Date(currentDate.getTime() - 86400000)
      const result = component.convertDate(pastDate)
      expect(result).toEqual('Hace 1 día(s)')
    })

    it('should return "hace unos segundos" for a future date', () => {
      const currentDate = new Date()
      const futureDate = new Date(currentDate.getTime() + 30000)
      const result = component.convertDate(futureDate)
      expect(result).toEqual('hace unos segundos')
    })
  })

});
