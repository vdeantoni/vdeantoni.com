import { useCallback, useRef } from "react";

/**
 * Inactivity Timer Hook
 *
 * Manages inactivity detection for face tracking.
 * When user stops interacting (moving mouse), triggers callback after specified delay.
 *
 * Flow:
 * - User moves mouse → Reset timer
 * - No movement for X seconds → onInactive callback fires
 *
 * @param options - Timer configuration
 * @returns Timer control functions
 */
interface UseInactivityTimersOptions {
  inactivityDelay: number; // Delay before calling onInactive (ms)
  onInactive: () => void; // Called when user becomes inactive
}

export function useInactivityTimers({
  inactivityDelay,
  onInactive,
}: UseInactivityTimersOptions) {
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Reset the inactivity timer
   * Call this whenever the user interacts (moves mouse, touches screen)
   */
  const resetInactivityTimer = useCallback(() => {
    // Clear existing inactivity timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    // Start new inactivity timer
    inactivityTimerRef.current = setTimeout(() => {
      onInactive();
    }, inactivityDelay);
  }, [inactivityDelay, onInactive]);

  /**
   * Clear all timers
   */
  const clearAllTimers = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  /**
   * Cleanup function for unmount
   */
  const cleanup = useCallback(() => {
    clearAllTimers();
  }, [clearAllTimers]);

  return {
    resetInactivityTimer,
    clearAllTimers,
    cleanup,
  };
}

export default useInactivityTimers;
