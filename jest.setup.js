// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// add fetch polyfill for node
import fetch, { Headers, Request, Response, Blob } from "node-fetch";
// import { Blob } from "fetch-blob";

if (!globalThis.fetch) {
  // @ts-expect-error
  globalThis.fetch = fetch;
  // @ts-expect-error
  globalThis.Headers = Headers;
  // @ts-expect-error
  globalThis.Request = Request;
  // @ts-expect-error
  globalThis.Response = Response;
  globalThis.Blob = Blob;
}
