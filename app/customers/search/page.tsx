import Navbar from "../../../components/Navbar";
import SearchBar from "../../../components/SearchBar";
import SearchSalonCard from "../../../components/SearchSalonCard";
import { salons } from "../../../data/salons";

export default function SearchPage({
    searchParams,
}: {
    searchParams: { category?: string; location?: string }
}) {
    let filteredSalons = salons;

    if (searchParams.category) {
        filteredSalons = filteredSalons.filter(s => s.category?.toLowerCase() === searchParams.category?.toLowerCase());
    }

    if (searchParams.location) {
        filteredSalons = filteredSalons.filter(s => s.city?.toLowerCase() === searchParams.location?.toLowerCase());
    }

    return (
        <main className="min-h-screen bg-neutral-100 flex flex-col">
            <Navbar />

            <div className="bg-white border-b border-neutral-200 pt-6 pb-6 mt-0 shadow-sm relative z-30">
                <div className="scale-95 origin-top">
                    <SearchBar />
                </div>
            </div>

            <div className="flex flex-1 h-[calc(100vh-140px)] overflow-hidden">
                {/* Left side: Results */}
                <div className="w-full lg:w-3/5 overflow-y-auto p-4 lg:p-6 pb-24 space-y-4">
                    <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-800">{filteredSalons.length} results found</h2>
                            {(searchParams.category || searchParams.location) && (
                                <p className="text-neutral-500 text-sm mt-1">
                                    Filters: {searchParams.category && <span className="font-semibold text-peach">{searchParams.category}</span>}
                                    {searchParams.category && searchParams.location && " • "}
                                    {searchParams.location && "in "}
                                    {searchParams.location && <span className="font-semibold text-peach">{searchParams.location}</span>}
                                </p>
                            )}
                        </div>
                        <select className="bg-white border border-neutral-300 text-sm rounded-lg px-3 py-2 outline-none shadow-sm hover:border-peach focus:border-peach transition-colors cursor-pointer">
                            <option>Recommended</option>
                            <option>Highest Rated</option>
                            <option>Distance</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-4">
                        {filteredSalons.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-neutral-200 mt-4">
                                <h3 className="text-xl font-bold text-neutral-800 mb-2">No salons found</h3>
                                <p className="text-neutral-500">We couldn't find any salons matching your search criteria. Try adjusting your filters.</p>
                            </div>
                        ) : (
                            filteredSalons.map(salon => (
                                <SearchSalonCard key={salon.slug} salon={salon} />
                            ))
                        )}
                    </div>
                </div>

                {/* Right side: Map */}
                <div className="hidden lg:block lg:w-2/5 p-4 lg:p-6 pl-0 pb-12">
                    <div
                        className="w-full h-full rounded-2xl bg-cover bg-center shadow-inner border border-neutral-200 relative overflow-hidden"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200')" }}
                    >
                        {/* Mock Map Markers */}
                        <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs ring-4 ring-orange-500/20">

                        </div>
                        <div className="absolute top-1/2 left-2/3 w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs ring-4 ring-orange-500/20">

                        </div>
                        <div className="absolute top-2/3 left-1/4 w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs ring-4 ring-orange-500/20">

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
