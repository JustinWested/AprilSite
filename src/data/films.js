// Single source of truth for all film data.
// Used by both the homepage film strip and the All Films page (/films).
// Each film object drives the shared FilmModal component.
//
// Film shape:
//   id, title, aprilCredit, posterSrc, bannerSrc,
//   trailerUrl, watchLabel, trailerThumbnail (for non-YouTube trailers),
//   synopsis, genres[],
//   accolades[{ festivalName, wins[], nominations[], officialSelections[] }],
//   pressLinks[{ publication, url }],
//   whereToWatch (optional)
//
// Sections auto-hide when empty — leave accolades/pressLinks as [] to omit.

export const films = [
  {
    id: 'buttstuff',
    title: 'Butt Stuff',
    aprilCredit: 'Written & Directed by April Yanko',
    posterSrc: '/images/films/ButtStuffPoster.webp',
    bannerSrc: '/images/films/Cassiehead.webp',
    trailerUrl: 'https://www.youtube.com/watch?v=e5r4tf0Hiqs',
    watchLabel: 'Watch the Trailer',
    synopsis:
      "A man's sentient sex toy becomes jealous when its owner forms a relationship with a human woman.",
    genres: ['Comedy', 'Horror', 'Rom-Com'],
    accolades: [
      {
        festivalName: 'GenreBlast Film Festival',
        wins: [],
        nominations: ['Best Comedy Short', 'Best Short Film Poster'],
        officialSelections: [],
      },
      {
        festivalName: 'BroadHumor Film Festival',
        wins: ['Best Short'],
        nominations: [],
        officialSelections: [],
      },
      {
        festivalName: 'Austin Revolution Film Festival',
        wins: ['Best Comedy Short', 'Best Cinematography Short'],
        nominations: ['Best Produced Short'],
        officialSelections: [],
      },
      {
        festivalName: 'Official Selections',
        wins: [],
        nominations: [],
        officialSelections: ['Dances With Films', 'Tonkawa Film Festival'],
      },
    ],
    pressLinks: [
      {
        publication: 'Indie Activity',
        url: 'https://www.indieactivity.com/butt-stuff-horror-comedy-short-at-2023-dances-with-films-festival/',
      },
      {
        publication: 'We Are Moving Stories',
        url: 'https://www.wearemovingstories.com/we-are-moving-stories-films/2023/6/6/butt-stuff',
      },
      {
        publication: 'Morbidly Beautiful',
        url: 'https://morbidlybeautiful.com/genreblast-2023-horror-comedy-shorts/',
      },
    ],
    whereToWatch: null,
  },

  {
    id: 'thisisagarden',
    title: 'this is a garden',
    aprilCredit: 'Co-Directed & Written by April Yanko',
    posterSrc: '/images/films/GardenPoster.webp',
    bannerSrc: '/images/films/gardenhead.webp',
    trailerUrl: 'https://www.youtube.com/watch?v=b4eXILF8CIE',
    watchLabel: 'Watch the Film',
    synopsis:
      "After two friends realize they're relaxing over a dead person in a graveyard, they start to muse on what it's like to be alive after a loved one is gone.",
    genres: ['Dramedy', 'Mumblecore', 'LGBTQ+'],
    accolades: [],
    pressLinks: [],
    whereToWatch: null,
  },

  {
    id: 'pullingplugmom',
    title: 'Pulling the Plug on Mom',
    aprilCredit: 'Created & Edited by April Yanko',
    posterSrc: '/images/films/MomPoster.webp',
    bannerSrc: '/images/films/plughead.webp',
    trailerUrl: 'https://www.instagram.com/p/CZIuyHbBcfo/',
    trailerThumbnail: '/images/films/plugprod/pullingtheplugprod (7).webp',
    watchLabel: 'Watch the Trailer',
    synopsis:
      "A woman gathers her sisters to tell them she's going to pull the plug on their mom…who is not in the hospital.",
    genres: ['Dark Comedy', 'Absurdist', 'Sketch'],
    accolades: [
      {
        festivalName: 'GenreBlast Film Festival',
        wins: [],
        nominations: ['Best Comedy Short', 'Best Short Film Poster'],
        officialSelections: [],
      },
      {
        festivalName: 'BroadHumor Film Festival',
        wins: ['Best Short'],
        nominations: [],
        officialSelections: [],
      },
      {
        festivalName: 'Austin Revolution Film Festival',
        wins: ['Best Comedy Short', 'Best Cinematography Short'],
        nominations: ['Best Produced Short'],
        officialSelections: [],
      },
      {
        festivalName: 'Official Selections',
        wins: [],
        nominations: [],
        officialSelections: ['Dances With Films', 'Tonkawa Film Festival'],
      },
    ],
    pressLinks: [],
    whereToWatch: null,
  },

  {
    id: 'norman',
    title: 'Norman',
    aprilCredit: 'Written by April Yanko',
    posterSrc: '/images/films/NormanPoster.webp',
    bannerSrc: '/images/films/normanhead.webp',
    trailerUrl: 'https://www.instagram.com/p/ChZ1hybMYz0/',
    trailerThumbnail: '/images/films/normprod/norman.webp',
    watchLabel: 'Watch the Trailer',
    synopsis:
      'A man agrees to help a dying plant live out his last wish. Made for the 48 Hour Film Project in LA.',
    genres: ['Buddy Film', 'Fantasy', 'Comedy'],
    accolades: [],
    pressLinks: [],
    whereToWatch: null,
  },

  {
    id: 'murder',
    title: 'Murder is on the Table',
    aprilCredit: 'Co-Directed & Written by April Yanko',
    posterSrc: '/images/films/MurderPoster.webp',
    bannerSrc: '/images/films/murderhead.webp',
    trailerUrl: 'https://www.instagram.com/p/Cwf1-H6uqtx/',
    trailerThumbnail: '/images/films/murderprod/murder is on the table prod1.webp',
    watchLabel: 'Watch the Trailer',
    synopsis:
      'When a family finds their aunt facedown in her plate of food, one wide-eyed self-proclaimed sleuth decides the intricate mystery to solve rests in his delicate hands. Made for the 48 Hour Film Project in LA.',
    genres: ['Mystery', 'Comedy'],
    accolades: [
      {
        festivalName: '48 Hour Film Project LA',
        wins: [],
        nominations: [
          'Best of Los Angeles',
          'Best Film',
          'Best Writing',
          'Best Direction',
          'Best Lead Actor',
          'Best Acting Ensemble',
          'Best Musical Score',
          'Female Filmmaker of the Year',
        ],
        officialSelections: [],
      },
    ],
    pressLinks: [],
    whereToWatch: null,
  },

  {
    id: 'biteme',
    title: 'Bite Me',
    aprilCredit: 'Written by April Yanko',
    posterSrc: '/images/films/biteme/bite me poster.webp',
    bannerSrc: '/images/films/biteme/Bite Me Still 12-01.png',
    trailerUrl: 'https://www.youtube.com/watch?v=ekOhQgg1nMI',
    watchLabel: 'Watch the Trailer',
    synopsis:
      'A friend needs someone to shoot him after getting bit by a zombie. But maybe…we can just wait it out? Made for the Horror/Comedy 48 Hour Film Project in LA.',
    genres: ['Dark Comedy'],
    accolades: [
      {
        festivalName: '48 Horror/Comedy Film Project',
        wins: [
          '2nd Runner Up Best Film',
          'Runner Up Best Writing',
          'Best Graphics',
          'Audience Choice',
        ],
        nominations: [
          'Best Use of Character',
          'Best Makeup',
          'Best Practical Effects',
          'Best Acting Ensemble',
          'Best Supporting Actresses',
          'Best Supporting Actors',
          'Best Editing',
          'Best Directing',
        ],
        officialSelections: [],
      },
    ],
    pressLinks: [],
    whereToWatch: null,
  },
];

// Helper to extract YouTube video ID from a full URL.
// Returns null for non-YouTube URLs (e.g. Instagram), which the modal
// uses to decide between embedded thumbnail player vs. external link button.
export function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
  return match ? match[1] : null;
}
