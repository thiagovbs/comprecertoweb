import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacaoPacoteComponent } from './informacao-pacote.component';

describe('InformacaoPacoteComponent', () => {
  let component: InformacaoPacoteComponent;
  let fixture: ComponentFixture<InformacaoPacoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacaoPacoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacaoPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
