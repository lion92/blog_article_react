import {useNavigate} from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="px-4 mb-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
            ← Retour
        </button>
    );
}

export default BackButton;