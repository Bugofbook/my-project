/**
 * 防抖 HOF 函數（Debounce），會在最後一次調用後的延遲時間執行函數。
 *
 * - 預設 **`delay = 1000`** (1 秒)。
 *
 * @template T 函數類型
 * @param {T} fun 要執行的函數
 * @param {number} [delay=1000] 延遲時間（毫秒）
 * @returns {(this: ThisParameterType<T>, ...args: Parameters<T>) => void} 返回防抖後的函數
 */
export function Debounce<T extends (...args: unknown[]) => void>(
  fun: T,
  delay: number = 1000
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    // 清除之前的計時器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 設置新的計時器
    timer = setTimeout(() => {
      fun(...args);
    }, delay);
  };
}
