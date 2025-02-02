import { Throttle } from "./throttle"; // 根據實際文件路徑調整
jest.useFakeTimers(); // 使用 Jest 的假計時器
afterEach(() => {
  jest.restoreAllMocks();
});
describe("Throttle 測試", () => {
  test("Throttle 應該在頭和尾各一次，在 delay 內忽略其他呼叫", () => {
    const mockFn = jest.fn();
    const throttledFn = Throttle(mockFn, 1000);

    throttledFn();
    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(1);
    throttledFn();
    throttledFn();
    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(2);
    throttledFn();
    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(3);
    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(4);
  });

  test("Throttle (leading: false) 應該忽略第一次執行", () => {
    const mockFn = jest.fn();
    const throttledFn = Throttle(mockFn, 1000, { leading: false, trailing: true });

    throttledFn();
    throttledFn();
    jest.advanceTimersByTime(1000);
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
  });

  test("Throttle (trailing: false) 應該只執行 leading", () => {
    const mockFn = jest.fn();
    const throttledFn = Throttle(mockFn, 1000, { leading: true, trailing: false });

    throttledFn();
    throttledFn();
    jest.advanceTimersByTime(1000);
    throttledFn();
    expect(mockFn).toBeCalledTimes(2);
  });

  test("Throttle (leading: false, trailing: false) 應該不執行任何東西", () => {
    const mockFn = jest.fn();
    const throttledFn = Throttle(mockFn, 1000, { leading: false, trailing: false });

    throttledFn();
    throttledFn();
    jest.advanceTimersByTime(1000);
    throttledFn();
    expect(mockFn).toBeCalledTimes(0);
  });

  test("Throttle 在 class 方法中應該保持 `this` 正確", () => {
    let result: number = 0
    class TestClass {
      count = 0;
      log = Throttle(() =>{
        this.count++;
        result = this.count;
      }, 1000);
    }

    const instance = new TestClass();
    instance.log();
    expect(result).toBe(1);
    jest.advanceTimersByTime(500);
    instance.log();
    expect(result).toBe(1);
    jest.advanceTimersByTime(500);
    expect(result).toBe(2);
    jest.advanceTimersByTime(500);
    expect(result).toBe(2);
  });
});
