import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface SearchFiltersProps {
  selectedVenue: string;
  selectedGenre: string;
  selectedCity: string;
  onVenueChange: (venue: string) => void;
  onGenreChange: (genre: string) => void;
  onCityChange: (city: string) => void;
  venues: string[];
  genres: string[];
  cities: string[];
  onClear: () => void;
}

export function SearchFilters({
  selectedVenue,
  selectedGenre,
  selectedCity,
  onVenueChange,
  onGenreChange,
  onCityChange,
  venues,
  genres,
  cities,
  onClear,
}: SearchFiltersProps) {
  const hasFilters = selectedVenue !== 'all' || selectedGenre !== 'all' || selectedCity !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3>Filter Shows</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="city-select">City</Label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger id="city-select">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre-select">Genre</Label>
          <Select value={selectedGenre} onValueChange={onGenreChange}>
            <SelectTrigger id="genre-select">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="venue-select">Venue</Label>
          <Select value={selectedVenue} onValueChange={onVenueChange}>
            <SelectTrigger id="venue-select">
              <SelectValue placeholder="All Venues" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Venues</SelectItem>
              {venues.map((venue) => (
                <SelectItem key={venue} value={venue}>
                  {venue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
