import { Debounce } from "./debounce"; // 根據實際文件路徑調整
jest.useFakeTimers(); // 使用 Jest 的假計時器

describe("Debounce 測試", () => {
  test("Debounce 只執行最後一次調用", () => {
    const mockFn = jest.fn();
    const debouncedFn = Debounce(mockFn, 500);
    debouncedFn();
    jest.advanceTimersByTime(250);
    debouncedFn();
    jest.advanceTimersByTime(250);
    debouncedFn();
    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(1);
  });

  test("Debounce 在 class 方法中應該保持 `this` 正確", () => {
    let result: string = "";
    class TestClass {
      name = "Vue";
      log = Debounce(() => {
        result = this.name;
      }, 500);
    }
    const instance = new TestClass();
    instance.log();
    expect(result).toEqual("");
    jest.advanceTimersByTime(250);
    instance.log();
    jest.advanceTimersByTime(250);
    expect(result).toEqual("");
    jest.advanceTimersByTime(250);
    expect(result).toEqual("Vue");
  });
});
