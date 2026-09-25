const highlights = [
  {
    title: "Life at FOSTIIMA",
    description:
      "A vibrant campus life that nurtures leadership, creativity and lifelong connections.",
    image:
      "/home/campus/campus1.jpeg",
    href: "/life-at-fostiima",
    eyebrow: "Campus Life",
  },
  {
    title: "Placements That Open Doors",
    description:
      "Strong corporate connect ensuring bright careers and meaningful career opportunities.",
    image:
      "/home/campus/capmus2.jpeg",
    href: "/placement",
    eyebrow: "Career Opportunities",
  },
];

export default function CampusHighlights() {
  return (
    <section className="w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid w-full min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
          {highlights.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="
                group
                relative
                isolate
                block
                w-full
                min-w-0
                max-w-full
                overflow-hidden
                rounded-2xl
                bg-[#071a35]
                shadow-[0_12px_35px_rgba(18,59,121,0.12)]
                aspect-[1.45/1]
                sm:aspect-[1.8/1]
                md:aspect-[2/0.82]
              "
            >
              {/* Background */}
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071a35]/95 via-[#071a35]/75 to-[#071a35]/20" />

              {/* Content */}
              <div className="relative z-10 flex h-full max-w-[90%] flex-col justify-center px-5 py-6 sm:max-w-[82%] sm:px-8 sm:py-7 lg:max-w-[78%] lg:px-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4c400] sm:text-xs">
                  {item.eyebrow}
                </p>

                <h2 className="mt-2 font-serif text-xl font-bold leading-tight text-white sm:text-3xl">
                  {item.title}
                </h2>

                <p className="mt-3 max-w-md text-xs leading-5 text-white/75 sm:text-sm sm:leading-6">
                  {item.description}
                </p>

                <span className="mt-4 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-[11px]">
                  Explore More
                  <span className="ml-2 text-[#f4c400]">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}