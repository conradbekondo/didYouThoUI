import { httpResource } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDot } from '@ng-icons/lucide';
import { HlmSkeletonComponent } from '@spartan-ng/helm/skeleton';
import { environment } from '../../../environments/environment.development';
import { Principal, WeatherData } from '../../../types';
import { interval, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dy-weather',
  viewProviders: [
    provideIcons({
      lucideDot
    })
  ],
  imports: [
    HlmSkeletonComponent,
    NgIcon
  ],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class Weather {
  readonly principal = input<Principal>();
  readonly weatherData = httpResource<WeatherData>(() => `${environment.apiOrigin}/weather-info/current`);
  private readonly _currentTime = interval(3600000).pipe(
    map(() => new Date())
  )
  readonly currentTime = toSignal(this._currentTime, { initialValue: new Date() });
  readonly daySection = computed(() => {
    const hour = this.currentTime().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    else if (hour >= 12 && hour < 18) return 'afternoon';
    else if (hour >= 18 && hour < 20) return 'evening';
    return 'night';
  });
}
