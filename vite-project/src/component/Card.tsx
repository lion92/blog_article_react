import {Link} from "react-router-dom";
import {JSX} from "react";
import Precedent from "./Precedent.tsx";

type Article = {
    id: number;
    title: string;
    description: string;
    image: string;
};

type Props = {
    article: Article;
};

function Card({article}: Props): JSX.Element {
    return (
        <>
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                />

                <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">
                        {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                        {article.description}
                    </p>

                    <Link
                        to={`/article/${article.id}`}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Lire l'article →
                    </Link>
                </div>

            </div>
        </>
    );

}

export default Card;