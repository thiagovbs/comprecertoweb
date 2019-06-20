import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'moedaPadrao'
})

export class MoedaPadraoPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) { }

  transform(value: any, currency: string, symbol: boolean = false): string {
    if (value != null)
      return this.currencyPipe.transform(value, currency, 'R$ ');
    return this.currencyPipe.transform(0, currency, 'R$ ').split('0.00')[0];
  }
}
