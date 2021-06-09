import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss'],
  animations: [
  //       trigger('dialog', [
  //     transition('void => *', [
  //       style({ bottom: 0, opacity: 0, position: 'relative'}),
  //       animate(1000)
  //     ]),
  //     transition('* => void', [
  //       animate(1000, style({ bottom: -300, opacity: 0 }))
  //     ])
  //   ])
  // ]

    trigger('inOut', [
      transition('void => *', [
        style({ opacity: 0, bottom: 0 }),           // initial styles
        animate('200ms',
          style({ opacity: 1, bottom: 0 })          // final style after the transition has finished
        )
      ]),
      transition('* => void', [
        animate('200ms',
          style({ bottom: '-100vh' })          // we asume the initial style will be always opacity: 1
        )
      ])
    ])
  ]

  // ModalInOutAnimation

    // transition(':enter', [
    //   style({transform: 'translateY(-100%)'}),
    //   animate('200ms ease-in', style({transform: 'translateY(0%)'}))
    // ]),
    // transition(':leave', [
    //   animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
    // ])
  // ]
})
export class Modal2Component implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  showModal: boolean;
  @Input()
  headerTitle: string;
  @Output()
  closeModalScreen = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  closeModal() {
    this.showModal = !this.showModal;
    this.closeModalScreen.emit(this.showModal);
  }
}
