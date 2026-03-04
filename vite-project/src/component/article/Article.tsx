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
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 py-10">

                <div className="mb-6">
                    <Precedent />
                </div>

                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full rounded-2xl mb-8 shadow-md object-cover max-h-80"
                />

                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    {article.title}
                </h1>

                {article.introduction && (
                    <p className="text-gray-600 text-lg leading-relaxed mb-10 border-l-4 border-violet-400 pl-5 italic">
                        {article.introduction}
                    </p>
                )}

                <div className="space-y-10">
                    {article.sections?.map((section, index) => (
                        <div key={section.id || index}>
                            <h2 className="text-2xl font-semibold text-violet-700 mb-3">
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
