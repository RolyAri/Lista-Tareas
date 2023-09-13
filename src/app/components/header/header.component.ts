import { Component } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  constructor(private itemService: ItemService){}
  
  filter(code: string){
    this.itemService.filter(code);
  }
}
