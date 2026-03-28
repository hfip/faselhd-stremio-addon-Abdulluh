import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTmdbMeta, getStreamsFromFaselHD } from "./faselhd";

// Mock fetch globally
global.fetch = vi.fn();

describe("FaselHD Addon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getTmdbMeta", () => {
    it("should fetch movie metadata from TMDB", async () => {
      const mockResponse = {
        title: "Big Buck Bunny",
        original_title: "Big Buck Bunny",
        release_date: "2008-05-09",
        external_ids: {
          imdb_id: "tt1254207",
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getTmdbMeta("10378", "movie");

      expect(result).toEqual({
        title: "Big Buck Bunny",
        originalTitle: "Big Buck Bunny",
        year: "2008",
        imdbId: "tt1254207",
      });
    });

    it("should fetch series metadata from TMDB", async () => {
      const mockResponse = {
        name: "Breaking Bad",
        original_name: "Breaking Bad",
        first_air_date: "2008-01-20",
        external_ids: {
          imdb_id: "tt0903747",
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getTmdbMeta("1396", "series");

      expect(result).toEqual({
        title: "Breaking Bad",
        originalTitle: "Breaking Bad",
        year: "2008",
        imdbId: "tt0903747",
      });
    });

    it("should return null on TMDB API error", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await getTmdbMeta("invalid", "movie");

      expect(result).toBeNull();
    });
  });

  describe("getStreamsFromFaselHD", () => {
    it("should fetch streams for a movie", async () => {
      const mockResponse = {
        streams: [
          {
            name: "FaselHD",
            title: "FaselHD Stream",
            url: "https://example.com/stream1.mp4",
          },
          {
            name: "FaselHD HD",
            title: "FaselHD HD Stream",
            url: "https://example.com/stream2.mp4",
          },
        ],
      };

      // Mock the wakeup fetch
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      // Mock the actual stream fetch
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getStreamsFromFaselHD("tt1254207", "movie");

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: "FaselHD",
        title: "FaselHD Stream",
        url: "https://example.com/stream1.mp4",
      });
    });

    it("should fetch streams for a series episode", async () => {
      const mockResponse = {
        streams: [
          {
            name: "FaselHD",
            title: "FaselHD Stream",
            url: "https://example.com/episode.mp4",
          },
        ],
      };

      // Mock the wakeup fetch
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      // Mock the actual stream fetch
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getStreamsFromFaselHD("tt0903747", "series", 1, 1);

      expect(result).toHaveLength(1);
      expect(result[0]?.url).toBe("https://example.com/episode.mp4");
    });

    it("should return empty array when no streams are found", async () => {
      // Mock the wakeup fetch
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      // Mock the actual stream fetch with empty response
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ streams: [] }),
      });

      const result = await getStreamsFromFaselHD("tt0000000", "movie");

      expect(result).toEqual([]);
    });

    it("should return empty array on API error", async () => {
      // Mock the wakeup fetch
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      // Mock the actual stream fetch with error
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await getStreamsFromFaselHD("tt1254207", "movie");

      expect(result).toEqual([]);
    });
  });
});
