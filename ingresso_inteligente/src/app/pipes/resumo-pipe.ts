import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumo',
  standalone: true
})
export class ResumoPipe implements PipeTransform {
  transform(value: string, limite: number = 20): string {
    if (!value) return '';

    if (value.length > limite) {
      return value.substring(0, limite) + '...';
    }

    return value;
  }

}