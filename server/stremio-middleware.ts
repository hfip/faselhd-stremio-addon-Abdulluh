/**
 * Stremio Addon Middleware
 * Provides HTTP endpoints compatible with Stremio addon protocol
 */

import { Router, Request, Response } from "express";
import { getStreamsFromFaselHD } from "./faselhd";

const router = Router();

// Middleware to ensure proper CORS headers for Stremio
router.use((req: Request, res: Response, next) => {
  // Set CORS headers for Stremio compatibility
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Max-Age", "86400");
  res.header("Content-Type", "application/json");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// Manifest endpoint
router.get("/manifest.json", (req: Request, res: Response) => {
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

  res.json(manifest);
});

// Stream endpoint: /stream/{type}/{id}.json
router.get("/stream/:type/:id.json", async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params;
    const { season, episode } = req.query;

    console.log(
      `[Stremio API] Stream request: ${type} ${id}${season ? ` S${season}E${episode}` : ""}`
    );

    // Validate type
    if (type !== "movie" && type !== "series") {
      return res.json({ streams: [] });
    }

    // Extract IMDB ID
    let imdbId = id;
    if (imdbId.startsWith("tt")) {
      imdbId = imdbId;
    }

    // Parse season and episode for series
    let seasonNum: number | undefined;
    let episodeNum: number | undefined;

    if (type === "series" && season && episode) {
      seasonNum = parseInt(String(season), 10);
      episodeNum = parseInt(String(episode), 10);

      if (isNaN(seasonNum) || isNaN(episodeNum)) {
        return res.json({ streams: [] });
      }
    }

    // Get streams from FaselHD
    const streams = await getStreamsFromFaselHD(
      imdbId,
      type as "movie" | "series",
      seasonNum,
      episodeNum
    );

    // Convert to Stremio format
    const stremioStreams = streams.map((stream) => ({
      name: stream.name || "FaselHD",
      title: stream.title || "FaselHD",
      url: stream.url,
      sources: ["FaselHD"],
    }));

    res.json({ streams: stremioStreams });
  } catch (error) {
    console.error(
      `[Stremio API] Error: ${error instanceof Error ? error.message : String(error)}`
    );
    res.json({ streams: [] });
  }
});

// Catalog endpoint (optional, returns empty for now)
router.get("/catalog/:type/:id.json", (req: Request, res: Response) => {
  res.json({ metas: [] });
});

// Meta endpoint (optional, returns empty for now)
router.get("/meta/:type/:id.json", (req: Request, res: Response) => {
  res.json({ meta: null });
});

// Health check endpoint
router.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", addon: "FaselHD Stremio Addon" });
});

export default router;
