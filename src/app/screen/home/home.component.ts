import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  discountLevels = [
    {
      periodo_vigencial: '10/08/2020',
      periodo_final: '10/09/2020',
      valor_atual: '3002.0',
      faixas_desconto: [
        {
          valor_minimo: '0.0',
          valor_maximo: '999.0',
          valor_desconto: '10.0',
          valor_faltante: '90.0',
          typo_desconto: 'p',
        },
        {
          valor_minimo: '1001.0',
          valor_maximo: '2000.0',
          valor_desconto: '20.0',
          valor_faltante: '100.0',
          typo_desconto: 'p',
        },
        {
          valor_minimo: '2001.0',
          valor_maximo: '3000.0',
          valor_desconto: '30.0',
          valor_faltante: '200.0',
          typo_desconto: 'p',
        },
        {
          valor_minimo: '3001.0',
          valor_maximo: '4000.0',
          valor_desconto: '40.0',
          valor_faltante: '300.0',
          typo_desconto: 'p',
        },
        {
          valor_minimo: '4001.0',
          valor_maximo: '5000.0',
          valor_desconto: '75.0',
          valor_faltante: '400.0',
          typo_desconto: 'p',
        },
        {
          valor_minimo: '5001.0',
          valor_maximo: '',
          valor_desconto: '1000.0',
          valor_faltante: '500.0',
          typo_desconto: 'V',
        },
      ],
    },
  ];

  periodDiscount: {};
  countCurrentDiscount: {};
  nextDiscount: number | string;
  currentValueDiscount: any;
  remainingAmountNextDiscount: string;
  lastMinimumValueDiscount: string;

  constructor() { }

  ngOnInit(): void {
    console.log('RETORNANDO A DATA DO PERÍODO DO DISCONTO: ');
    console.log(this.periodDiscount = this.getPeriodDiscountLevel());
    console.log('RETORNANDO O NÍVEL DO DESCONTO ATUAL: ');
    console.log(this.countCurrentDiscount = this.getCountCurrentDiscountLevel());
    console.log('RETORNANDO O PRÓXIMO NÍVEL DE DESCONTO: ');
    console.log(this.nextDiscount = this.getNextDiscountLevel());
    console.log('RETORNANDO O VALOR ATUAL DO NÍVEL DE DESCONTO: ');
    console.log(this.currentValueDiscount = this.getCurrentValueDiscountLevel());
    console.log('RETORNANDO O VALOR FALTANTE DO PRÓXIMO NÍVEL DE DESCONTO: ');
    console.log(this.remainingAmountNextDiscount = this.getRemainingAmountNextDiscountLevel());
    console.log('RETORNANDO O VALOR MÍNIMO DO ULTIMO ARRAY DO NÍVEL DE DESCONTO: ');
    console.log(this.lastMinimumValueDiscount = this.getLastMinimumValueDiscountLevel());
  }

  getPeriodDiscountLevel() {
    const rangeDiscount = this.discountLevels.map(monthlyDiscounRange => {
      const effectivePeriod = monthlyDiscounRange.periodo_vigencial;
      const endPeriod = monthlyDiscounRange.periodo_final;
      const period = [
        {
          effective: effectivePeriod,
          end: endPeriod,
        }
      ];

      return period;
    });

    return rangeDiscount[0];
  }

  getCountCurrentDiscountLevel() {
    const rangeDiscount = this.discountLevels.map(monthlyDiscounRange => {
      const currentValue = parseFloat(monthlyDiscounRange.valor_atual);

      return monthlyDiscounRange.faixas_desconto.filter(value => {
        const minimumValue = parseFloat(value.valor_minimo);

        if (currentValue > minimumValue) {
          return value;
        }
      });
    });

    return rangeDiscount[0].length;
  }

  getNextDiscountLevel() {
    if (this.getCountCurrentDiscountLevel() === 6) {
      return 'Você está no nível 6, no entanto não há o próximo nível de desconto';
    }

    return this.getCountCurrentDiscountLevel() + 1;
  }

  getCurrentValueDiscountLevel() {
    const rangeDiscount = this.discountLevels.map(monthlyDiscounRange => {
      const currentValue = parseFloat(monthlyDiscounRange.valor_atual);

      return currentValue;
    });

    return rangeDiscount[0];
  }

  getRemainingAmountNextDiscountLevel() {
    const rangeDiscount = this.discountLevels.map(monthlyDiscounRange => {
      const currentValue = parseFloat(monthlyDiscounRange.valor_atual);

      return monthlyDiscounRange.faixas_desconto.filter(value => {
        const minimumValue = parseFloat(value.valor_minimo);

        if (currentValue < minimumValue) {
          return value;
        }
      });
    });

    if (this.getCountCurrentDiscountLevel() >= 6) {
      return 'Você está no nível 6, no entanto não há o próximo valor mínimo de desconto';
    }

    return rangeDiscount[0][0].valor_minimo;
  }

  getLastMinimumValueDiscountLevel() {
    const rangeDiscount = this.discountLevels.map(monthlyDiscounRange => {

      return monthlyDiscounRange.faixas_desconto.filter(value => {
        const maxValue = parseFloat(value.valor_maximo);

        if (maxValue.toString() === 'NaN') {
          return value;
        }
      });
    });

    return rangeDiscount[0][0].valor_minimo;
  }

}
