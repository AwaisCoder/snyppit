import Image from "next/image";
import BlurredShapeGray from "../../../../public/images/blurred-shape-gray.svg";
import BlurredShape from "../../../../public/images/blurred-shape.svg";
import FeaturesImage from "../../../../public/images/features.png";

export default function Features() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <Image
          className="max-w-none opacity-70 transition-opacity duration-500 hover:opacity-100"
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
          priority
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] transform-gpu opacity-50 blur-2xl"
        aria-hidden="true"
      >
        <Image
          className="max-w-none transition-all duration-500 hover:scale-105"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/0.3),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="group inline-flex items-center gap-3 pb-4 transition-all duration-300 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-300/70 before:transition-all before:duration-300 before:hover:w-12 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-300/70 after:transition-all after:duration-300 after:hover:w-12">
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text font-medium tracking-wider text-transparent">
                Advanced Controls
              </span>
            </div>
            <h2 className="animate-[gradient_8s_ease-in-out_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.300),theme(colors.gray.100),theme(colors.indigo.400),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-6 font-nacelle text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              Built for modern product teams
            </h2>
            <p className="text-lg text-indigo-200/75 transition-colors duration-300 hover:text-indigo-200/90">
              Snyppit allows the team to discuss about a snippet in the comment
              section, making it an amazing tool for teamwork and collaboration.
            </p>
          </div>

          {/* Main feature image */}
          <div
            className="group relative mx-auto mb-20 max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-500/10 to-transparent p-2 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-indigo-500/25"
            data-aos="fade-up"
          >
            <div className="relative rounded-xl bg-gray-900/50 p-4 backdrop-blur-sm">
              <Image
                className="w-full rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-[1.01]"
                src={FeaturesImage}
                width={1104}
                height={384}
                alt="Features"
                priority
              />
            </div>
          </div>

          {/* Features grid */}
          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            {/* Feature items */}
            <article className="group relative rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 rounded-xl bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <svg
                className="relative mb-4 h-8 w-8 fill-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:fill-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
                <path
                  fillOpacity=".48"
                  d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z"
                />
              </svg>
              <h3 className="relative mb-2 font-nacelle text-xl font-semibold text-gray-100">
                One-Click Execution
              </h3>
              <p className="relative text-indigo-200/75">
                Run code snippets directly in the browser for supported
                languages, eliminating the need for external compilers.
              </p>
            </article>
            <article className="group relative rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 rounded-xl bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <svg
                className="relative mb-4 h-8 w-8 fill-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:fill-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path fillOpacity=".48" d="M7 8V0H5v8h2Zm12 16v-4h-2v4h2Z" />
                <path d="M19 6H0v2h17v8H7v-6H5v8h19v-2h-5V6Z" />
              </svg>
              <h3 className="relative mb-2 font-nacelle text-xl font-semibold text-gray-100">
                Collaboration & Comments
              </h3>
              <p className="relative text-indigo-200/75">
                Users can collaborate on snippets in real-time, leave comments,
                and discuss improvements.
              </p>
            </article>
            <article className="group relative rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 rounded-xl bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <svg
                className="relative mb-4 h-8 w-8 fill-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:fill-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path d="M23.414 6 18 .586 16.586 2l3 3H7a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4h12.586l-3 3L18 11.414 23.414 6Z" />
                <path
                  fillOpacity=".48"
                  d="M13.01 12.508a2.5 2.5 0 0 0-3.502.482L1.797 23.16.203 21.952l7.71-10.17a4.5 4.5 0 1 1 7.172 5.437l-4.84 6.386-1.594-1.209 4.841-6.385a2.5 2.5 0 0 0-.482-3.503Z"
                />
              </svg>
              <h3 className="relative mb-2 font-nacelle text-xl font-semibold text-gray-100">
                Advanced Search
              </h3>
              <p className="relative text-indigo-200/75">
                Track progress across custom flows for your team. Find the right
                balance for the user, privacy and security.
              </p>
            </article>
            <article className="group relative rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 rounded-xl bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <svg
                className="relative mb-4 h-8 w-8 fill-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:fill-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path
                  fillOpacity=".48"
                  d="m3.031 9.05-.593-.805 1.609-1.187.594.804a6.966 6.966 0 0 1 0 8.276l-.594.805-1.61-1.188.594-.805a4.966 4.966 0 0 0 0-5.9Z"
                />
                <path d="m7.456 6.676-.535-.845 1.69-1.07.534.844a11.944 11.944 0 0 1 0 12.789l-.535.845-1.69-1.071.536-.845a9.944 9.944 0 0 0 0-10.647Z" />
                <path
                  d="m11.888 4.35-.514-.858 1.717-1.027.513.858a16.9 16.9 0 0 1 2.4 8.677 16.9 16.9 0 0 1-2.4 8.676l-.513.859-1.717-1.028.514-.858A14.9 14.9 0 0 0 14.003 12a14.9 14.9 0 0 0-2.115-7.65Z"
                  opacity=".48"
                />
                <path d="m16.321 2-.5-.866 1.733-1 .5.866A22 22 0 0 1 21 12c0 3.852-1.017 7.636-2.948 10.97l-.502.865-1.73-1.003.501-.865A19.878 19.878 0 0 0 19 12a20 20 0 0 0-2.679-10Z" />
              </svg>
              <h3 className="relative mb-2 font-nacelle text-xl font-semibold text-gray-100">
                Customizable Themes & Layouts
              </h3>
              <p className="relative text-indigo-200/75">
                Personalize the editor with different themes, layouts, and font
                styles for a tailored coding experience.
              </p>
            </article>
            <article className="group relative rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 rounded-xl bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <svg
                className="relative mb-4 h-8 w-8 fill-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:fill-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path
                  fillOpacity=".48"
                  d="M12 8.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                />
                <path d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818ZM17.456 1.11l-.891-.454-.909 1.782.891.454a10 10 0 0 1 0 17.819l-.89.454.908 1.781.89-.454a12 12 0 0 0 0-21.382Z" />
              </svg>
              <h3 className="relative mb-2 font-nacelle text-xl font-semibold text-gray-100">
                Snippet Embedding & Sharing
              </h3>
              <p className="relative text-indigo-200/75">
                Easily embed snippets into blogs, documentation, or forums with
                shareable links or iframe embeds.
              </p>
            </article>
            <article className="group relative rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute inset-0 rounded-xl bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <svg
                className="relative mb-4 h-8 w-8 fill-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:fill-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path
                  fillOpacity=".48"
                  d="M19 8h5v2h-5V8Zm-4 5h9v2h-9v-2Zm9 5H11v2h13v-2Z"
                />
                <path d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z" />
              </svg>
              <h3 className="relative mb-2 font-nacelle text-xl font-semibold text-gray-100">
                Private & Team Workspaces
              </h3>
              <p className="relative text-indigo-200/75">
                Users can create private collections or team-based snippet
                repositories for organized code management.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
