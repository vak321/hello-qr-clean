import { createFileRoute } from "@tanstack/react-router";
import floaterImg from "@/assets/floater.png";
import bgImg from "@/assets/bg.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "riprenditi veloce coglione 👎" },
      { name: "description", content: "riprenditi veloce coglione" },
    ],
  }),
  component: Index,
});

const FLOATERS = Array.from({ length: 18 }).map((_, i) => {
  const rand = (seed: number) => {
    const x = Math.sin(seed * 9999 + i * 17) * 10000;
    return x - Math.floor(x);
  };
  return {
    left: rand(1) * 100,
    top: rand(2) * 100,
    size: 5 + rand(3) * 9, // rem
    duration: 10 + rand(4) * 16,
    delay: -rand(5) * 20,
    dx: (rand(6) - 0.5) * 60,
    dy: (rand(7) - 0.5) * 60,
    rot: (rand(8) - 0.5) * 720,
    flip: rand(9) > 0.5 ? -1 : 1,
  };
});

// Harry Styles - Sign of the Times (official video)
const YT_VIDEO_ID = "qN4ooNx77u0";

function Index() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black"
      style={{
        backgroundColor: "#000",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>{`
        @keyframes floatAround {
          0%   { transform: translate(0,0) rotate(0deg) scaleX(var(--flip)); }
          50%  { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scaleX(var(--flip)); }
          100% { transform: translate(0,0) rotate(0deg) scaleX(var(--flip)); }
        }
        .floater {
          position: absolute;
          will-change: transform;
          animation: floatAround var(--dur) ease-in-out infinite;
          animation-delay: var(--delay);
          user-select: none;
          pointer-events: none;
          filter: drop-shadow(0 8px 18px rgba(0,0,0,0.6));
        }
        @keyframes pulseText {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
      `}</style>

      {/* Floating images */}
      <div className="absolute inset-0 z-0">
        {FLOATERS.map((e, i) => (
          <img
            key={i}
            src={floaterImg}
            alt=""
            aria-hidden
            className="floater"
            style={
              {
                left: `${e.left}%`,
                top: `${e.top}%`,
                width: `${e.size}rem`,
                height: "auto",
                ["--dx" as never]: `${e.dx}vw`,
                ["--dy" as never]: `${e.dy}vh`,
                ["--rot" as never]: `${e.rot}deg`,
                ["--dur" as never]: `${e.duration}s`,
                ["--delay" as never]: `${e.delay}s`,
                ["--flip" as never]: `${e.flip}`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Hidden YouTube player attempting autoplay */}
      <iframe
        src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&controls=0&playsinline=1&modestbranding=1`}
        title="Sign of the Times"
        allow="autoplay; encrypted-media"
        className="pointer-events-none absolute h-px w-px opacity-0"
        style={{ left: -9999, top: -9999 }}
      />

      {/* Message */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
        <h1
          className="font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-[0_8px_24px_rgba(255,255,255,0.15)]"
          style={{
            fontSize: "clamp(2.25rem, 9vw, 7rem)",
            lineHeight: 1.05,
            animation: "pulseText 3s ease-in-out infinite",
          }}
        >
          riprenditi veloce coglione
        </h1>
      </main>
    </div>
  );
}
