function addNumbers(a: number, b: number): number {
  return a + b;
}

describe("addNumbers", () => {
  it("should add two numbers", () => {
    expect(addNumbers(1, 2)).toBe(3);
  });
});
