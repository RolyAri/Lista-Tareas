import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  id!: number;
  itemSub: TaskModel[] = [];
  private sub = new Subject<TaskModel[]>();
  item$ = this.sub.asObservable();

  private subFilter = new Subject<string>();
  codeFilter$ = this.subFilter.asObservable();

  constructor() { }

  private generateId(){
    return '_' + Math.random().toString(36).substr(2,9);
  }

  add(newItem: TaskModel){
    this.get();
    newItem.id = this.generateId();
    this.itemSub.push(newItem);
    this.sub.next(this.itemSub);
    localStorage.setItem("item", JSON.stringify(this.itemSub));
  }

  get(){
    let listItems = localStorage.getItem('item');
    if(listItems == null){
      this.itemSub = [];
      this.sub.next([]);
    }else{
      this.itemSub = JSON.parse(listItems);
      this.sub.next(this.itemSub);
    }
  }

  filter(code: string){
    this.subFilter.next(code);
  }

  changeState(id: string, state: boolean){
    let itemsResult = this.itemSub.map( item => {
      if(item.id === id) item.state = state;
      return item;
    });
    this.sub.next(itemsResult);
    localStorage.setItem("item", JSON.stringify(itemsResult));
    this.itemSub = itemsResult;
  }

  delete(itemId: string){
    let itemsResult = this.itemSub.
              filter(items => items.id != itemId);
    this.sub.next(itemsResult);
    localStorage.setItem("item", JSON.stringify(itemsResult));
    this.itemSub = itemsResult;
  }
}
