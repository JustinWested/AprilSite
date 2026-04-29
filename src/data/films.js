// Single source of truth for all film data.
// Used by both the homepage film strip and the All Films page (/films).
// Each film object drives the shared FilmModal component.
//
// Film shape:
//   id, title, aprilCredit, posterSrc, bannerSrc,
//   trailerUrl, watchLabel, trailerThumbnail (for non-YouTube trailers),
//   facebookEmbed (Facebook iframe src — used when trailerUrl is null),
//   synopsis, genres[],
//   accolades[{ festivalName, wins[], nominations[], officialSelections[] }],
//   pressLinks[{ publication, url }],
//   credits[{ role, name }],
//   whereToWatch (optional)
//
// Sections auto-hide when empty — leave accolades/pressLinks/credits as []
// (or omit entirely) to skip them in the modal.
//
// Order in this array drives both the All Films grid AND the homepage
// film poster strip — both pages map directly over `films`.

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
        publication: 'Morbidly Beautiful',
        url: 'https://morbidlybeautiful.com/genreblast-2023-horror-comedy-shorts/',
      },
    ],
    credits: [
      { role: 'Produced by', name: 'April Yanko, Justin Wested, Nikki Neurohr, Allison Marie Reyes, Rory Ross' },
      { role: 'Production Companies', name: 'Artie the Augury, Little Pinwheel Productions, VisionRey' },
      { role: 'Cinematography', name: 'Caleb Fischer' },
      { role: 'Actors', name: 'Jason Sealy, Elena Falgione, Cassie the Butt' },
      { role: 'Production Design', name: 'Kayla Riplon' },
      { role: 'Editors', name: 'April Yanko, Justin Wested' },
      { role: 'Puppeteering', name: 'Benjamin Carlucci, April Yanko' },
      { role: 'Music', name: 'Anthony Lucca' },
    ],
    whereToWatch: null,
  },

  {
    id: 'idlehands',
    title: 'Idle Hands Training Video',
    aprilCredit: 'Written by April Yanko',
    posterSrc: '/images/films/idlehandsposter.jpeg',
    bannerSrc: '/images/films/idlehands bottom banner.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=V2sBslwNV6A',
    watchLabel: 'Watch the Film',
    synopsis:
      "You, valued employee, are watching the Idle Hands Training Video. Whether you're a new hire or assigned Mandatory ReEducation, we look forward to instructing you on how to possess our goods while keeping yourself free of sin.",
    genres: ['Dark Comedy', 'Training Video'],
    accolades: [
      {
        festivalName: '48 Hour Comedy Horror Film Project — Los Angeles',
        wins: [
          'Best Writing',
          'Best Directing',
          'Best Film',
          'Best Actress',
          'Best Visual Effects',
          'Audience Choice',
        ],
        nominations: [
          'Best Production Design',
          'Best Use of Genre',
          'Best Practical Effects',
          'Best Score',
          'Best Acting Ensemble',
          'Best Supporting Actor — Conrad Wrobel',
          'Best Actor — Brian Barlow',
          'Best Editing',
          'Runner Up Best Cinematography',
        ],
        officialSelections: [],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Directed by', name: 'Scott McKinney' },
      { role: 'Production Company', name: 'VisionRey' },
      { role: 'Produced by', name: 'Allison Marie Reyes, Spencer Tuel, Gregg Lawson, Grace Liu, Conrad Wrobel, Adam Lower' },
      { role: 'Actors', name: 'Anna Telfer, Brian Barlow, Conrad Wrobel, Ambrose Burzak, Dorian Burks, Hannah Choi, Sierra Sterling' },
      { role: 'Cinematography', name: 'Christine Mouton' },
      { role: 'Production Design', name: 'Euree Hong' },
      { role: 'Sound', name: 'Mike Walker' },
      { role: 'Editor', name: 'Michael Filippi' },
      { role: 'Music', name: 'Ryan Fultz' },
    ],
    whereToWatch: null,
  },

  {
    id: 'dave',
    title: 'The Infinite Wisdom of Dave the Unicorn',
    aprilCredit: 'Written by April Yanko',
    posterSrc: '/images/films/Dave the Unicorn Poster.png',
    bannerSrc: '/images/films/Dave the Unicorn bottom banner v3.png',
    trailerUrl: 'https://www.youtube.com/watch?v=UXw0KppL2XY',
    watchLabel: 'Watch the Trailer',
    synopsis:
      'A college student, her secret crush, and her imaginary friend attend a house party.',
    genres: ['Rom Com', 'LGBTQ+'],
    accolades: [
      {
        festivalName: 'Yes We Cannes Global Film Challenge',
        wins: [],
        nominations: ['Best Writing', 'Best Supporting Actor — Conrad Wrobel'],
        officialSelections: ['Advanced to Filmapalooza — Top 15 Worldwide'],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Directed by', name: 'Michael Filippi' },
      { role: 'Produced by', name: 'Allison Marie Reyes, Spencer Tuel, Grace Liu, Gregg Lawson' },
      { role: 'Actors', name: 'Nabila Hossain, Leah Jarvik, DeMark Thompson, Conrad Wrobel' },
      { role: 'Cinematography', name: 'Christine Mouton' },
    ],
    whereToWatch: null,
  },

  {
    id: 'thisisagarden',
    title: 'this is a garden',
    aprilCredit: 'Written & Co-Directed by April Yanko',
    posterSrc: '/images/films/GardenPoster.webp',
    bannerSrc: '/images/films/gardenhead.webp',
    trailerUrl: 'https://www.youtube.com/watch?v=b4eXILF8CIE',
    watchLabel: 'Watch the Film',
    synopsis:
      "After two friends realize they're relaxing over a dead person in a graveyard, they start to muse on what it's like to be alive after a loved one is gone.",
    genres: ['Dramedy', 'Mumblecore', 'LGBTQ+'],
    accolades: [
      {
        festivalName: 'ALTFF',
        wins: ['Best Cast'],
        nominations: [],
        officialSelections: [],
      },
      {
        festivalName: 'Official Selections',
        wins: [],
        nominations: [],
        officialSelections: [
          'Pittsburgh Uncut',
          'The Life-Off Sessions, Atlanta',
          'Indie Oaks Film Festival',
          'My True Colors Festival',
        ],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Produced by', name: 'April Yanko, Justin Wested, Benjamin Carlucci; Associate Producer: Mark Scuibba' },
      { role: 'Production Company', name: 'Bit Sized Productions' },
      { role: 'Co-Directed by', name: 'Benjamin Carlucci' },
      { role: 'Cinematography', name: 'Garrett J. Langer' },
      { role: 'Actors', name: 'April Yanko, Jess Paul' },
      { role: 'Script Supervision', name: 'Peter J.S. Regan' },
      { role: 'Sound', name: 'Susannah Carlucci, Sam Ferguson' },
      { role: 'Editor', name: 'Maible N.J. Winston' },
    ],
    whereToWatch: null,
  },

  {
    id: 'pullingplugmom',
    title: 'Pulling the Plug on Mom',
    aprilCredit: 'Written & Directed by April Yanko',
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
        festivalName: 'Official Selections',
        wins: [],
        nominations: [],
        officialSelections: [
          'Atlanta After Dark',
          'Laughing Dog Comedy Film Festival',
          'Spark Micro Short Film Festival',
          'Golden Giraffe International Film Festival',
          'FLICKFAIR Film Festival',
        ],
      },
      {
        festivalName: 'Austin Revolution Film Festival',
        wins: ['Best Produced Short'],
        nominations: ['Best Comedy Short', 'Best Writer/Director'],
        officialSelections: [],
      },
      {
        festivalName: 'Nominated Best Comedy Short',
        wins: [],
        nominations: [
          'Red Dirt International Film Festival',
          'Austin Micro Film Festival',
          'Cannes Shorts',
        ],
        officialSelections: [],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Produced by', name: 'April Yanko, Justin Wested' },
      { role: 'Production Company', name: 'Artie the Augury' },
      { role: 'Cinematography', name: 'Kayla Riplon' },
      { role: 'Actors', name: 'April Yanko, Jill Bradshaw, Maggie Gagliardi, Cecily Gish, Rachael Klein' },
      { role: 'Editor', name: 'Kayla Riplon' },
    ],
    whereToWatch: null,
  },

  {
    id: 'norman',
    title: 'Norman',
    aprilCredit: 'Written by April Yanko',
    posterSrc: '/images/films/NormanPoster.webp',
    bannerSrc: '/images/films/normanhead.webp',
    trailerUrl: 'https://www.youtube.com/watch?v=XEdSmMWMXhc',
    watchLabel: 'Watch the Film',
    synopsis:
      'A man agrees to help a dying plant live out his last wish.',
    genres: ['Buddy Film', 'Fantasy', 'Comedy'],
    accolades: [
      {
        festivalName: '48 Hour Film Project Los Angeles',
        wins: ['Winner — Pajama Party Screening'],
        nominations: [],
        officialSelections: [],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Directed by', name: 'T.C. De Witt' },
      { role: 'Produced by', name: 'Allison Marie Reyes, Conrad Wrobel, Tasha Wrobel' },
      { role: 'Actors', name: 'Jonny Rojas, Zamara Jimenez, Conrad Wrobel' },
      { role: 'Cinematography', name: 'Mannon Butt' },
      { role: 'Editor', name: 'Paul Moore' },
      { role: 'Music', name: 'Austin Ali' },
    ],
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
      'When a family finds their aunt facedown in her plate of food, one wide-eyed self-proclaimed sleuth decides the intricate mystery to solve rests in his delicate hands.',
    genres: ['Mystery', 'Comedy'],
    accolades: [
      {
        festivalName: '48 Hour Film Project — Los Angeles',
        wins: [],
        nominations: [
          'Best Actor',
          'Best Ensemble',
          'Best Woman in Film',
          'Best Score',
          'Best Screenplay',
          'Best Use of Line',
          'Best Directing',
          'Best Picture',
        ],
        officialSelections: [],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Co-Director', name: 'Michael Filippi' },
      { role: 'Producers', name: 'Allison Marie Reyes, Conrad Wrobel, Rory Ross, Tasha Wrobel & Marissa Messiano' },
      { role: 'Editor', name: 'Paul Moore' },
      { role: 'Costumes/Props', name: 'Ambrose Burzak' },
      { role: 'Starring', name: 'Ariel Staehle, Aubrey Chantelle, Conrad Wrobel, Max Cutler, Rory Ross & Zamara Jimenez' },
      { role: 'Cinematographer', name: 'Mannon Butt' },
      { role: 'Composer', name: 'Austin Ali' },
    ],
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
      'A friend needs someone to shoot him after getting bit by a zombie. But maybe…we can just wait it out?',
    genres: ['Dark Comedy'],
    accolades: [
      {
        festivalName: '48 Horror/Comedy Film Project — Los Angeles',
        wins: ['Runner Up Best Film', 'Best Writing'],
        nominations: [],
        officialSelections: [],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Directed by', name: 'Michael Filippi' },
      { role: 'Produced by', name: 'Allison Marie Reyes, Gregg Lawson' },
      { role: 'Actors', name: 'Zachary Lichaa, Faye Klapperich, Aubrey Chantelle, Nick Garabedian' },
      { role: 'Cinematography', name: 'Christine Mouton' },
      { role: 'Sound', name: 'Mike Walker' },
      { role: 'Editor', name: 'Leslie René Castro' },
      { role: 'Music', name: 'Austin Ali' },
    ],
    whereToWatch: null,
  },

  {
    id: 'woodworking',
    title: 'Woodworking',
    aprilCredit: 'Written & Directed by April Yanko',
    posterSrc: '/images/films/woodworking poster v1.png',
    bannerSrc: '/images/films/woodwork bottombanner.jpg',
    // No real trailer — link straight to IMDB. Use the still frame in the
    // root images folder as a faux thumbnail so the modal renders the
    // click-to-link tile (same pattern as Pulling the Plug on Mom etc.).
    trailerUrl: 'https://www.imdb.com/title/tt32872999/',
    trailerThumbnail: '/images/woodworking.jpg',
    watchLabel: 'View on IMDB',
    synopsis:
      'While leaving the woods, a woman finds a lost camera with some oddly disturbing pictures.',
    genres: ['Comedy Horror', 'Sketch'],
    accolades: [
      {
        festivalName: 'Austin Revolution Film Festival',
        wins: ['Best Comedy Short'],
        nominations: [],
        officialSelections: [],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Produced by', name: 'April Yanko, Justin Wested' },
      { role: 'Actors', name: 'April Yanko, Christian B Schmidt' },
      { role: 'Cinematography', name: 'Michael Filippi' },
      { role: 'Production & Costume Design', name: 'Kayla Riplon' },
      { role: 'Editors', name: 'April Yanko, Justin Wested, Michael Filippi' },
      { role: 'Music', name: 'Christian B Schmidt' },
    ],
    whereToWatch: null,
  },

  {
    id: 'jamieisalone',
    title: 'Jamie is Alone',
    aprilCredit: 'Written by April Yanko',
    posterSrc: '/images/films/jamie is alone poster.jpeg',
    bannerSrc: '/images/films/jamie is alone bottom banner.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=yYCf_avcIw4',
    watchLabel: 'Watch the Film',
    synopsis:
      'A weary technician, abandoned at an outpost in space, must decide if he should carry out his mission duties or save his only chance at companionship.',
    genres: ['Dramedy', 'Sci-Fi'],
    accolades: [
      {
        festivalName: 'Yes We Cannes Global Film Challenge',
        // Final order: wins (none) -> officialSelections -> nominations.
        wins: [],
        officialSelections: [
          'Top 15 Worldwide — Advanced to Filmapalooza',
          'Screened at the Cannes 48HFP Curated Short Film Corner',
        ],
        nominations: ['Best Makeup', 'Best Use of Genre'],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Directed by', name: 'Scott McKinney' },
      { role: 'Produced by', name: 'Allison Marie Reyes, Spencer Tuel, Samantha Alvarado, Nicki Bourgo, Heather Marie Bruce, Conrad Wrobel, Grace Liu' },
      { role: 'Actors', name: 'Conrad Wrobel, Brett Richard Kelly' },
      { role: 'Cinematography', name: 'Christine Mouton' },
      { role: 'Sound', name: 'Mike Walker, Levon Guaderrama' },
      { role: 'Editors', name: 'Minica Casbara, Anthony Cally, Leslie René Castro' },
      { role: 'VFX', name: 'Michael Filippi' },
      { role: 'Music', name: 'Ryan Fultz' },
    ],
    whereToWatch: null,
  },

  {
    id: 'poorcompany',
    title: 'Poor Company',
    aprilCredit: 'Written by & Starring April Yanko',
    posterSrc: '/images/films/poorcompany poster.jpeg',
    bannerSrc: '/images/films/poorcompany bottom banner.jpg',
    trailerUrl: null,
    watchLabel: null,
    // Facebook embed — the modal renders this as an iframe directly when
    // trailerUrl is null and facebookEmbed is present.
    facebookEmbed:
      'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F48hourfilmla%2Fvideos%2F1331317934492810%2F&show_text=false&width=560&t=0',
    synopsis:
      "An outsider meets their friend's eccentric family, slowly becoming more aware that they may not just be out of touch, but dangerous.",
    genres: ['Dark Comedy'],
    accolades: [
      {
        festivalName: 'Austin Revolution Film Festival',
        wins: [],
        nominations: [],
        officialSelections: ['Official Selection'],
      },
    ],
    pressLinks: [],
    credits: [
      { role: 'Directed by', name: 'Michael Filippi' },
      { role: 'Produced by', name: 'Allison Marie Reyes, Spencer Tuel, Gregg Lawson, Conrad Wrobel, Grace Liu, Kevin Young' },
      { role: 'Actors', name: 'April Yanko, Ambrose Burzak, Harvey Bickett, Aubrey Chantelle, Conrad Wrobel' },
      { role: 'Cinematography', name: 'Drew Tieng' },
      { role: 'Editors', name: 'Michael Filippi, Leslie René Castro' },
      { role: 'Music', name: 'Whose' },
    ],
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
