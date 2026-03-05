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

    if (articles.length === 0) {
        return (
            <section className="max-w-6xl mx-auto px-6 py-20 text-center">
                <p className="text-gray-400 text-lg">Aucun article pour l'instant.</p>
            </section>
        );
    }

    const [featured, ...rest] = articles;

    return (
        <section className="max-w-6xl mx-auto px-6 py-14">

            <div className="flex items-end justify-between mb-10">
                <div>
                    <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-1">Le blog</p>
                    <h2 className="text-3xl font-bold text-gray-900">Derniers articles</h2>
                </div>
            </div>

            <div className="mb-8">
                <Card article={featured} featured />
            </div>

            {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map((article) => (
                        <Card key={article.id} article={article} />
                    ))}
                </div>
            )}

        </section>
    );
}
