import { isString } from "lodash-es";

class ErUIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErUIError";
  }
}

export function throwError(scope: string, message: string): never {
  throw new ErUIError(`[${scope}]:${message}`);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(scope: string | Error, msg?: string): void {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? new ErUIError(`[${scope}]:${msg}`) : scope;
    console.warn(err);
  }
}
