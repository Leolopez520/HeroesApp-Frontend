import { Badge } from "@/components/ui/badge";
import { Users, Heart, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { use } from "react";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";

export const HeroStats = () => {
  const { data: summary } = useHeroSummary();
  const { favoriteCount } = use(FavoriteHeroContext);

  const totalAux = summary?.totalHeroes || 0;
  const percentageFavorite =
    totalAux > 0 ? ((favoriteCount * 100) / totalAux).toFixed(2) : "0.00";

  if (!summary) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <HeroStatCard
          title="Total"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
          <div className="flex gap-1 mt-2">
            <Badge variant="secondary" className="text-xs">
              {summary?.heroCount} Heroes
            </Badge>
            <Badge variant="destructive" className="text-xs">
              {summary?.villainCount} Villains
            </Badge>
          </div>
        </HeroStatCard>

        <HeroStatCard
          title="Favorites"
          icon={<Heart className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
          <p className="text-xs text-muted-foreground">
            {percentageFavorite}% of total
          </p>
        </HeroStatCard>

        <HeroStatCard
          title="Strongest"
          icon={<Zap className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-lg font-bold">
            {summary?.strongestHero.alias}
          </div>
          <p className="text-xs text-muted-foreground">
            Strength: {summary?.strongestHero.strength}
          </p>
        </HeroStatCard>

        <HeroStatCard
          title="Smartest"
          icon={<Heart className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
          <p className="text-xs text-muted-foreground">
            Intelligence: {summary?.smartestHero.intelligence}
          </p>
        </HeroStatCard>
      </div>
    </>
  );
};
