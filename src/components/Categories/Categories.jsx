import { useSearchParams } from "react-router-dom";
import Container from "../Shared/Container";
import { categories } from "./CategoriesData.js";
import CategoryBox from "./CategoryBox";

const Categories = () => {
    const [params] = useSearchParams();
    const category = params.get("category");

    return (
        <Container>
            <div
                className="
          bg-white bg-gradient-to-br from-black/5 animated-border-2 border-t-2 
          font-[font1] shadow-slate-400 shadow-lg rounded-full
          -mt-5 relative pt-4 
          flex gap-4 overflow-x-auto scrollbar-hide
          sm:grid sm:grid-cols-5 sm:gap-3
          md:grid-cols-4
          lg:grid-cols-6
          xl:grid-cols-8
        "
            >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
