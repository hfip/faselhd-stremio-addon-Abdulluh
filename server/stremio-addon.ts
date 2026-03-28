/**
 * Stremio Addon Implementation
 * Provides streams from FaselHD for movies and series
 */

import { addonBuilder, getRouter } from "stremio-addon-sdk";
import { getStreamsFromFaselHD } from "./faselhd";
import express from "express";

// Addon manifest
const manifest = {
  id: "org.faselhd.stremio",
  version: "1.0.0",
  name: "FaselHD Stremio Addon",
  description:
    "Stream movies and series from FaselHD with Stremio integration",
  logo: "https://via.placeholder.com/256x256?text=FaselHD",
  background:
    "https://via.placeholder.com/1280x720?text=FaselHD+Streaming+Addon",
  types: ["movie", "series"],
  resources: [
    {
      name: "stream",
      types: ["movie", "series"],
      idPrefixes: ["tt"],
    },
  ],
  catalogs: [],
  behaviorHints: {
    configurable: true,
    configurationRequired: false,
  },
};

// Create addon builder
const builder = new addonBuilder(manifest);

// Define stream handler
builder.defineStreamHandler(async (args: any): Promise<any> => {
  console.log(
    `[Stremio] Stream request: ${args.type} ${args.id}${args.extra?.season ? ` S${args.extra.season}E${args.extra.episode}` : ""}`
  );

  try {
    // Extract IMDB ID (remove 'tt' prefix if present)
    let imdbId = args.id;
    if (imdbId.startsWith("tt")) {
      imdbId = imdbId;
    }

    // Handle series with season and episode
    let season: number | undefined;
    let episode: number | undefined;

    if (args.type === "series" && args.extra?.season && args.extra?.episode) {
      season = parseInt(String(args.extra.season), 10);
      episode = parseInt(String(args.extra.episode), 10);
    }

    // Get streams from FaselHD
    const streams = await getStreamsFromFaselHD(
      imdbId,
      args.type as "movie" | "series",
      season,
      episode
    );

    // Convert to Stremio format
    const stremioStreams = streams.map((stream) => ({
      name: stream.name || "FaselHD",
      title: stream.title || "FaselHD",
      url: stream.url,
      sources: ["FaselHD"],
    }));

    return Promise.resolve({ streams: stremioStreams });
  } catch (error) {
    console.error(
      `[Stremio] Error handling stream request: ${error instanceof Error ? error.message : String(error)}`
    );
    return Promise.resolve({ streams: [] });
  }
});

export function createStremioRouter() {
  const router = express.Router();
  const addonInterface = builder.getInterface();

  // Serve the addon using the SDK router
  router.use("/", getRouter(addonInterface));

  // Custom manifest endpoint
  router.get("/manifest.json", (req, res) => {
    res.json(manifest);
  });

  // Stream endpoint
  router.get("/stream/:type/:id.json", async (req, res) => {
    try {
      const { type, id } = req.params;
      const result = await addonInterface.get({
        resource: "stream",
        type,
        id,
        extra: req.query,
      });
      res.json(result);
    } catch (error) {
      console.error("Stream endpoint error:", error);
      res.json({ streams: [] });
    }
  });

  return router;
}

export { manifest };
