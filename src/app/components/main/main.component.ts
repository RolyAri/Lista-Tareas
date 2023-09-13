import { Component } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent {
  listItems: TaskModel [] = [];
  codeFilter!: string;
  title!: string;
  constructor(private itemService: ItemService){}
  ngOnInit(){
    this.itemService.codeFilter$.subscribe(code => {
      this.codeFilter = code;
      this.changeTitle(code)
    })
    this.itemService.filter('A');

    this.itemService.item$.subscribe(data => this.listItems = data);
    this.itemService.get();
  }

  changeTitle(code: string){
    const All = "A", Completed = "C", Pendings = "P";
    if(code === All) this.title = "Todo";
    else if(code == Completed) this.title = "Completado";
    else this.title = "Pendiente";
  }
}
