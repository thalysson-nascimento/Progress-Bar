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

  dataArray = [
    {id: 'mastercard', label: 'mastercard', value: 'mastercard'},
    {id: 'hipercard', label: 'hipercard', value: 'hipercard'},
    {id: 'visa', label: 'visa platinum', value: 'visa'},
    {id: 'visa-black', label: 'visa black', value: 'visa-black'},
    {id: 'mastercard-gold', label: 'mastercard gold', value: 'mastercard-gold'},
    {id: 'visa-uniclass', label: 'visa uniclass', value: 'visa-uniclass'},
  ];

  periodDiscount: {};
  countCurrentDiscount: {};
  nextDiscount: number | string;
  currentValueDiscount: any;
  remainingAmountNextDiscount: string;
  lastMinimumValueDiscount: string;
  showModal: boolean;
  closeModalScreen: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.manipulandoArray();
  }

  getChangeValue(typeCard: any) {
    console.log('Cartão selecionado: ', typeCard);
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

  linkParaAndroid() {
    window.open('market://details?id=com.itau.broker&hl=pt_BR&gl=US');
  }

  manipulandoArray() {
    let account = new Array();
    const numberAccount = 'sessionStorage()';

    /**
     * Verifica se a propriedade existe
     * Caso exista, converte de String para Object
     */
    if (localStorage.hasOwnProperty('account')) {
      account = JSON.parse(localStorage.getItem('account'));
    }

    /* Adiciona um novo valor no array criado */

    const listAccount = account.map(item => item.user_account);

    if (listAccount.length === 0) {
      console.log('Essa conta não existe nessa seção');
      account.push({user_account: '1234'});
    }

    if (!listAccount.includes('5678')) {
      console.log('Essa conta não existe nessa seção');
      account.push({user_account: '5678'});
    }

    /* Salva o item */
    localStorage.setItem('account', JSON.stringify(account));

    // const account = ['5678'];

    // localStorage.setItem('list_account', JSON.stringify(account));

    // const getAccount = JSON.parse(localStorage.getItem('list_account'));

    // console.log('MINHA LISTA DE CONTAS: ', getAccount);

    // const containAccount = account.includes('5678');

    // if (containAccount) {
    //   console.log('Contain a conta');
    // }

    // console.log('Lista de contas', account);
  }

  closeModal(event: any) {
    const close = this.closeModalScreen = event;
    console.log('===', this.closeModalScreen);
    console.log('===', close);
    return close;
  }

  showModalFunds() {
    this.showModal = !this.showModal;
    console.log(this.showModal);
  }

}
