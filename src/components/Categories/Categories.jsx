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
                className=" border-2 shadow-slate-400 shadow-lg rounded-full mt-2
          pt-4 
          flex 
          gap-4
          overflow-x-auto 
          sm:grid 
          sm:grid-cols-2 
          md:grid-cols-4 
          lg:grid-cols-8
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
