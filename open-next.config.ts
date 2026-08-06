import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Phase 1: no R2 incremental cache.
 * Add r2IncrementalCache + NEXT_INC_CACHE_R2_BUCKET when enabling caching / Phase 2 audio on R2.
 */
export default defineCloudflareConfig();
