import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/root/app.component';
import {environment} from "./environments/environment.development";
import {enableProdMode} from "@angular/core";
import { registerLicense } from '@syncfusion/ej2-base';


// Registering Syncfusion license key
registerLicense(environment.syncfusionApiKey);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
