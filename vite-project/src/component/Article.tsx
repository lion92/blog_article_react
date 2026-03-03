import { useParams } from "react-router-dom";

import {JSX} from "react";
import {articles} from "../Home.tsx";
import Precedent from "./Precedent.tsx";

function Article(): JSX.Element {
    const { id } = useParams();

    const article = articles.find(a => a.id === Number(id));

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Precedent></Precedent>
            <img
                src={article.image}
                className="w-full rounded-xl mb-6"
            />

            <h1 className="text-4xl font-bold mb-4">
                {article.title}
            </h1>

            <div className="max-w-4xl mx-auto px-6 py-10">

                {/* Introduction */}
                {article.content?.introduction && (
                    <p className="text-gray-700 text-lg leading-relaxed mb-10">
                        {article.content.introduction}
                    </p>
                )}

                {/* Sections */}
                <div className="space-y-10">
                    {article.content?.sections?.map((section, index) => (
                        <div key={index}>

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