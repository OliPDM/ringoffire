import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      "projectId": "ring-of-fire-772b8",
      "appId": "1:797701496942:web:ac9dac4a14eeedfd5cc67f",
      "storageBucket": "ring-of-fire-772b8.firebasestorage.app",
      "apiKey": "AIzaSyCyPrsDxIq5bqhx0ZY6h-WBxtw5ST1AgIA",
      "authDomain": "ring-of-fire-772b8.firebaseapp.com",
      "messagingSenderId": "797701496942",
    })),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ]
};
