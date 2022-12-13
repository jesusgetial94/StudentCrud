import { Pipe, PipeTransform } from '@angular/core';
import { Student } from './models/Student';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: Student[], value: string) {    
    return value ? list.filter(item => item.userName.includes(value)) : list;
  }
}