/** Pull a YouTube video ID out of any common URL form. */
export function getYoutubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube-nocookie\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

/** Pull a Vimeo numeric video ID out of any Vimeo URL. */
function getVimeoId(url: string): string | null {
  const m =
    url.match(/player\.vimeo\.com\/video\/(\d+)/) || url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

export type EmbedOptions = {
  /** Start playback after the iframe loads (use only after a user click). */
  autoplay?: boolean;
  /** Required by YouTube when autoplaying; pass `window.location.origin`. */
  origin?: string;
};

/**
 * Normalize any YouTube / Vimeo URL into an iframe-embeddable URL.
 *
 * Playback controls stay visible so the user can play / pause / scrub.
 * Load the iframe only after a click and pass `autoplay` + `origin` so
 * YouTube does not treat the request as automated traffic.
 */
export function toEmbedUrl(url: string, options?: EmbedOptions): string {
  const yt = getYoutubeId(url);
  if (yt) {
    const params = new URLSearchParams({
      controls: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      iv_load_policy: "3",
      cc_load_policy: "0",
      enablejsapi: "1",
    });
    if (options?.autoplay) params.set("autoplay", "1");
    if (options?.origin) params.set("origin", options.origin);
    return `https://www.youtube.com/embed/${yt}?${params.toString()}`;
  }
  const vm = getVimeoId(url);
  if (vm) {
    const params = new URLSearchParams({
      title: "0",
      byline: "0",
      portrait: "0",
      badge: "0",
      autopause: "0",
      controls: "1",
      dnt: "1",
    });
    if (options?.autoplay) params.set("autoplay", "1");
    return `https://player.vimeo.com/video/${vm}?${params.toString()}`;
  }
  return url;
}

/** Open the source video on YouTube / Vimeo (fallback when embed is blocked). */
export function toWatchUrl(url: string): string {
  const yt = getYoutubeId(url);
  if (yt) return `https://www.youtube.com/watch?v=${yt}`;
  const vm = getVimeoId(url);
  if (vm) return `https://vimeo.com/${vm}`;
  return url;
}

/** Fast static preview image for a YouTube or Vimeo source URL. */
export function toVideoPreviewUrl(url: string): string | null {
  const yt = getYoutubeId(url);
  if (yt) return `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`;
  const vm = getVimeoId(url);
  if (vm) return `https://vumbnail.com/${vm}.jpg`;
  return null;
}
