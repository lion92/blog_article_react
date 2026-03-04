import { useEffect, useState } from "react";
import { useArticleStore } from "../../useArticleStore.ts";
import ArticleForm from "../article/ArticleForm.tsx";

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

    const handleEdit = (article:any) => {
        setEditingArticle(article);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingArticle(null);
    };

    return (
        <section className="max-w-6xl mx-auto p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestion des articles</h1>

                <button
                    onClick={handleCreate}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Nouvel article
                </button>
            </div>

            {showForm && (
                <div className="mb-8">
                    <ArticleForm
                        article={editingArticle}
                        onClose={handleCloseForm}
                    />
                </div>
            )}

            <div className="space-y-4">

                {articles.map((article:any) => (
                    <div
                        key={article.id}
                        className="border p-4 rounded flex justify-between items-center"
                    >

                        <div>
                            <h2 className="text-xl font-semibold">{article.title}</h2>
                            <p className="text-gray-600">{article.description}</p>
                        </div>

                        <div className="flex gap-2">

                            <button
                                onClick={() => handleEdit(article)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Modifier
                            </button>

                            <button
                                onClick={() => deleteArticle(article.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Supprimer
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}