import { isSafeHttpUrl } from "../api";

describe("isSafeHttpUrl", () => {
  it("returns true for http:// URLs", () => {
    expect(isSafeHttpUrl("http://example.com")).toBe(true);
  });

  it("returns true for https:// URLs", () => {
    expect(isSafeHttpUrl("https://example.com")).toBe(true);
    expect(isSafeHttpUrl("https://www.personio.com")).toBe(true);
  });

  it("returns false for javascript: URLs", () => {
    expect(isSafeHttpUrl("javascript:alert(1)")).toBe(false);
  });

  it("returns false for data: URLs", () => {
    expect(isSafeHttpUrl("data:text/html,<h1>hi</h1>")).toBe(false);
  });

  it("returns false for ftp: URLs", () => {
    expect(isSafeHttpUrl("ftp://files.example.com")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isSafeHttpUrl("")).toBe(false);
  });

  it("returns false for malformed URLs", () => {
    expect(isSafeHttpUrl("not-a-url")).toBe(false);
    expect(isSafeHttpUrl("://missing-scheme")).toBe(false);
  });
});
