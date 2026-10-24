import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import categoryService from "../../services/categoryService.js";
import PageContainer from "../../components/layout/PageContainer.jsx";
import Loader from "../../components/common/Loader.jsx";

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await categoryService.getCategories();
        if (res?.data) setCategories(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, []);

  return (
    <PageContainer>
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Curated Disciplines
        </p>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-slate-900">
          The Collections
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Explore our artisanal collections spanning precision horology, fine leathercraft, and rare perfumes.
        </p>
      </div>

      {isLoading ? (
        <Loader text="Loading collections..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/categories/${cat.slug}`}
              className="group flex flex-col bg-white border border-slate-200 rounded-sm overflow-hidden shadow-subtle hover:shadow-card transition-all"
            >
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/10 transition-colors" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-xl font-medium text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-navy-950">
                  <span>Explore Pieces</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Categories;
