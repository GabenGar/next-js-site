import { LinkExternal } from "./external";
import { LinkInternal } from "./internal";
import { LinkLocal } from "./local";

export const linkTypes = {
  external: { name: "external", component: LinkExternal },
  internal: { name: "internal", component: LinkInternal },
  local: { name: "local", component: LinkLocal },
};
