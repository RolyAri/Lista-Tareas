import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskModel } from 'src/app/models/task.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {
  items: TaskModel[] = [];
  txtInput!: FormControl;
  constructor(private itemService: ItemService){
    this.txtInput = new FormControl('',
    [Validators.minLength(5),
    Validators.maxLength(100)])
  }

  ngOnInit(): void{
  }

  save(){
    let newItem = {
      name: this.txtInput.value,
      state: false
    }
    if(this.txtInput.invalid || this.txtInput.value === "") return;
    this.itemService.add(newItem);
    this.txtInput.reset();
  }
}
