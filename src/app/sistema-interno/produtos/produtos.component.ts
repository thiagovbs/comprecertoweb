import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe(data => this.produtos = data.json(), error => console.log(error.json()));
  }

  adicionarProdutoForm() {
    this.produtos.push(new Produto());
  }

  aoRemover(produtoRemovida) {
    console.log(produtoRemovida)
    this.produtos = this.produtos.filter(produto => produto != produtoRemovida);
  }

  atualizaProduto(salvo) {
    if (salvo) {
      this.getProdutos();
    }
  }
}
