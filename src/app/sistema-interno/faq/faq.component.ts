import { Component, OnInit } from '@angular/core';
import { Faq } from '../../models/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {


  faqs:Faq[] =[]

  constructor() { }

  ngOnInit() {
  }

  adicionarFaqForm(){
    this.faqs.unshift(new Faq());
  }

  aoRemover(valor){
    console.log(valor)
  }

  aoSalvar(valor){
    console.log(valor)
  }

}
