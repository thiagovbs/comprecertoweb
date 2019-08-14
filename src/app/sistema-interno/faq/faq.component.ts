import { Component, OnInit } from '@angular/core';
import { Faq } from '../../models/faq';
import { FaqService } from '../../services/faq.service';

import * as Lodash from 'lodash';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqs: Faq[] = []
  loading:boolean;
  customLoadingTemplate:any;
  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.getFaqs();
  }

  getFaqs() {
    this.loading = true;
    this.faqService.getFaqs().subscribe(data => {
      this.loading = false;
      this.faqs = Lodash.orderBy(data.json(), 'idFaq', 'desc')
    }, error => console.log(error.json()));
  }

  adicionarFaqForm() {
    this.faqs.unshift(new Faq());
  }

  aoRemover(faqRemovida) {
    this.getFaqs();
  }

  aoSalvar(salvo) {
    if (salvo) {
      this.getFaqs();
    }
  }

}
