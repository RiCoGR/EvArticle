import { validateURL } from "./validateURL";

describe("validateURL function", () => {
  test("it should show an error message if an empty string is provided", () => {
    expect(validateURL("")).toEqual("Please type URL");
  });
  test("it should show an error message if not valid URL has been provided", () => {
    expect(validateURL("someNot//Valid.com")).toEqual("Please type a valid URL");
  });
  test("it should return null if valid URL has been provided", () => {
      expect(validateURL("https://en.wikipedia.org/wiki/Node.js")).toEqual(null);
  });
});
