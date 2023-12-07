import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { NewFriendComponent } from './new-friend.component';
import { FriendsService } from '../../../../core/services/friends.service';
import { CostsService } from '../../../../core/services/costs.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('NewFriendComponent', () => {
  let component: NewFriendComponent;
  let fixture: ComponentFixture<NewFriendComponent>;
  let friendsService: FriendsService;
  let costsService: CostsService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFriendComponent, FormsModule],
      providers: [FriendsService, CostsService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFriendComponent);
    component = fixture.componentInstance;
    friendsService = TestBed.inject(FriendsService);
    costsService = TestBed.inject(CostsService);
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

  it('should prevent the overlay to dissapear when content inside modal container is clicked', () => {
    component.isModalOpen = true
    fixture.detectChanges()
    spyOn(component, 'preventToggle')
    const modalContainer = fixture.nativeElement.querySelector('.modal-container')
    modalContainer.click()
    expect(component.preventToggle).toHaveBeenCalled()
  });

  it('should create a new friend when the fields are filled', () => {
    spyOn(friendsService, 'addFriend')
    spyOn(component, 'toggleModal')
    const name = 'fake friend'
    component.addNewFriend(name)
    expect(friendsService.addFriend).toHaveBeenCalledWith(name, costsService.getCosts())
    expect(component.toggleModal).toHaveBeenCalled()
  })

  it('should write an error message when the fields are not filled', () => {
    spyOn(friendsService, 'addFriend')
    spyOn(component, 'toggleModal')
    component.addNewFriend()
    expect(friendsService.addFriend).not.toHaveBeenCalled()
    expect(component.toggleModal).not.toHaveBeenCalled()
    expect(component.errorMessage).toBe('Por favor, introduce el nombre de tu amigo')
  });

});
