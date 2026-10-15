export default function App() {
  return (
    <main className="mx-20 max-w-4xl px-6 py-16">
      <section>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          Buenas, soy Alec!
          <span className="mt-2 block text-blue-500">
            Desarrollador Frontend
          </span>
        </h1>

        <p
          id="descripcion"
          className="my-6 max-w-2xl text-base leading-7 text-gray-300"
        >
          Tengo 22 años y muchas ganas de demostrar lo que sé hacer
          en el mundo del desarrollo web. He colaborado en proyectos
          de startups y trabajado con particulares en sus proyectos
          personales. Busco una oportunidad en una empresa que valore
          el esfuerzo, la motivación y las ganas de aprender y compartir
          conocimientos.
        </p>
      </section>

      <section id="lenguajes" className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Tecnologías
        </h2>

        <div className="flex flex-wrap gap-3">
          <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-5 py-3 font-medium text-gray-900 shadow-sm transition duration-300 ease-out hover:border-blue-500 hover:bg-blue-500 hover:text-white">
            <img
              src="/nextjslogo1.png"
              alt="Logo de Next.js"
              className="h-6 w-6 object-contain"
            />
            Next.js
          </span>

          <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-5 py-3 font-medium text-gray-900 shadow-sm transition duration-300 ease-out hover:border-blue-500 hover:bg-blue-500 hover:text-white">
            <img
              src="/htmllogo.png"
              alt="Logo de Next.js"
              className="h-6 w-6 object-contain"
            />
            HTML
          </span>

           <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-5 py-3 font-medium text-gray-900 shadow-sm transition duration-300 ease-out hover:border-blue-500 hover:bg-blue-500 hover:text-white">
            <img
              src="/css-icon.png"
              alt="Logo de Next.js"
              className="h-6 w-6 object-contain"
            />
            CSS
          </span>

          <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-5 py-3 font-medium text-gray-900 shadow-sm transition duration-300 ease-out hover:border-blue-500 hover:bg-blue-500 hover:text-white">
            <img
              src="/kotlinicon.png"
              alt="Logo de Next.js"
              className="h-6 w-6 object-contain"
            />
            Kotlin
          </span>

            <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-5 py-3 font-medium text-gray-900 shadow-sm transition duration-300 ease-out hover:border-blue-500 hover:bg-blue-500 hover:text-white">
            <img
              src="/tailwindcss.png"
              alt="Logo de Next.js"
              className="h-6 w-6 object-contain"
            />
            Tailwind css
          </span>

          <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-5 py-3 font-medium text-gray-900 shadow-sm transition duration-300 ease-out hover:border-blue-500 hover:bg-blue-500 hover:text-white">
            <img
              src="/js.png"
              alt="Logo de Next.js"
              className="h-6 w-6 object-contain"
            />
            Javascript
          </span>

          <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-white px-5 py-3 font-medium text-gray-900 shadow-sm transition duration-300 ease-out hover:border-blue-500 hover:bg-blue-500 hover:text-white">
            <img
              src="/node.png"
              alt="Logo de Next.js"
              className="h-6 w-6 object-contain"
            />
            Node js
          </span>
        </div>
      </section>
    </main>
  );
}