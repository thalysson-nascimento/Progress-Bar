import { Component, OnInit } from '@angular/core';
import IArray from './array.interface';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit {
  listCards = [
    {
      name: 'card 01',
      eligible: false,
    },
    {
      name: 'card 02',
      eligible: false,
    },
    {
      name: 'card 03',
      eligible: false,
    },
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('lista de cards: ', this.getAllCardsWhenEligibilityIsFalse());
  }

  // o listCard será o response.data
  getAllCardsWhenEligibilityIsFalse() {
    const allCardsFalse = this.listCards.every(listCardsFalse => {
      const cardsFalse = listCardsFalse.eligible === false;
      return cardsFalse;
    });

    if (allCardsFalse) {
      return this.listCards;
    }
  }

}
