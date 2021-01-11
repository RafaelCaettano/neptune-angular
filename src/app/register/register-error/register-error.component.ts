import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-error',
  templateUrl: './register-error.component.html',
  styleUrls: ['./register-error.component.css']
})
export class RegisterErrorComponent implements OnInit {

  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
