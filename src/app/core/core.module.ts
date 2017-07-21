import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'app/services/auth/auth.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ // components that we want to make available
    ],
    declarations: [ // components for use in THIS module
    ],
    providers: [ // singleton services
        AuthService,
    ]
})
export class CoreModule { }