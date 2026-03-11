export type CategoryKey = "Music" | "Movie" | "City";

export const digitalArtPage = {
  title: "Wings of Creativity",
  description:
    "Muahx’s work emerges from the meeting point between knowledge and creativity, exploring the freedom of imagination through drawing and collage. Images and symbols from contemporary culture are transformed into hybrid figures and fantastical worlds where irony and invention coexist. The visual language moves between pop art, surrealism, abstract influences, and a naïve sensibility. This research celebrates human ingenuity and the many forms in which creativity manifests, with affinities to the pop art of Andy Warhol, the poetic freedom of Joan Miró, and the colorful, playful visual universe of James Rizzi.",
};

export const categories: Record<
  CategoryKey,
  { title: string; description: string }
> = {
  Music: {
    title: "Creatures of Sound",
    description:
      "The Creatures of Sound series celebrates the creativity and ingenuity of musicians who have shaped contemporary cultural imagination. Through drawing and collage, iconic figures from the world of music are reinterpreted and transformed into hybrid and fantastical creatures. This metamorphosis introduces an ironic and imaginative dimension that frees these characters from their traditional representation. The works thus become a celebration of music as a form of creative freedom and as an expression of human inventive energy.",
  },
  Movie: {
    title: "Beyond the Screen",
    description: "The Beyond the Screen series explores cinema as a space of imagination and collective memory. Characters and symbols from the cinematic world are reinterpreted through a playful and free visual language. Through unexpected transformations and juxtapositions, familiar figures take on new forms and meanings. Cinema becomes a starting point to explore the creative power of images and the ways in which cinematic imagination continues to influence contemporary culture.",
  },
  City: {
    title: "Genius Loci",
    description: "The Genius Loci series is dedicated to the cultural spirit of cities. Each place is observed as a space where history, knowledge, and creativity meet. Through collage and visual reinterpretation, cities become symbols of the human capacity to build culture and identity over time. The works do not simply represent geographical places, but aim to evoke the creative energy and cultural heritage that shape the unique character of every city.",
  },
};

export type Project = {
  slug: string;
  title: string;
  category: CategoryKey;
  date: string;

  // immagini
  images: string[]; // galleria “finale”
  genesisImages?: string[]; // galleria “genesi” (opzionale)

  // testi
  shortDescription: string;

  // tab contenuti
  videoUrl?: string; // link youtube (opzionale)
  videoText?: string; // se non c’è video, testo
  whyText: string; // tab WHY
  genesisText?: string; // testo tab GENESI (opzionale)
};

export const projects: Project[] = [
  {
    slug: "beatles",
    title: "Yellow Submarine Creatures",
    category: "Music",
    date: "2025-02-15",
    images: [
      "/images/projects/beatles/main.jpg",
      "/images/projects/beatles/detail-1.jpg",
      "/images/projects/beatles/detail-2.jpg",
      "/images/projects/beatles/detail-3.jpg",
      "/images/projects/beatles/detail-4.jpg",
      "/images/projects/beatles/mockup.jpg",
    ],
    genesisImages: [
    
    ],
    shortDescription:
      "Inspired by the imaginative universe of the Beatles’ Yellow Submarine, the musicians are transformed into playful marine creatures.",
    //videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    // oppure, se NON c’è video:
    videoText: "Coming soon",
    whyText:
      "This work originates from the imaginative universe of the Beatles’ song Yellow Submarine. I transformed the musicians into marine creatures to represent the creative freedom of their music. The sea becomes a symbolic space where imagination, irony, and pop culture meet.",
    genesisText:
      "GENESI: Coming soon.",
  },
  {
    slug: "nirvana",
    title: "Grunge Metamorphosis",
    category: "Music",
    date: "2024-11-28",
    images: [
      "/images/projects/nirvana/main.jpg",
      "/images/projects/nirvana/detail-1.jpg",
      "/images/projects/nirvana/detail-2.jpg",
      "/images/projects/nirvana/detail-3.jpg",
      "/images/projects/nirvana/mockup.jpg",

    ],
    genesisImages: [

    ],
    shortDescription:
      "A visual reinterpretation inspired by Nirvana’s Come As You Are, where the band becomes part of a surreal aquatic transformation.",
    //videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoText: "Coming soon",
    whyText:
      "Inspired by the musical universe of Nirvana and the song Come As You Are, the work represents a visual transformation that reflects the raw and authentic energy of grunge. The metamorphosis of the figures suggests the constant evolution of artistic identity and the expressive freedom of music.",
    genesisText:
      "GENESI: Coming soon",
  },
  {
    slug: "village_people",
    title: "YMCA Ocean Crew",
    category: "Music",
    date: "2024-04-03",
    images: [
      "/images/projects/village_people/main.jpg",
      "/images/projects/village_people/detail-1.jpg",
      "/images/projects/village_people/detail-2.jpg",
      "/images/projects/village_people/detail-3.jpg",
      "/images/projects/village_people/detail-4.jpg",
      "/images/projects/village_people/mockup.jpg",

    ],
    genesisImages: [

    ],
    shortDescription:
      "Inspired by the iconic songs YMCA and In the Navy, the Village People appear as a playful marine crew celebrating music, rhythm, and imagination.",
    //videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoText: "Coming soon",
    whyText:
      "This work was created from the desire to reinterpret the playful energy of the Village People and their songs YMCA and In the Navy. The characters become a kind of imaginary marine crew, transforming disco iconography into an ironic and fantastical scene.",
    genesisText:
      "GENESI: Coming soon",
  },
  {
    slug: "jsparrow",
    title: "Curse of the Black Pearl",
    category: "Movie",
    date: "2025-05-18",
    images: [
      "/images/projects/jsparrow/main.jpg",
      "/images/projects/jsparrow/detail-1.jpg",
      "/images/projects/jsparrow/detail-2.jpg",
      "/images/projects/jsparrow/detail-3.jpg",
      "/images/projects/jsparrow/mockup.jpg",

    ],
    genesisImages: [

    ],
    shortDescription:
      "Inspired by Pirates of the Caribbean: The Curse of the Black Pearl, the iconic pirate figure is reimagined through a playful and imaginative visual transformation.",
    //videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoText: "Coming soon",
    whyText:
      "This work is inspired by the imagery of the film Pirates of the Caribbean: The Curse of the Black Pearl. The pirate character becomes a symbol of adventure, freedom, and rebellious spirit, reinterpreted in a fantastical way through the language of collage.",
    genesisText:
      "GENESI: Coming soon",
  },
  {
    slug: "edward",
    title: "Scissorhands Dream",
    category: "Movie",
    date: "2026-01-11",
    images: [
      "/images/projects/edward/main.jpg",
      "/images/projects/edward/detail-1.jpg",
      "/images/projects/edward/detail-2.jpg",
      "/images/projects/edward/detail-3.jpg",
      "/images/projects/edward/mockup.jpg",

    ],
    genesisImages: [

    ],
    shortDescription:
      "Inspired by Edward Scissorhands, the character is reinterpreted through a poetic and surreal visual transformation.",
    //videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoText: "Coming soon",
    whyText:
      "Inspired by the character of Edward Scissorhands, this work explores the poetic and melancholic dimension of the story. The visual transformation evokes the contrast between fragility and imagination that defines this iconic cinematic character.",
    genesisText:
      "GENESI: Coming soon",
  },
  {
    slug: "robin_hood",
    title: "Arrow of Sherwood",
    category: "Movie",
    date: "2025-07-11",
    images: [
      "/images/projects/robin_hood/main.jpg",
      "/images/projects/robin_hood/detail-1.jpg",
      "/images/projects/robin_hood/detail-2.jpg",
      "/images/projects/robin_hood/mockup.jpg",

    ],
    genesisImages: [

    ],
    shortDescription:
      "Inspired by the legend of Robin Hood, the iconic archer of Sherwood Forest is reimagined through a playful and imaginative visual transformation.",
    //videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoText: "Coming soon",
    whyText:
      "This work takes inspiration from the legendary figure of Robin Hood. The archer of Sherwood becomes a symbol of freedom, justice, and rebellion against injustice, reimagined through a visual composition that blends myth and imagination.",
    genesisText:
      "GENESI: Coming soon",
  },
  {
    slug: "faraoni",
    title: "Guardians of Giza",
    category: "City",
    date: "2025-10-08",
    images: [
      "/images/projects/faraoni/main.jpg",
      "/images/projects/faraoni/detail-1.jpg",
      "/images/projects/faraoni/detail-2.jpg",
      "/images/projects/faraoni/detail-3.jpg",
      "/images/projects/faraoni/detail-4.jpg",
      "/images/projects/faraoni/mockup.jpg",

    ],
    genesisImages: [

    ],
    shortDescription:
      "Inspired by the ancient civilization of Egypt, the pharaohs appear as symbolic guardians of Giza, with the pyramids and the Sphinx representing the enduring legacy of human knowledge and culture.",
    //videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoText: "Coming soon",
    whyText:
      "This work is dedicated to the civilization of ancient Egypt and the extraordinary cultural legacy of Giza. The pharaohs become symbolic figures who guard the memory of one of the greatest civilizations in human history.",
    genesisText:
      "GENESI: Coming soon",
  },
  {
    slug: "san_benedetto",
    title: "Changing Tides",
    category: "City",
    date: "2026-03-04",
    images: [
      "/images/projects/san_benedetto/main.jpg",
      "/images/projects/san_benedetto/detail-1.jpg",
      "/images/projects/san_benedetto/detail-2.jpg",
      "/images/projects/san_benedetto/detail-3.jpg",
      "/images/projects/san_benedetto/detail-4.jpg",
      "/images/projects/san_benedetto/detail-5.jpg",
      "/images/projects/san_benedetto/mockup.jpg",

    ],
    genesisImages: [

    ],
    shortDescription:
      "Inspired by the cultural transformation of San Benedetto del Tronto, the work reflects the shift from traditional fishing activities to modern seaside tourism.",
    //videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoText: "Coming soon",
    whyText:
      "Inspired by the city of San Benedetto del Tronto, the work reflects the cultural transformation that has shifted the traditional fishing economy toward seaside tourism. The boats resting on the beach, far from the water, evoke the transition from a past linked to fishing to a new identity built around tourism.",
    genesisText:
      "GENESI: Coming soon",
  },
];