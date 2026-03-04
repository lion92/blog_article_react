import {useEffect} from "react";
import Card from "./component/Card";
import {useArticleStore} from "./useArticleStore.ts";
import {Link} from "react-router-dom";

export default function Home() {

    const {articles, fetchArticles, loading} = useArticleStore();

    useEffect(() => {
        fetchArticles();
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <>
            <Link
                to="/admin/articles"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Créer un article
            </Link>

            <section className="max-w-6xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-6">Articles</h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <Card key={article.id} article={article}/>
                    ))}
                </div>

            </section>
        </>
    );
}