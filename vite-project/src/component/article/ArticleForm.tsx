import { useState } from "react";
import { useArticleStore } from "../../useArticleStore";

export default function ArticleForm({ article, onClose }: any) {

    const { createArticle, updateArticle } = useArticleStore();

    const [form, setForm] = useState({
        title: article?.title || "",
        description: article?.description || "",
        image: article?.image || "",
        introduction: article?.introduction || "",
        sections: article?.sections || []
    });

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSectionChange = (index: number, field: string, value: string) => {
        const newSections = [...form.sections];
        newSections[index][field] = value;

        setForm({
            ...form,
            sections: newSections
        });
    };

    const addSection = () => {
        setForm({
            ...form,
            sections: [...form.sections, { title: "", text: "" }]
        });
    };

    const removeSection = (index: number) => {
        const newSections = form.sections.filter((_:any, i:number) => i !== index);

        setForm({
            ...form,
            sections: newSections
        });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (article) {
            await updateArticle(article.id, form);
        } else {
            await createArticle(form);
        }

        onClose();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white p-6 rounded shadow"
        >

            <input
                name="title"
                placeholder="Titre"
                value={form.title}
                onChange={handleChange}
                className="border p-2"
            />

            <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border p-2"
            />

            <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                className="border p-2"
            />

            <textarea
                name="introduction"
                placeholder="Introduction"
                value={form.introduction}
                onChange={handleChange}
                className="border p-2"
            />

            {/* Sections */}

            <h2 className="text-xl font-bold mt-6">
                Sections
            </h2>

            {form.sections.map((section:any, index:number) => (

                <div key={index} className="border p-4 rounded flex flex-col gap-2">

                    <input
                        placeholder="Titre section"
                        value={section.title}
                        onChange={(e) =>
                            handleSectionChange(index, "title", e.target.value)
                        }
                        className="border p-2"
                    />

                    <textarea
                        placeholder="Texte section"
                        value={section.text}
                        onChange={(e) =>
                            handleSectionChange(index, "text", e.target.value)
                        }
                        className="border p-2"
                    />

                    <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded w-fit"
                    >
                        Supprimer section
                    </button>

                </div>
            ))}

            <button
                type="button"
                onClick={addSection}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Ajouter une section
            </button>

            <button className="bg-blue-600 text-white p-2 rounded">
                {article ? "Modifier" : "Créer"}
            </button>

        </form>
    );
}