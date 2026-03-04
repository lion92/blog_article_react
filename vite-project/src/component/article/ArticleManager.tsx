import { useEffect, useState } from "react";
import { useArticleStore } from "../../useArticleStore.ts";
import ArticleForm from "../article/ArticleForm.tsx";
import { Link } from "react-router-dom";

export default function ArticleManager() {

    const { articles, fetchArticles, deleteArticle } = useArticleStore();

    const [editingArticle, setEditingArticle] = useState<any | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleCreate = () => {
        setEditingArticle(null);
        setShowForm(true);
    };

    const handleEdit = (article: any) => {
        setEditingArticle(article);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingArticle(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-gray-400 hover:text-violet-600 transition text-sm font-medium">
                            ← Retour au blog
                        </Link>
                        <span className="text-gray-300">|</span>
                        <h1 className="text-xl font-bold text-gray-800">Gestion des articles</h1>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition"
                    >
                        + Nouvel article
                    </button>
                </div>
            </header>

            <section className="max-w-6xl mx-auto p-6">

                {showForm && (
                    <div className="mb-8">
                        <ArticleForm article={editingArticle} onClose={handleCloseForm} />
                    </div>
                )}

                <div className="space-y-3">
                    {articles.length === 0 ? (
                        <p className="text-gray-400 text-center py-20">
                            Aucun article. Créez-en un !
                        </p>
                    ) : (
                        articles.map((article: any) => (
                            <div
                                key={article.id}
                                className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-4">
                                    {article.image && (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                        />
                                    )}
                                    <div>
                                        <h2 className="text-base font-semibold text-gray-800">{article.title}</h2>
                                        <p className="text-gray-400 text-sm line-clamp-1">{article.description}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleEdit(article)}
                                        className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => deleteArticle(article.id)}
                                        className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </section>
        </div>
    );
}
