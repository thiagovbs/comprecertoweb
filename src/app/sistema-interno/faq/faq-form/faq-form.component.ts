import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css']
})
export class FaqFormComponent implements OnInit {

  @Input() faqItem;

  constructor() { }

  ngOnInit() {
    
  }


  cancelar(){

  }
}
