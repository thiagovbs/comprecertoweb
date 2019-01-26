import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import { Faq } from '../models/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: Http) { }

  getFaqs() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/faqs`, { headers: hds, withCredentials: true })
  }

  postFaq(faq: Faq) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${environment.urlSpring}/faqs`, faq, { headers: hds, withCredentials: true })
  }

  putFaq(faq: Faq) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${environment.urlSpring}/faqs/${faq.idFaq}`, faq, { headers: hds, withCredentials: true })
  }

  deleteFaq(idFaq: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${environment.urlSpring}/faqs/${idFaq}`, { headers: hds, withCredentials: true })
  }
}
