/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as Seeds_comments from "../Seeds/comments.js";
import type * as Seeds_posts from "../Seeds/posts.js";
import type * as Seeds_seed from "../Seeds/seed.js";
import type * as Seeds_tags from "../Seeds/tags.js";
import type * as Seeds_users from "../Seeds/users.js";
import type * as auth from "../auth.js";
import type * as comments from "../comments.js";
import type * as http from "../http.js";
import type * as posts from "../posts.js";
import type * as search from "../search.js";
import type * as tags from "../tags.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "Seeds/comments": typeof Seeds_comments;
  "Seeds/posts": typeof Seeds_posts;
  "Seeds/seed": typeof Seeds_seed;
  "Seeds/tags": typeof Seeds_tags;
  "Seeds/users": typeof Seeds_users;
  auth: typeof auth;
  comments: typeof comments;
  http: typeof http;
  posts: typeof posts;
  search: typeof search;
  tags: typeof tags;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
