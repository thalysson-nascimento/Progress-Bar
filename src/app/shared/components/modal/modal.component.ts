import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public visible = false;
  public visibleAnimate = false;

  constructor() { }

  ngOnInit(): void {
  }


  public show(): void {
    this.visible = true;
    // setTimeout(() => this.visibleAnimate = true, 5000);
    this.visibleAnimate = true;
  }

  public hide(): void {
    this.visibleAnimate = false;
    // setTimeout(() => this.visible = false, 300);
    this.visible = false;
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.hide();
    }
  }

}
