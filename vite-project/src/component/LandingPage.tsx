import Home from "../Home.tsx";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* NAVBAR */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-violet-700">Mon Blog</span>
                    <div className="flex gap-6 items-center">
                        <a href="#articles" className="text-gray-600 hover:text-violet-700 transition text-sm font-medium">
                            Articles
                        </a>
                        <Link
                            to="/admin/articles"
                            className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="bg-gradient-to-br from-violet-500 to-violet-900 py-24 text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Bienvenue sur<br />Mon Blog d'articles
                </h1>
                <p className="text-lg md:text-xl text-violet-200 max-w-2xl mx-auto mb-10">
                    Développement web, projets perso, conseils tech et motivation.
                </p>
                <a
                    href="#articles"
                    className="bg-white text-violet-700 font-semibold px-8 py-3 rounded-xl hover:bg-violet-50 transition inline-block shadow-md"
                >
                    Découvrir les articles ↓
                </a>
            </section>

            {/* À PROPOS */}
            <section className="py-16 bg-white text-center px-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Pourquoi ce blog ?</h2>
                <p className="max-w-3xl mx-auto text-gray-500 text-lg leading-relaxed">
                    Je partage mes projets, mes apprentissages en React, NestJS,
                    gestion de budget, SaaS et idées pour gagner en compétences.
                </p>
            </section>

            {/* ARTICLES */}
            <div id="articles" className="bg-gray-50 flex-1">
                <Home />
            </div>

            {/* FOOTER */}
            <footer className="bg-violet-900 text-white py-8 text-center">
                <p className="text-violet-300 text-sm">
                    © {new Date().getFullYear()} Mon Blog — Tous droits réservés
                </p>
            </footer>

        </div>
    );
}
