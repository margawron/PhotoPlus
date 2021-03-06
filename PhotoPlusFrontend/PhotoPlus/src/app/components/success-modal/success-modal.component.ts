import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {

  @Input() public message: string;

  @Input() public title: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  close() {
    this.activeModal.close();
  }

}
