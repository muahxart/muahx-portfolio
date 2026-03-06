"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AboutMePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);
  }, []);
  return (
    <main className="w-full pt-6">
      {/* HERO IMAGE */}
      <div className="w-full h-[220px] md:h-[300px] overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="Hero banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* TITLE */}
      <section
  className={`max-w-5xl mx-auto px-6 pt-20 md:pt-28 text-center transition-all duration-700 ease-out ${
    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
  }`}
>
        <h1 className="text-6xl md:text-8xl font-extralight tracking-[-0.02em]">
          About Me
        </h1>
      </section>

      {/* 2-COLUMN SECTION */}
      <section className="max-w-5xl mx-auto px-6 pt-16 md:pt-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* LEFT IMAGE */}
 <div className="overflow-hidden rounded-[24px] bg-white shadow-2xl ring-1 ring-black/10">
  <img
    src="/images/about-photo.jpg"
    alt="About photo"
    className="w-full h-auto object-cover"
  />
</div>

          {/* RIGHT TEXT */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Who is Muahx?
            </h2>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
I am an Italian artist drawn to the meeting point between knowledge and creativity. 
Muahx is the pseudonym I have used since the early days of the Internet in the 1990s,
 when the web was still an open space for exploration, experimentation, and freedom.
  That same spirit continues to shape the way I think and create.
            </p>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-8">
I recognize myself in a libertarian disposition: loyal, patient, and deeply connected to nature. 
Freedom is a central value in my view of the world and in my artistic practice. 
I do not tolerate impositions or arrogance, because I believe creativity can exist only where thought is free to move and to imagine.
            </p>

             <Link
                  href="/contact"
                 className="inline-flex items-center justify-center rounded-2xl border border-gray-500 px-12 py-4 text-sm text-gray-800 hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
                >
              Contact
            </Link>
          </div>
        </div>

        {/* LONG TEXT UNDER */}
        <div className="mt-14 md:mt-16 text-sm md:text-base text-gray-700 leading-relaxed space-y-6">
          <p>
I am fascinated by human ingenuity: the ability to combine curiosity, knowledge, 
and imagination to generate inventions and new possibilities. 
This fascination spans many different fields — artistic, scientific, and constructive — all united by the dialogue between knowledge and creativity.
          </p>

          <p>
My visual language moves between pop art, surrealism, abstraction, and naïve expression. 
Through collage I assemble images, fragments, and colors with freedom and irony, allowing 
elements to interact and build unexpected meanings. The creative process thus becomes a 
space of spontaneous exploration, where the work gradually takes shape.
          </p>

          <p>
My research is mainly oriented toward aesthetics: I am interested in visual harmony, contrast, 
and the evocative power of images. At the same time, I do not exclude the possibility of a message. 
Beneath the surface, my works suggest reflections on freedom, imagination, and the human capacity to create.

For me, making art means observing the world, reinterpreting it, and returning it with curiosity, 
lightness, and a free spirit.
          </p>

<h2 className="text-lg md:text-xl font-semibold mb-4">
 <center>Knowledge makes us free. Creativity gives wings to freedom!</center> 
</h2>

        </div>
      </section>

      {/* bottom spacing before footer */}
      <div className="h-24" />
    </main>
  );
}