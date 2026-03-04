import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { JSX } from "react";

import { useArticleStore } from "../../useArticleStore";
import Precedent from "../Precedent";

function Article(): JSX.Element {

    const { id } = useParams();

    const { article, fetchArticle, loading } = useArticleStore();

    useEffect(() => {
        if (id) {
            fetchArticle(Number(id));
        }
    }, [id]);

    if (loading || !article) {
        return <p className="text-center p-10">Chargement...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">

            <Precedent />

            <img
                src={article.image}
                className="w-full rounded-xl mb-6"
            />

            <h1 className="text-4xl font-bold mb-4">
                {article.title}
            </h1>

            <div className="max-w-4xl mx-auto px-6 py-10">

                {article.introduction && (
                    <p className="text-gray-700 text-lg leading-relaxed mb-10">
                        {article.introduction}
                    </p>
                )}

                <div className="space-y-10">

                    {article.sections?.map((section, index) => (
                        <div key={section.id || index}>

                            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
                                {index + 1}. {section.title}
                            </h2>

                            <p className="text-gray-700 leading-relaxed text-lg">
                                {section.text}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default Article;