import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input('message') message: string = '';
  @Output('onCloseP') onClose: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.onClose.emit(true);
  }
}
