import { describe, expect, it } from "vitest";
import { useClickOutside, useEventListener } from "../index";

describe("hooks/index.ts", () => {
  it("should export useClickOutside", () => {
    expect(useClickOutside).toBeDefined();
  });

  it("should export useEventListener", () => {
    expect(useEventListener).toBeDefined();
  });
});
