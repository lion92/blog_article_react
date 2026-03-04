import Home from "../Home.tsx";

export default function LandingPage({onEnter}) {
        return (
            <div className="flex flex-col">

                {/* HERO */}
                <section className="bg-violet-300 py-20 text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-violet-900 mb-6">
                        Bienvenue sur Mon Blog d'articles
                    </h1>
                    <p className="text-lg md:text-xl text-violet-800 max-w-2xl mx-auto mb-8">
                        Développement web, projets perso, conseils tech et motivation.
                    </p>
                </section>

                {/* À PROPOS */}
                <section className="py-16 bg-white text-center px-6">
                    <h2 className="text-3xl font-bold mb-6">Pourquoi ce blog ?</h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                        Je partage mes projets, mes apprentissages en React, NestJS,
                        gestion de budget, SaaS et idées pour gagner en compétences.
                    </p>
                </section>

                <Home></Home>


                {/* FOOTER */}
                <footer className="bg-violet-900 text-white py-6 text-center">
                    © {new Date().getFullYear()} Mon Blog - Tous droits réservés
                </footer>

            </div>
        )
}