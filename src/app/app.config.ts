import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { routes } from './app.routes';
import {RouteService} from "./services/route.service";
import {NgxWebstorageModule} from "ngx-webstorage";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(NgxWebstorageModule.forRoot({
      prefix: 'pacto-solucoes',
    })),
    NgbModule,
    FormsModule,
    RouteService
  ]
};
