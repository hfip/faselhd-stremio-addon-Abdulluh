/**
 * FaselHD API Service
 * Handles communication with FaselHD API and TMDB for metadata
 */

const TMDB_API_KEY = "439c478a771f35c05022f9feabcca01c";
const TMDB_API_BASE = "https://api.themoviedb.org/3";
const FASELHD_API_URL = "https://faselhdx.onrender.com";

export interface TmdbMetadata {
  title: string;
  originalTitle: string;
  year: string;
  imdbId: string;
}

export interface FaselHDStream {
  name?: string;
  title?: string;
  url: string;
}

/**
 * Get metadata from TMDB API
 */
export async function getTmdbMeta(
  tmdbId: string,
  mediaType: "movie" | "series"
): Promise<TmdbMetadata | null> {
  try {
    const type = mediaType === "movie" ? "movie" : "tv";
    const url = `${TMDB_API_BASE}/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=external_ids`;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!resp.ok) {
      console.error(`[FaselHD] TMDB error: ${resp.status}`);
      return null;
    }

    const data = await resp.json();

    const title = data.title || data.name || "";
    const originalTitle = data.original_title || data.original_name || "";
    let year = "";

    if (data.release_date) {
      year = data.release_date.split("-")[0];
    } else if (data.first_air_date) {
      year = data.first_air_date.split("-")[0];
    }

    let imdbId = "";
    if (data.external_ids?.imdb_id) {
      imdbId = data.external_ids.imdb_id;
    } else if (data.imdb_id) {
      imdbId = data.imdb_id;
    }

    return { title, originalTitle, year, imdbId };
  } catch (error) {
    console.error(
      `[FaselHD] TMDB error: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}

/**
 * Get streams from FaselHD API
 */
export async function getStreamsFromFaselHD(
  imdbId: string,
  mediaType: "movie" | "series",
  season?: number,
  episode?: number
): Promise<FaselHDStream[]> {
  try {
    console.log(
      `[FaselHD] Request: ${mediaType} ${imdbId}${season ? ` S${season}E${episode}` : ""}`
    );

    // Wake up the API
    const wakeup = fetch(`${FASELHD_API_URL}/manifest.json`).catch(() => {});

    const stremioType = mediaType === "movie" ? "movie" : "series";
    let stremioId = imdbId;

    if (stremioType === "series" && season && episode) {
      stremioId += `:${season}:${episode}`;
    }

    const apiUrl = `${FASELHD_API_URL}/streams/${stremioType}/${stremioId}.json`;
    console.log(`[FaselHD] API: ${apiUrl}`);

    await wakeup;

    const resp = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!resp.ok) {
      console.error(`[FaselHD] API error: ${resp.status}`);
      return [];
    }

    const data = await resp.json();

    if (!data.streams || data.streams.length === 0) {
      console.log("[FaselHD] No streams from API");
      return [];
    }

    const streams: FaselHDStream[] = [];
    for (const s of data.streams) {
      streams.push({
        name: s.name || "FaselHD",
        title: s.title || "FaselHD",
        url: s.url,
      });
    }

    console.log(`[FaselHD] ${streams.length} stream(s) found`);
    return streams;
  } catch (error) {
    console.error(
      `[FaselHD] Error: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }
}

/**
 * Get streams for a specific content
 */
export async function getStreams(
  imdbId: string,
  mediaType: "movie" | "series",
  season?: number,
  episode?: number
): Promise<FaselHDStream[]> {
  return getStreamsFromFaselHD(imdbId, mediaType, season, episode);
}
