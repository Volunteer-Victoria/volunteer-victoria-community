import { addHeader } from "./add-header";

describe(addHeader.name, () => {
  it("adds a header", () => {
    expect(document.querySelector("header")).toBeNull();
    addHeader("foobar");
    expect(document.querySelector("header")).not.toBeNull();
  });
});
