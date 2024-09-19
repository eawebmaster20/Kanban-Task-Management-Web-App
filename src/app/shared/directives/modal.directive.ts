import {Component,HostListener,Directive,HostBinding,Input} from '@angular/core';
import { DataService } from '../services/data/data.service';
@Directive({
  selector: '[appModal]',
  standalone: true
})
export class ModalDirective {

  constructor(private host:DataService) { }
  @HostListener('click', ['$event']) onClick(event:Event) {
    const target = event.target as HTMLElement;
    const targetId = target.id;
    if (targetId === 'toggleModal') {
      // console.log(this.host.showDropdown)
      return;
    }
    // console.log(target,this.host.showDropdown)
    this.host.showDropdown = this.host.showDropdown ? false : false;
  }
}