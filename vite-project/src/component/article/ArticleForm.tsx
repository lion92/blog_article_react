import { useState } from "react";
import { useArticleStore } from "../../useArticleStore";

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition";
const labelClass = "text-sm font-medium text-gray-700 mb-1 block";

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
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSectionChange = (index: number, field: string, value: string) => {
        const newSections = [...form.sections];
        newSections[index][field] = value;
        setForm({ ...form, sections: newSections });
    };

    const addSection = () => {
        setForm({ ...form, sections: [...form.sections, { title: "", text: "" }] });
    };

    const removeSection = (index: number) => {
        setForm({ ...form, sections: form.sections.filter((_: any, i: number) => i !== index) });
    };

    const handleSubmit = async (e: any) => {
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
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    {article ? "Modifier l'article" : "Nouvel article"}
                </h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition text-lg font-bold leading-none"
                >
                    ✕
                </button>
            </div>

            <div className="grid gap-5">

                <div>
                    <label className={labelClass}>Titre</label>
                    <input
                        name="title"
                        placeholder="Titre de l'article"
                        value={form.title}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Description</label>
                    <input
                        name="description"
                        placeholder="Courte description"
                        value={form.description}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>URL de l'image</label>
                    <input
                        name="image"
                        placeholder="https://..."
                        value={form.image}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Introduction</label>
                    <textarea
                        name="introduction"
                        placeholder="Paragraphe d'introduction..."
                        value={form.introduction}
                        onChange={handleChange}
                        rows={3}
                        className={inputClass}
                    />
                </div>

            </div>

            {/* Sections */}
            <div className="mt-8">
                <h3 className="text-base font-bold text-gray-800 mb-4">Sections</h3>

                <div className="space-y-4">
                    {form.sections.map((section: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-4 bg-gray-50">

                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-semibold text-gray-500">Section {index + 1}</span>
                                <button
                                    type="button"
                                    onClick={() => removeSection(index)}
                                    className="text-red-400 hover:text-red-600 text-sm font-medium transition"
                                >
                                    Supprimer
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                <input
                                    placeholder="Titre de la section"
                                    value={section.title}
                                    onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                                    className={inputClass}
                                />
                                <textarea
                                    placeholder="Contenu de la section..."
                                    value={section.text}
                                    onChange={(e) => handleSectionChange(index, "text", e.target.value)}
                                    rows={4}
                                    className={inputClass}
                                />
                            </div>

                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addSection}
                    className="mt-4 w-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-violet-400 hover:text-violet-600 rounded-xl py-3 text-sm font-medium transition"
                >
                    + Ajouter une section
                </button>
            </div>

            <div className="flex gap-3 mt-8">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="flex-1 bg-violet-600 text-white py-2.5 rounded-lg font-medium hover:bg-violet-700 transition"
                >
                    {article ? "Enregistrer" : "Créer l'article"}
                </button>
            </div>

        </form>
    );
}
