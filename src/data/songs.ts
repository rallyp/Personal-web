/**
 * The top-20 list and the working shortlist behind it, in one place so the
 * full page and the preview on /thoughts can never disagree.
 *
 * Transcribed from the Bear note of the same name. Bear lives on Rally's
 * Mac and the site builds on Cloudflare, so this is a copy rather than a
 * live link — re-sync it whenever the note changes.
 */

export interface Song {
  song: string;
  artist: string;
  /** Optional line on why it's here. Shown on the full page only. */
  note?: string;
}

export interface ShortlistEntry {
  artist: string;
  songs: string[];
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
  { song: '', artist: '' },
  { song: '', artist: 'Sarah McLachlan' },
  { song: 'Don’t Get Your Back Up', artist: 'Sarah Harmer' },
  { song: 'Both Sides, Now', artist: 'Joni Mitchell' },
  { song: 'Elderly Woman Behind the Counter in a Small Town', artist: 'Pearl Jam' },
  { song: 'Ahead By a Century', artist: 'The Tragically Hip' },
  { song: 'Take Me Home, Country Roads', artist: 'John Denver' },
];

/** Artists with more than one contender, and the songs in the running. */
export const shortlistIntro =
  'Artists with potentially multiple songs, and others still under consideration.';

export const shortlist: ShortlistEntry[] = [
  { artist: 'The Cure', songs: ['In Between Days', 'A Night Like This', 'Pictures of You', 'Letter To Elise'] },
  { artist: 'Sarah McLachlan', songs: ['Building A Mystery', 'Sweet Surrender'] },
  { artist: 'Sarah Harmer', songs: ['Basement Apartment', 'Don’t Get Your Back Up'] },
  { artist: 'The Church', songs: ['Almost With You', 'Just For You', 'Myrrh', 'Under The Milky Way', 'Feel'] },
  { artist: 'The Tragically Hip', songs: ['Courage', 'Ahead By a Century'] },
  { artist: 'Tears For Fears', songs: ['The Working Hour', 'Head Over Heels', 'Good Night Song'] },
  { artist: 'The Reivers', songs: ['Once In Awhile', 'Atlantic City', 'Ragamuffin Man'] },
  { artist: 'Styx', songs: ['Crystal Ball', 'Fooling Yourself', 'Come Sail Away', 'Lady', 'Lights'] },
  { artist: 'Joe Jackson', songs: ['Steppin’ Out', 'Is She Really Going With Him'] },
  { artist: 'George Michael', songs: ['Careless Whisper', 'Last Christmas'] },
];

export const alsoConsidering: Song[] = [
  { song: 'Stairway to Heaven', artist: 'Led Zeppelin' },
  { song: 'Dreams', artist: 'Fleetwood Mac' },
  { song: 'Steppin’ Out', artist: 'Joe Jackson' },
];

/** True once a row has anything in it at all. */
export const isFilled = (entry: Song) => Boolean(entry.song.trim() || entry.artist.trim());

/** True only once a song has actually been chosen for that rank. */
export const hasSong = (entry: Song) => Boolean(entry.song.trim());
