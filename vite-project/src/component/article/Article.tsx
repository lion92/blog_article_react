import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { JSX } from "react";

import { useArticleStore } from "../../useArticleStore";
import ArticleImage from "../ArticleImage";
import { isSvgContent, resolveImageUrl } from "../../imageUrl";

function Article(): JSX.Element {

    const { id } = useParams();
    const { article, fetchArticle, loading } = useArticleStore();

    useEffect(() => {
        if (id) fetchArticle(Number(id));
        window.scrollTo(0, 0);
    }, [id]);

    if (loading || !article) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-white gap-4">
                <div className="w-10 h-10 border-[3px] border-violet-200 border-t-violet-600 rounded-full animate-spin" />
                <p className="text-sm text-gray-400 font-medium">Chargement...</p>
            </div>
        );
    }

    const hasBgImage = article.image && !isSvgContent(article.image);

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* Navbar */}
            <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-lg font-bold text-violet-700 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Mon Blog
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-violet-600 font-medium transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour
                    </Link>
                </div>
            </nav>

            {/* Hero image plein largeur */}
            {hasBgImage && (
                <div className="relative w-full h-[480px] overflow-hidden bg-gray-900">
                    <img
                        src={resolveImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Titre dans le hero */}
                    <div className="absolute inset-0 flex flex-col justify-end">
                        <div className="max-w-3xl mx-auto px-6 pb-14 w-full">
                            <h1
                                className="text-4xl md:text-6xl font-bold text-white leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {article.title}
                            </h1>
                        </div>
                    </div>
                </div>
            )}

            {/* Content wrapper */}
            <main className="max-w-3xl mx-auto px-6 w-full flex-1">

                {/* Titre si pas de hero image */}
                {!hasBgImage && (
                    <div className="pt-14 pb-6">
                        {article.image && (
                            <div className="mb-10 flex justify-center">
                                <ArticleImage
                                    image={article.image}
                                    alt={article.title}
                                    className="max-h-40 object-contain"
                                />
                            </div>
                        )}
                        <h1
                            className="text-4xl md:text-6xl font-bold text-gray-950 leading-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {article.title}
                        </h1>
                    </div>
                )}

                {/* Séparateur */}
                <div className={`flex items-center gap-4 ${hasBgImage ? "pt-12" : "pt-2"} pb-10`}>
                    <div className="w-10 h-1 bg-violet-500 rounded-full" />
                    <div className="w-3 h-1 bg-violet-300 rounded-full" />
                </div>

                {/* Introduction */}
                {article.introduction && (
                    <p
                        className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-14"
                        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                    >
                        {article.introduction}
                    </p>
                )}

                {/* Sections */}
                <div className="pb-20">
                    {article.sections?.map((section, index) => (
                        <div key={section.id || index} className="mb-14">
                            <div className="flex items-start gap-5 mb-5">
                                <span className="text-4xl font-bold text-violet-100 select-none leading-none mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <h2
                                    className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {section.title}
                                </h2>
                            </div>
                            <p className="text-gray-600 leading-8 text-lg pl-14">
                                {section.text}
                            </p>
                            {index < (article.sections?.length ?? 0) - 1 && (
                                <div className="mt-14 border-t border-gray-100" />
                            )}
                        </div>
                    ))}
                </div>

            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 py-10 flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Tous les articles
                    </Link>
                    <span className="text-sm text-gray-300 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Mon Blog
                    </span>
                </div>
            </footer>

        </div>
    );
}

export default Article;
