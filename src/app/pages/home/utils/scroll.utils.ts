/**
 * Utility functions for scroll tracking
 */

/**
 * Get current scroll position
 * @returns Current scroll Y position
 */
export function getCurrentScrollPosition(): number {
  return window.pageYOffset || window.scrollY;
}

/**
 * Check if scroll position has changed
 * @param current - Current scroll position
 * @param last - Last recorded position
 * @returns True if position changed
 */
export function hasScrollPositionChanged(current: number, last: number): boolean {
  return current !== last;
}
