/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as catalog from "../catalog.js";
import type * as http from "../http.js";
import type * as lib_editors from "../lib/editors.js";
import type * as lib_languages from "../lib/languages.js";
import type * as lib_limits from "../lib/limits.js";
import type * as lib_requireEditor from "../lib/requireEditor.js";
import type * as lib_slug from "../lib/slug.js";
import type * as lib_text from "../lib/text.js";
import type * as seed from "../seed.js";
import type * as snippets from "../snippets.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  catalog: typeof catalog;
  http: typeof http;
  "lib/editors": typeof lib_editors;
  "lib/languages": typeof lib_languages;
  "lib/limits": typeof lib_limits;
  "lib/requireEditor": typeof lib_requireEditor;
  "lib/slug": typeof lib_slug;
  "lib/text": typeof lib_text;
  seed: typeof seed;
  snippets: typeof snippets;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
