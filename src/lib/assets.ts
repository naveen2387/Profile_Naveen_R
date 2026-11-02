import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Server-only: checks whether a file referenced by a public path actually exists.
 * Used so that videos, thumbnails and documents without a real file are never rendered as links.
 * Do not import this module from Client Components.
 */
export function publicFileExists(publicPath: string | undefined): boolean {
  if (!publicPath) return false;
  const relative = publicPath.replace(/^\/+/, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}
