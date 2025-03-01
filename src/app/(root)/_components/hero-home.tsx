import { Button } from "../../../../_components/ui/button";
import VideoThumb from "../../../../public/images/hero-image-01.jpg";
import ModalVideo from "../_components/modal-video";
import { Badge } from "../../../../_components/ui/badge";
import LoginButton from "@/components/LoginButton";
import HomeBtn from "./home-button";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HeroHome() {
  return (
    <section className="bg-gray-950">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Nav/Logo Area */}
        <div className="flex items-center justify-between py-8">
          <div className="group flex items-center gap-2 transition-all duration-300">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-400 opacity-30 blur-[9px] transition duration-300 group-hover:opacity-40 group-hover:blur-[6px]" />
              <span className="relative bg-gradient-to-r from-indigo-300 to-indigo-100 bg-clip-text text-4xl font-bold text-transparent">
                Snyppit
              </span>
            </div>
          </div>
          <div className="text-xl">
            <SignedOut>
              <LoginButton />
            </SignedOut>

            <SignedIn>
              <HomeBtn />
            </SignedIn>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative py-16 md:py-24">
          {/* Section header */}
          <div className="relative pb-12 text-center md:pb-20">
            <div className="relative mx-auto inline-block" data-aos="zoom-in">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-lg transition-all duration-500 group-hover:opacity-50 group-hover:blur-xl" />
              <Badge
                variant="outline"
                className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-8 py-6 text-lg font-medium tracking-wide text-gray-200 backdrop-blur-sm transition-all duration-500 hover:from-blue-500/20 hover:to-purple-500/20 hover:text-gray-100 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] md:text-xl"
              >
                Introducing Snyppit 1.0
              </Badge>
            </div>

            <h1
              className="animate-[gradient_8s_ease-in-out_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.100),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-6 pt-8 font-nacelle text-5xl font-bold text-transparent md:text-6xl lg:text-7xl"
              data-aos="fade-up"
            >
              Code. Save. <br className="hidden md:inline" />
              Share. Simplified.
            </h1>

            <div className="relative mx-auto max-w-3xl">
              <p
                className="mb-12 text-xl leading-relaxed text-indigo-200/80 transition-colors duration-300 hover:text-indigo-200/90 md:text-2xl"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Simple and elegant interface to start collaborating with your
                team in minutes. It seamlessly integrates with your code and
                your favorite programming languages.
              </p>
            </div>
          </div>

          {/* Video/Image section */}
          <div
            className="group relative mx-auto max-w-5xl"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            {/* Video container with enhanced styling */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-500/10 via-blue-500/5 to-transparent p-2 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/25">
              <div className="relative rounded-xl bg-gray-900/50 backdrop-blur-sm">
                {/* Gradient overlay for video */}
                <div className="absolute inset-0 z-10 rounded-xl bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40"></div>

                <ModalVideo
                  thumb={VideoThumb}
                  thumbWidth={1104}
                  thumbHeight={576}
                  thumbAlt="Snyppit IDE in action"
                  video="videos/video.mp4"
                  videoWidth={1920}
                  videoHeight={1080}
                />
              </div>
            </div>

            {/* Play button indicator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                <svg
                  className="relative h-8 w-8 translate-x-0.5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
