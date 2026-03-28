import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import express from "express";
import stremioMiddleware from "./stremio-middleware";

// Create a test Express app with the middleware
const createTestApp = () => {
  const app = express();
  app.use(express.json());
  // Enable CORS for testing
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  app.use("/api/stremio", stremioMiddleware);
  return app;
};

describe("Stremio Addon Integration Tests", () => {
  let app: express.Application;

  beforeEach(() => {
    app = createTestApp();
    vi.clearAllMocks();
  });

  describe("Manifest Endpoint", () => {
    it("should return valid manifest", async () => {
      const response = await request(app).get("/api/stremio/manifest.json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", "org.faselhd.stremio");
      expect(response.body).toHaveProperty("version", "1.0.0");
      expect(response.body).toHaveProperty("name", "FaselHD Stremio Addon");
      expect(response.body).toHaveProperty("types");
      expect(response.body.types).toContain("movie");
      expect(response.body.types).toContain("series");
      expect(response.body).toHaveProperty("resources");
      expect(response.body.resources[0]).toHaveProperty("name", "stream");
    });

    it("should have correct CORS headers", async () => {
      const response = await request(app).get("/api/stremio/manifest.json");

      expect(response.headers["access-control-allow-origin"]).toBe("*");
    });
  });

  describe("Stream Endpoint", () => {
    it("should accept movie stream requests", async () => {
      const response = await request(app)
        .get("/api/stremio/stream/movie/tt1254207.json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("streams");
      expect(Array.isArray(response.body.streams)).toBe(true);
    });

    it("should accept series stream requests", async () => {
      const response = await request(app)
        .get("/api/stremio/stream/series/tt0903747.json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("streams");
      expect(Array.isArray(response.body.streams)).toBe(true);
    });

    it("should handle series with season and episode", async () => {
      const response = await request(app)
        .get("/api/stremio/stream/series/tt0903747.json")
        .query({ season: "1", episode: "1" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("streams");
      expect(Array.isArray(response.body.streams)).toBe(true);
    });

    it("should return empty streams for invalid type", async () => {
      const response = await request(app)
        .get("/api/stremio/stream/invalid/tt1254207.json");

      expect(response.status).toBe(200);
      expect(response.body.streams).toEqual([]);
    });

    it("should return empty streams for non-existent content", async () => {
      const response = await request(app)
        .get("/api/stremio/stream/movie/tt0000000.json");

      expect(response.status).toBe(200);
      expect(response.body.streams).toEqual([]);
    });
  });

  describe("Catalog Endpoint", () => {
    it("should return catalog response", async () => {
      const response = await request(app)
        .get("/api/stremio/catalog/movie/default.json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("metas");
      expect(Array.isArray(response.body.metas)).toBe(true);
    });
  });

  describe("Meta Endpoint", () => {
    it("should return meta response", async () => {
      const response = await request(app)
        .get("/api/stremio/meta/movie/tt1254207.json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("meta");
    });
  });

  describe("Health Endpoint", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/api/stremio/health");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", "ok");
      expect(response.body).toHaveProperty("addon", "FaselHD Stremio Addon");
    });
  });

  describe("CORS Support", () => {
    it("should handle OPTIONS requests", async () => {
      const response = await request(app)
        .options("/api/stremio/manifest.json");

      expect(response.status).toBe(200);
      expect(response.headers["access-control-allow-origin"]).toBe("*");
      expect(response.headers["access-control-allow-methods"]).toContain("GET");
    });
  });

  describe("Error Handling", () => {
    it("should handle malformed requests gracefully", async () => {
      const response = await request(app)
        .get("/api/stremio/stream/movie/invalid-id.json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("streams");
    });

    it("should return valid JSON for all endpoints", async () => {
      const endpoints = [
        "/api/stremio/manifest.json",
        "/api/stremio/stream/movie/tt1254207.json",
        "/api/stremio/catalog/movie/default.json",
        "/api/stremio/health",
      ];

      for (const endpoint of endpoints) {
        const response = await request(app).get(endpoint);
        expect(response.status).toBe(200);
        expect(() => JSON.stringify(response.body)).not.toThrow();
      }
    });
  });

  describe("Stream Response Format", () => {
    it("should return streams with required fields", async () => {
      const response = await request(app)
        .get("/api/stremio/stream/movie/tt1254207.json");

      if (response.body.streams.length > 0) {
        const stream = response.body.streams[0];
        expect(stream).toHaveProperty("url");
        expect(stream).toHaveProperty("name");
        expect(stream).toHaveProperty("title");
      }
    });
  });
});
