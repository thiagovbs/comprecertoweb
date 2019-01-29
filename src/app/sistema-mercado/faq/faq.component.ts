import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Faq } from '../../models/faq';
import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqs: Faq[] = [];

  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.getFaqs();
  }

  getFaqs() {
    this.faqService.getFaqs().subscribe(data => this.faqs = data.json(), error => console.log(error))
  }

  getFaqsApp() {
    return this.faqs.filter(faq => faq.plataforma.toUpperCase() === 'APP');
  }

  getFaqsSistema() {
    return this.faqs.filter(faq => faq.plataforma.toUpperCase() === 'SISTEMA');
  }
}
