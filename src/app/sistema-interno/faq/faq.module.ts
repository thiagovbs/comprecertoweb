import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import { MatCardModule, 
         MatFormFieldModule, 
         MatInputModule, MatButtonModule, 
         MatSelectModule, MatIconModule, 
         MatToolbarModule, MatCheckboxModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { FaqComponent } from "./faq.component";
import { FAQRoutes } from "./faq.routing";
import { FaqFormComponent } from './faq-form/faq-form.component';
import { FaqService } from "../../services/faq.service";

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(FAQRoutes),
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatToolbarModule,
        MatCheckboxModule,
        HttpModule,
        MatSelectModule
    ],
    declarations:[FaqComponent, FaqFormComponent],
    providers:[
        FaqService
    ]
})
export class FaqModule{}