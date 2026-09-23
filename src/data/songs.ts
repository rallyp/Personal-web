/**
 * The top-20 list, in one place so the full page and the preview on
 * /thoughts can never disagree with each other.
 *
 * This is a copy of the Bear note, not a live link to it — Bear lives on
 * Rally's Mac and the site is built on Cloudflare, which can't reach it.
 * Fill in `song` and `artist` and both pages update.
 */

export interface Song {
  song: string;
  artist: string;
  /** Optional line on why it's here. Shown on the full page only. */
  note?: string;
}

export const listTitle = 'My 20 top songs of all time';
export const listIntro = 'A list that will keep changing...';

export const songs: Song[] = [
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
];

/** True once a row has something in it. */
export const isFilled = (entry: Song) => Boolean(entry.song.trim() || entry.artist.trim());
