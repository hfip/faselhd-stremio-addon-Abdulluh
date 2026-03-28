/**
 * Stremio Addon tRPC Router
 * Provides endpoints for the web interface
 */

import { publicProcedure, router } from "../_core/trpc";
import { getStreamsFromFaselHD } from "../faselhd";

export const stremioRouter = router({
  /**
   * Get manifest for the addon
   */
  getManifest: publicProcedure.query(() => {
    return {
      id: "org.faselhd.stremio",
      version: "1.0.0",
      name: "FaselHD Stremio Addon",
      description:
        "Stream movies and series from FaselHD with Stremio integration",
      types: ["movie", "series"],
      resources: [
        {
          name: "stream",
          types: ["movie", "series"],
          idPrefixes: ["tt"],
        },
      ],
      catalogs: [],
    };
  }),

  /**
   * Get streams for a specific content
   */
  getStreams: publicProcedure
    .input((val: any) => ({
      imdbId: val.imdbId as string,
      type: val.type as "movie" | "series",
      season: val.season as number | undefined,
      episode: val.episode as number | undefined,
    }))
    .query(async ({ input }) => {
      const streams = await getStreamsFromFaselHD(
        input.imdbId,
        input.type,
        input.season,
        input.episode
      );

      return {
        streams: streams.map((stream) => ({
          name: stream.name || "FaselHD",
          title: stream.title || "FaselHD",
          url: stream.url,
        })),
      };
    }),

  /**
   * Get installation URL for the addon
   */
  getInstallUrl: publicProcedure.query(({ ctx }) => {
    const protocol = ctx.req.protocol || "https";
    const host = ctx.req.headers.host || "localhost:3000";
    const manifestUrl = `${protocol}://${host}/api/stremio/manifest.json`;

    return {
      manifestUrl,
      installUrl: `stremio://${encodeURIComponent(manifestUrl)}`,
    };
  }),
});
