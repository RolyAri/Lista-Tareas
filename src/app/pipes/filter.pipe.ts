import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: TaskModel[], filter: string): TaskModel[] {
    switch(filter){
      case 'C':
        return items.filter( item => item.state === true);
      case 'P':
        return items.filter( item => item.state === false);
      default:
        return items;
    }
  }

}
