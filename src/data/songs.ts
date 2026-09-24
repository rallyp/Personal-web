/**
 * The top-20 list, in one place so the full page and the preview on
 * /thoughts can never disagree with each other.
 *
 * Transcribed from the Bear note of the same name. Bear lives on Rally's
 * Mac and the site builds on Cloudflare, so this is a copy rather than a
 * live link — re-sync it whenever the note changes.
 *
 * Empty rows render as placeholders; an entry with an artist but no song
 * shows the artist with the title still to come.
 */

export interface Song {
  song: string;
  artist: string;
  /** Optional line on why it's here. Shown on the full page only. */
  note?: string;
}

export const listTitle = 'My favorite 20 songs of all time';
export const listIntro = 'A list that will keep changing...';
export const listRule = 'Arbitrary rule: only one song per artist.';

export const songs: Song[] = [
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: '', artist: '' },
  { song: 'Just Like Heaven', artist: 'The Cure' },
  { song: 'These Are Days', artist: '10,000 Maniacs' },
  { song: 'Head Over Heels', artist: 'Tears For Fears' },
  { song: '', artist: '' },
  { song: '', artist: 'The Church' },
  { song: '', artist: '' },
  { song: 'Sultans of Swing', artist: 'Dire Straits' },
  { song: 'Crystal Ball', artist: 'Styx' },
  { song: 'Strange Condition', artist: 'Pete Yorn' },
  { song: 'In Your Eyes', artist: 'Peter Gabriel' },
  { song: 'Basement Apartment', artist: 'Sarah Harmer' },
  { song: '', artist: 'Sarah McLachlan' },
  { song: 'Don’t Get Your Back Up', artist: 'Sarah Harmer' },
  { song: 'Both Sides, Now', artist: 'Joni Mitchell' },
  { song: 'Elderly Woman Behind the Counter in a Small Town', artist: 'Pearl Jam' },
  { song: 'Ahead By a Century', artist: 'The Tragically Hip' },
  { song: '', artist: 'Bob Denver' },
];

/** True once a row has something in it. */
export const isFilled = (entry: Song) => Boolean(entry.song.trim() || entry.artist.trim());
