import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Angular Material
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { importProvidersFrom } from '@angular/core';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      MatToolbarModule,
      MatSidenavModule,
      MatButtonModule,
      FormsModule)
  ]
};
