import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EndpointService } from './services';
import { TruncatePipe } from './pipes';
import { httpInterceptorProviders } from './interceptors';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

import localeIt from '@angular/common/locales/it';
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config';

registerLocaleData(localeIt);

@NgModule({
  declarations: [TruncatePipe],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [CommonModule, FormsModule, HttpClientModule, MatSnackBarModule, TruncatePipe],
  providers: [
    EndpointService,
    httpInterceptorProviders,
    TruncatePipe,
    { provide: LOCALE_ID, useValue: 'it' },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 700, horizontalPosition: 'center', verticalPosition: 'bottom' } as MatSnackBarConfig,
    },
  ],
})
export class SharedModule {}
