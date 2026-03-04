import { useNavigate } from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-violet-600 transition text-sm font-medium"
        >
            ← Retour
        </button>
    );
}

export default BackButton;
