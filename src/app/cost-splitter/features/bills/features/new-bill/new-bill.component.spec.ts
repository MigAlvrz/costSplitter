import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBillComponent } from './new-bill.component';
import { FriendsService } from '../../../../../core/services/friends.service';
import { CostsService } from '../../../../../core/services/costs.service';

describe('NewBillComponent', () => {
  let component: NewBillComponent;
  let fixture: ComponentFixture<NewBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBillComponent],
      providers: [FriendsService, CostsService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call togglemodal when the button is clicked', () => {
    spyOn(component, 'toggleModal')
    const button = fixture.nativeElement.querySelector('button')
    button.click();
    expect(component.toggleModal).toHaveBeenCalled()
  });

  it('should show the overlay when isModalOpen is true', () => {
    component.isModalOpen = true
    fixture.detectChanges()
    const overlay = fixture.nativeElement.querySelector('.overlay')
    expect(overlay).toBeTruthy()
  })

  it('should hide the overlay when isModalOpen is false', () => {
    component.isModalOpen = false
    fixture.detectChanges()
    const overlayOff = fixture.nativeElement.querySelector('.overlay')
    expect(overlayOff).toBeNull()
  })

  it('should prevent the overlay from dissapear when the modal container itself is clicked', () => {
    component.isModalOpen = true
    fixture.detectChanges()
    spyOn(component, 'preventToggle')
    const modalContainer = fixture.nativeElement.querySelector('.modal-container')
    modalContainer.click()
    expect(component.preventToggle).toHaveBeenCalled()
  });

  it('should call services and toggleModal when all the fields are filled', () => {
    let friendsService: FriendsService = TestBed.inject(FriendsService)
    let costsService: CostsService = TestBed.inject(CostsService)
    component.amount = '10'
    component.description = 'Fake Payment'
    component.payer = '1'
    component.date = '2023-01-01'
    component.friendsThatPayed = [];
    spyOn(costsService, 'getCosts').and.returnValue([])
    spyOn(costsService, 'addCost')
    spyOn(friendsService, 'orderFriendsByBalance')
    spyOn(component, 'toggleModal')
    component.addNewPayment()
    expect(component.errorMessage).toBeFalsy();
    expect(costsService.addCost).toHaveBeenCalledOnceWith(10, 'Fake Payment', '1', jasmine.any(Date), []);
  });

  it('should set an error message when any of the fields for adding a payment is not filled', () => {
    let friendsService: FriendsService = TestBed.inject(FriendsService)
    let costsService: CostsService = TestBed.inject(CostsService)
  
    spyOn(costsService, 'addCost')
    spyOn(friendsService, 'orderFriendsByBalance')
    spyOn(component, 'toggleModal')
    component.addNewPayment()

    expect(costsService.addCost).not.toHaveBeenCalled()
    expect(friendsService.orderFriendsByBalance).not.toHaveBeenCalled()
    expect(component.toggleModal).not.toHaveBeenCalled()
    expect(component.errorMessage).toBe('Por favor, rellena todos los campos')
  });

});
