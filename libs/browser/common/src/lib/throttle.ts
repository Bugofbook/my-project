/**
 * 節流 HOF 函數（Throttle）。
 * 在 `delay` 時間內最多執行一次函數。
 *
 * - 預設 **`delay = 1000`** (1 秒)。
 * - 預設 **`leading: true`** (開始時執行一次)。
 * - 預設 **`trailing: true`** (結束時執行一次)。
 *
 * @template T 函數類型
 * @param {T} fun 要執行的函數
 * @param {number} [delay=1000] 延遲時間（毫秒）
 * @param {{ leading: boolean; trailing: boolean }} [options] 配置選項：
 *   - `leading`: 是否在開始時執行一次 (預設 `true`)
 *   - `trailing`: 是否在結束時執行一次 (預設 `true`)
 * @returns {(this: ThisParameterType<T>, ...args: Parameters<T>) => void} 返回節流後的函數
 */
export function Throttle<T extends (...args: unknown[]) => void>(
  fun: T,
  delay: number = 1000,
  options: { leading: boolean; trailing: boolean } = { leading: true, trailing: true }
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let hasLeadingExecuted = false;

  return (...args: Parameters<T>) => {
    lastArgs = args;
    if (!timer) {
      if (options.leading && !hasLeadingExecuted) {
        fun(...args);
        hasLeadingExecuted = true;
      }

      timer = setTimeout(() => {
        if (options.trailing) {
          fun(...args);
        }
        timer = null;
        hasLeadingExecuted = false;
      }, delay);
    }
  };
}
