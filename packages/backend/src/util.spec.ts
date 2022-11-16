import { batch, concatObjects } from "./util";

describe("concatObjects", () => {
  it("should add objects by applying (+) to values with the same key", () => {
    expect(concatObjects([])).toEqual({});
    expect(concatObjects([{}, {}])).toEqual({});
    expect(concatObjects([{ x: 1 }, {}])).toEqual({ x: [1] });
    expect(concatObjects([{}, { y: [] }])).toEqual({ y: [[]] });
    expect(
      concatObjects([
        { x: 1, y: 1 },
        { y: 2, z: 3 },
      ])
    ).toEqual({
      x: [1],
      y: [1, 2],
      z: [3],
    });
  });
});

describe("batch", () => {
  it("should batch an array into segments", () => {
    expect(batch([], 25)).toEqual([]);
    expect(batch([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7],
    ]);
    expect(batch([1, 2], 2)).toEqual([[1, 2]]);
  });
});
