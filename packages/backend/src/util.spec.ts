import { concatObjects } from "./util";

describe("concatObjects", () => {
  it("should add objects by applying (+) to values with the same key", () => {
    expect(concatObjects({}, {})).toEqual({});
    expect(concatObjects({ x: 1 }, {})).toEqual({ x: 1 });
    expect(concatObjects({}, { y: [] })).toEqual({ y: [] });
    expect(concatObjects({ x: 1, y: [1] }, { y: [2], z: [1] })).toEqual({
      x: 1,
      y: [1, 2],
      z: [1],
    });
  });
});
