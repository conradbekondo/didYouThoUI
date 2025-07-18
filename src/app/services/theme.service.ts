import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, DOCUMENT, inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ThemeMode } from '../../types';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing the application's color theme (light or dark mode).
 *
 * This class handles toggling between light and dark themes, synchronizing the theme
 * with localStorage, and updating the DOM accordingly. It uses Angular's dependency
 * injection to access platform information, the renderer, and the document object.
 *
 * @remarks
 * - The current theme is persisted in localStorage under the key `'theme'`.
 * - The service emits theme changes via an observable, allowing other parts of the application to react to theme updates.
 * - The `'dark'` CSS class is added or removed from the `<html>` element to reflect the current theme.
 * - Supports 'system' theme, which respects the user's operating system preference.
 *
 * @example
 * ```typescript
 * private themeService = inject(ThemeService);
 * themeService.toggleTheme('dark'); // Sets to dark mode
 * themeService.toggleTheme(); // Toggles between light/dark if no argument is provided
 * ```
 */
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private doc = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  // Use a private BehaviorSubject for the current theme state
  // ReplaySubject is also fine, but BehaviorSubject ensures there's always a current value.
  // We initialize with 'system' as a default if nothing is found in local storage.
  private _theme = new BehaviorSubject<ThemeMode>('system');
  public readonly theme$ = this._theme.asObservable(); // Public observable for consuming theme changes

  private mediaQueryList?: MediaQueryList; // Renamed to avoid confusion with `themeObserver` being undefined

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.syncFromLocalStorage();
      this.toggleClassOnThemeChanges();
      this.setupSystemThemeListener(); // Separate method for clarity
    } else {
      // For SSR, ensure an initial theme is set to avoid hydration issues
      this._theme.next('system'); // Or 'dark', depending on your default preference for SSR
    }
  }

  /**
   * Toggles the theme between 'light' and 'dark', or sets a specific theme.
   * If no theme is provided, it toggles between 'light' and 'dark' based on the current theme.
   * If the current theme is 'system', toggling will switch to 'light' or 'dark'.
   * @param theme Optional: The specific theme to set ('light', 'dark', or 'system').
   */
  public toggleTheme(theme?: ThemeMode): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Do nothing if not in browser
    }

    let newTheme: ThemeMode;
    const currentStoredTheme = localStorage.getItem('theme') as ThemeMode | null;

    if (theme) {
      // If a specific theme is provided, use it
      newTheme = theme;
    } else {
      // If no theme is provided, toggle
      if (currentStoredTheme === 'dark') {
        newTheme = 'light';
      } else if (currentStoredTheme === 'light') {
        newTheme = 'dark';
      } else {
        // If current is 'system' or null, default toggle to 'light'
        newTheme = 'light';
      }
    }

    localStorage.setItem('theme', newTheme);
    this._theme.next(newTheme);
  }

  /**
   * Reads the theme from localStorage and sets it as the initial theme.
   * If no theme is found, it defaults to 'system'.
   */
  private syncFromLocalStorage(): void {
    const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
    this._theme.next(storedTheme || 'system'); // Default to 'system' if nothing in storage
  }

  /**
   * Subscribes to theme changes and applies/removes the 'dark' class on the <html> element.
   */
  private toggleClassOnThemeChanges(): void {
    this.theme$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(t => {
      if (t === 'dark' || (t === 'system' && this.isSystemDark())) {
        this.renderer.addClass(this.doc.documentElement, 'dark');
      } else {
        // Only remove 'dark' if it's currently present and not needed
        if (this.doc.documentElement.classList.contains('dark')) {
          this.renderer.removeClass(this.doc.documentElement, 'dark');
        }
      }
    });
  }

  /**
   * Sets up or tears down the listener for system theme changes.
   * This is only active when the current theme is 'system'.
   */
  private setupSystemThemeListener(): void {
    this.theme$.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(() => isPlatformBrowser(this.platformId)) // Ensure we only run this in the browser
    ).subscribe(theme => {
      if (theme === 'system') {
        if (!this.mediaQueryList) {
          this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
          // When the system preference changes, emit 'system' again to re-evaluate the class
          this.mediaQueryList.onchange = (e: MediaQueryListEvent) => {
            this._theme.next('system'); // Re-emit 'system' to trigger class update
          };
        }
      } else {
        // If theme is not 'system', remove the listener
        if (this.mediaQueryList) {
          this.mediaQueryList.onchange = null;
          this.mediaQueryList = undefined;
        }
      }
    });
  }

  /**
   * Helper to check if the system prefers dark mode.
   */
  private isSystemDark(): boolean {
    return isPlatformBrowser(this.platformId) && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
