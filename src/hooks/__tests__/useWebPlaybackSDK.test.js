import { renderHook } from "@testing-library/react-hooks";

import useWebPlaybackSDK from "../useWebPlaybackSDK";

describe("useWebPlaybackSDK", () => {
  it("should return an array", () => {
    const { result } = renderHook(() => useWebPlaybackSDK());
    expect(result.current).toBeInstanceOf(Array);
  });
  it("should return null as the first element", () => {
    const { result } = renderHook(() => useWebPlaybackSDK());
    expect(result.current[0]).toBeNull();
  });
  it("should return a function as the second element", () => {
    const { result } = renderHook(() => useWebPlaybackSDK());
    expect(result.current[1]).toBeInstanceOf(Function);
  });
});
