import PageLayout from '../../components/PageLayout/PageLayout';
import Carousel from '../../components/Carousel/Carousel';
import styles from './HomePage.module.css';

const SLIDES = [
  {
    image: '/images/indeximages/image1.webp',
    title: 'Butt Stuff — World Premiere',
    html: `Butt Stuff makes its world premiere in the 26th annual Dances With Films at the historic TCL Chinese Theater in Los Angeles! <a href="https://youtu.be/e5r4tf0Hiqs" target="_blank" rel="noopener noreferrer">Watch the trailer here!</a> &nbsp;<a href="/buttstuff">Go to film page</a>`,
  },
  {
    image: '/images/indeximages/image4.webp',
    title: 'this is a garden — Now on YouTube',
    html: `My first film, "this is a garden," is now on YouTube with 32,000 views and counting! You can watch it here: <a href="https://www.youtube.com/watch?v=b4eXILF8CIE" target="_blank" rel="noopener noreferrer">"this is a garden"</a>`,
  },
  {
    image: '/images/indeximages/image5.webp',
    title: 'Pulling the Plug on Mom — Festival Run',
    html: `"Pulling the Plug on Mom" continues its festival run, most recently getting a nomination for Best Comedy at Cannes Shorts! <a href="/pullingplugmom">Go to film page</a>`,
  },
  {
    image: '/images/indeximages/image6.webp',
    title: 'The Party — Now Streaming',
    html: `I star as Newbie/Viola in the D&D webseries "The Party," whose 1st season features Ally Beardsley, Becca Scott, Vince Caso from The Guild. All episodes are now available on YouTube. <a href="https://www.youtube.com/watch?v=mLMrE2Im9vw" target="_blank" rel="noopener noreferrer">Watch Episode 1 here!</a>`,
  },
  {
    image: '/images/indeximages/image7.webp',
    title: 'Butt Stuff — GenreBlast Top 10',
    html: `Butt Stuff chosen as Top 10 short at GenreBlast by Morbidly Beautiful!<br><br>"A standout short...combining the sentimental with the "super effing weird" to create something unforgettable." —Peter Hayward-Bailey. <a href="https://morbidlybeautiful.com/genreblast-2023-horror-comedy-shorts/" target="_blank" rel="noopener noreferrer">Read Here</a>`,
  },
  {
    image: '/images/indeximages/image8.webp',
    title: 'Kickball at the Pack Theater',
    html: `I regularly write and perform sketch for the House Team Kickball at the Pack Theater. <a href="https://www.youtube.com/playlist?list=PLMf0z8lyC0tO1-8fwdeGi8SvX-Lae8Y-R" target="_blank" rel="noopener noreferrer">Click here</a> for a playlist of all my sketches, including lots of musical parodies.`,
  },
  {
    image: '/images/indeximages/image9.webp',
    title: 'The Party — Q&A with Geneva K Willis',
    html: `I sat down with co-creator of The Party Geneva K Willis to answer viewer questions and talk all things D&D. <a href="https://www.youtube.com/watch?v=BT5QqcMrDJk" target="_blank" rel="noopener noreferrer">Check it out here.</a>`,
  },
  {
    image: '/images/indeximages/image10.webp',
    title: 'Murder is on the Table — LA 48 Hour Film Fest',
    html: `Murder is on the Table got a bunch of award noms at the LA 48 Hour Film Festival, including Best Writing and Best Film! <a href="https://www.instagram.com/p/Cwf1-H6uqtx/" target="_blank" rel="noopener noreferrer">Watch the trailer here.</a>`,
  },
];

const FUN_FACTS = [
  {
    text: 'If you know Pennsylvania, I am from Johnstown, land of floods. If you don\'t, I am from Pittsburgh, land of potholes.',
    variant: 'noteYellow',
  },
  {
    text: 'I went to the National Theater Institute at the Eugene O\'Neill Theater Center where I learned how to create in all aspects of theater AND how to do it while concussed.',
    variant: 'noteWhite',
  },
  {
    text: 'I have made several films, including this is a garden, Butt Stuff, and Pulling the Plug on Mom.',
    variant: 'noteTeal',
  },
  {
    text: "I star in the D&D webseries 'The Party' where I play Newbie/Viola, an enchantment wizard who secretly uses her tablemates as research for her thesis.",
    variant: 'notePink',
  },
  {
    text: 'I perform on the sketch house team Kickball at the Pack Theater every 4th Saturday in Hollywood.',
    variant: 'noteYellow',
  },
  {
    text: 'I am the love child of Michael Cera and Andy Samburg.',
    variant: 'noteWhite',
  },
];

function Divider() {
  return <hr className={styles.divider} />;
}

export default function HomePage() {
  return (
    <>
      {/* Hero — full width, sits behind fixed nav */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/fallback.webp"
        >
          <source src="/images/headerlq.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />
        <div className={styles.heroText}>
          <p className={styles.heroName}>APRIL YANKO</p>
          <p className={styles.heroTagline}>Actor | Writer | Overall Weirdo</p>
        </div>
      </section>

      {/* Body content inside the wavy white column */}
      <PageLayout>
        {/* Bio */}
        <div className={styles.narrow}>
          <p className={styles.bioHeadline}>Hi I am April Yanko.</p>
          <p className={styles.bioBody}>
            I am a mother of cats and eater of pasta. You may find me around
            the web under &ldquo;post march,&rdquo; which is a small riddle, not a Post Malone reference.
          </p>
        </div>

        <Divider />

        {/* Carousel — self-limits to 660px via its own CSS */}
        <Carousel slides={SLIDES} />

        <Divider />

        {/* Fun facts */}
        <h2 className={`${styles.funFactsHeading} ${styles.narrow}`}>
          Here are some super fun facts about me, the one with the face
        </h2>

        <div className={styles.notesGrid}>
          {FUN_FACTS.map((fact, i) => (
            <div
              key={i}
              className={`${styles.note} ${styles[fact.variant]}`}
            >
              {fact.text}
            </div>
          ))}
        </div>

        <Divider />

        {/* Cat */}
        <div className={`${styles.catWrap} ${styles.narrow}`}>
          <img
            src="/images/cat.webp"
            alt="A pink cat"
            className={styles.catImage}
          />
        </div>
      </PageLayout>
    </>
  );
}
