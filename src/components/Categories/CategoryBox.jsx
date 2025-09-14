import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryBox = ({ label, icon: Icon, selected }) => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const handleClick = () => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updateQuery = { ...currentQuery, category: label };

        const url = qs.stringifyUrl({
            url: "/",
            query: updateQuery,
        });
        navigate(url);
    };

    params.get("category");

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 
        border-b-2 hover:text-neutral-800 cursor-pointer transition 
        ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}
        w-full sm:w-auto`}
        >
            {/* Icon with responsive sizes */}
            <Icon className="text-neutral-600" size={22} sm:size={24} md:size={26} />

            {/* Label with responsive font sizes */}
            <div className="text-xs sm:text-sm md:text-base font-medium text-center">
                {label}
            </div>
        </div>
    );
};

export default CategoryBox;
