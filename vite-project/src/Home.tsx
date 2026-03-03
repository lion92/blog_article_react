import Card from "./component/Card.tsx";
import {JSX} from "react";


export const articles = [{
    id: 7,
    title: "Guide complet des Collections en Java",
    description: "Tout comprendre sur List, Set, Map, Queue et le Java Collections Framework.",
    image: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
      <rect width="100%" height="100%" fill="#1e293b"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-size="26" font-family="Arial" fill="white">
        Java Collections Framework
      </text>
    </svg>
  `)}`,
    content: {
        introduction:
            "Le Java Collections Framework (JCF) est un ensemble d'interfaces et de classes permettant de stocker, manipuler et organiser des groupes d’objets. Il fournit des structures de données performantes et des algorithmes prêts à l’emploi.",

        sections: [
            {
                title: "Architecture du Java Collections Framework",
                text:
                    "Le framework est basé sur plusieurs interfaces principales : Collection, List, Set, Queue et Map. Collection est l’interface racine, tandis que Map fonctionne séparément avec un système clé-valeur."
            },
            {
                title: "Les List (ArrayList, LinkedList)",
                text:
                    "Une List est une collection ordonnée qui autorise les doublons. ArrayList est rapide pour l’accès par index tandis que LinkedList est plus adaptée aux insertions et suppressions fréquentes."
            },
            {
                title: "Les Set (HashSet, TreeSet)",
                text:
                    "Un Set ne permet pas les doublons. HashSet offre de bonnes performances sans garantir l’ordre. TreeSet trie automatiquement les éléments selon leur ordre naturel ou un Comparator."
            },
            {
                title: "Les Map (HashMap, TreeMap)",
                text:
                    "Une Map stocke des paires clé-valeur. HashMap est rapide et ne garantit pas l’ordre. TreeMap maintient les clés triées. Les clés doivent être uniques."
            },
            {
                title: "Les Queue et Deque",
                text:
                    "Les Queue suivent généralement le principe FIFO (First In First Out). PriorityQueue permet de prioriser les éléments. Deque permet un accès aux deux extrémités."
            },
            {
                title: "Complexité et Performance",
                text:
                    "ArrayList offre un accès en O(1). HashMap et HashSet ont une complexité moyenne en O(1). TreeMap et TreeSet fonctionnent en O(log n) grâce à leur structure en arbre."
            },
            {
                title: "Bonnes pratiques",
                text:
                    "Toujours programmer contre les interfaces (List au lieu de ArrayList). Choisir la structure selon le besoin : ordre, performance, unicité ou tri automatique."
            }
        ]
    }
}];

function Home(): JSX.Element {
    return (
        <>
            <section className="max-w-6xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Articles
                </h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {articles.map(article => (
                        <Card key={article.id} article={article}/>
                    ))}
                </div>

            </section>
        </>
    );
}

export default Home;