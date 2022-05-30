/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShowSnackbarOnErrorInterceptor } from './show-snackbar-on-error.interceptor';

/* Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ShowSnackbarOnErrorInterceptor,
    multi: true,
  },
];
