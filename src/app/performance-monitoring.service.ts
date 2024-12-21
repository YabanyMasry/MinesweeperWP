import { Injectable, NgZone } from '@angular/core';
import { onCLS, onFCP, onLCP, onTTFB, onFID, onINP } from 'web-vitals';
import LogRocket from 'logrocket';

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitoringService {

  constructor(private ngZone: NgZone) {
    this.trackPerformanceMetrics();
  }

  private trackPerformanceMetrics() {
    this.ngZone.runOutsideAngular(() => {
      // First Contentful Paint (FCP)
      onFCP(({ name, value }) => {
        console.log('FCP:', name, value);
        LogRocket.log('FCP', { value });
      });

      // Largest Contentful Paint (LCP)
      onLCP(({ name, value }) => {
        console.log('LCP:', name, value);
        LogRocket.log('LCP', { value });
      });

      // First Input Delay (FID)
      onFID(({ name, value }) => {
        console.log('FID:', name, value);
        LogRocket.log('FID', { value });
      });

      // Cumulative Layout Shift (CLS)
      onCLS(({ name, value }) => {
        console.log('CLS:', name, value);
        LogRocket.log('CLS', { value });
      });

      // Time to First Byte (TTFB)
      onTTFB(({ name, value }) => {
        console.log('TTFB:', name, value);
        LogRocket.log('TTFB', { value });
      });

      // Interaction to Next Paint (INP)
      onINP(({ name, value }) => {
        console.log('INP:', name, value);
        LogRocket.log('INP', { value });
      });
    });
  }
}