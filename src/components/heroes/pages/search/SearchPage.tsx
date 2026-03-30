import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "../../components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "../../actions/search-heroes.action";
import { HeroGrid } from "../../components/HeroGrid";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;
  const { data: heroes = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      <CustomJumbotron
        title="Busqueda de Superheroes"
        description="Descubre, explora y administra super héroes y villanos"
      />
      <CustomBreadcrumbs
        currentPage="Search Page"
        breadcrumbs={[
          { label: "Home1", to: "/" },
          { label: "Home2", to: "/" },
          { label: "Home3", to: "/" },
        ]}
      />
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
