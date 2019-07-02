import { MoedaPadraoPipe } from "./moeda-padrao.pipe";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [MoedaPadraoPipe],
    exports:[ MoedaPadraoPipe ]
  })
  export class SharedPipeModule { }
  