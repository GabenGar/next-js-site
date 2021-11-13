import type { JSONableMap } from "./types";

const jsonKeyTypes = ["string", "number"];
const jsonValueTypes = ["object", "array", "string", "number", "boolean", "null"];

function toJSON(value: any) {
  return JSON.stringify(value);
}

function isJSONable(value: any): boolean {
  return false;
}

function isMapJSONable(map: Map<any, any>): boolean {
  return false;
}

function mapToJSON(map: JSONableMap) {}
