import { useEffect } from "react";
import Card from "./component/Card";
import { useArticleStore } from "./useArticleStore.ts";

export default function Home() {

    const { articles, fetchArticles, loading } = useArticleStore();

    useEffect(() => {
        fetchArticles();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">

            <h2 className="text-3xl font-bold mb-8 text-gray-800">Derniers articles</h2>

            {articles.length === 0 ? (
                <p className="text-gray-400 text-center py-16">Aucun article pour l'instant.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <Card key={article.id} article={article} />
                    ))}
                </div>
            )}

        </section>
    );
}
