import { describe, expect, it, vi } from "vitest";
import { throwError, debugWarn } from "../";

describe("error", () => {
  it("throwError should be worked", () => {
    expect(() => {
      throwError("scop", "msg");
    }).toThrow("[scop]:msg");
  });
  it("debugWarn should be worked", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    debugWarn("scop", "msg");
    debugWarn(new SyntaxError("custom error"));
    expect(warn.mock.calls).toMatchInlineSnapshot(`
    [
      [
        [ErUIError: [scop]:msg],
      ],
      [
        [SyntaxError: custom error],
      ],
    ]
        `);
  });
});
