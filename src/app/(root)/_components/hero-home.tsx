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
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Nav/Logo Area */}
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-indigo-400">Snyppit</span>
          </div>
          <div className="hidden space-x-8 md:flex text-xl">
            <a href="#features" className="text-gray-300 hover:text-white">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-white">
              Testimonials
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white">
              FAQ
            </a>
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
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-20">
            <Badge
              variant="outline"
              className="px-7 py-5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-base md:text-6xl text-gray-300 border-none shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:text-gray-100"
            >
              Introducing Snyppit 1.0
            </Badge>
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-4xl"
              data-aos="fade-up"
            >
              The AI-Powered IDE <br className="md:inline" />
              That Codes With You
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl text-indigo-200/80"
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
          <div className="relative" data-aos="fade-up">
            {/* Gradient overlay for video */}
            <div className="absolute inset-0 z-10 rounded-xl bg-gradient-to-t from-gray-900/80 to-transparent opacity-60"></div>

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
      </div>
    </section>
  );
}
