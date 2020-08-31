import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  animations: [
    trigger('progressAnimation', [
      transition('* => *', [
        query('.progress', style({width: 0})),
        query('.disabled', style({width: 0})),
        query('.progress', [
          stagger('200ms', [
            animate('200ms', style({width: '100%'}))
          ])
        ]),
        query('.disabled', [
          stagger('200ms', [
            animate('200ms', style({width: '100%'}))
          ])
        ])
      ])
    ])
  ]
})
export class ProgressBarComponent implements OnInit {

  progressBar = [
    'progress', 'progress', 'progress', 'progress', 'disabled', 'disabled',
  ];

  ngOnInit(): void {
  }
}
