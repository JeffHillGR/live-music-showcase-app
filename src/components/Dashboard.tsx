import { useState, useMemo } from 'react';
import { Calendar } from './ui/calendar';
import { EventsList } from './EventsList';
import { SearchFilters } from './SearchFilters';
import { mockEvents } from '../data/mockEvents';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { SubmitEventForm } from './SubmitEventForm';
import logoTemp from '../assets/logo-temp.png?url';
import liveBand1 from '../assets/live-band-1.jpg';
import liveBand2 from '../assets/live-band-2.jpg';
import liveBand4 from '../assets/live-band-4.jpg';
import intersectionImage from '../assets/Intersection.jpg';

export function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // null means show all upcoming events
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [showEventModal, setShowEventModal] = useState(false);


  // Get unique venues, genres, and cities for filter options
  const venues = useMemo(() => {
    const uniqueVenues = new Set(mockEvents.map(event => event.venue.name));
    return Array.from(uniqueVenues).sort();
  }, []);

  const genres = useMemo(() => {
    const uniqueGenres = new Set(mockEvents.map(event => event.genre));
    return Array.from(uniqueGenres).sort();
  }, []);

  const cities = useMemo(() => {
    const uniqueCities = new Set(mockEvents.map(event => event.venue.city));
    return Array.from(uniqueCities).sort();
  }, []);

  // Filter events - show next 7 days by default, or specific date if selected
  const filteredEvents = mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    let dateMatch;
    if (selectedDate === null) {
      // Show all events in the next 7 days
      dateMatch = eventDate >= today && eventDate < sevenDaysFromNow;
    } else {
      // Show events for the selected date
      dateMatch = (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    }

    const venueMatch = selectedVenue === 'all' || event.venue.name === selectedVenue;
    const genreMatch = selectedGenre === 'all' || event.genre === selectedGenre;
    const cityMatch = selectedCity === 'all' || event.venue.city === selectedCity;

    return dateMatch && venueMatch && genreMatch && cityMatch;
  }).slice(0, 15); // Limit to 15 events (3x5 grid)

  const handleClearFilters = () => {
    setSelectedVenue('all');
    setSelectedGenre('all');
    setSelectedCity('all');
  };

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return 'Next 7 Days'; // Show default text when no date selected
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">Kristina's Live Music Site</h1>
            <p className="text-sm text-muted-foreground">
              Supporting small venues & local talent in West Michigan
            </p>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Logo - aligned with banner */}
          <div className="bg-white shadow-lg flex items-center justify-center" style={{ height: '320px', border: '3px solid #1e3a5f', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <img
              src={logoTemp}
              alt="Set List Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Banner */}
          <div className="relative overflow-hidden bg-gray-900" style={{ height: '320px', borderRadius: '0.5rem' }}>
            {/* Single image - positioned to show faces better */}
            <img
              src={liveBand1}
              alt="Live band performing at intimate venue"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 30%' }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              {/* Text content on the bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Find Your Next Musical Adventure
                </h2>
                <p className="text-white/90 text-base">
                  Intimate venues. Local talent. Unforgettable nights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar with Calendar */}
          <aside className="space-y-4">
            {/* Mobile Calendar Popover */}
            <div className="lg:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {formatSelectedDate(selectedDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Desktop Calendar */}
            <Card className="hidden lg:block p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md"
              />
            </Card>

            {/* Search Filters */}
            <Card className="p-6">
              <SearchFilters
                selectedVenue={selectedVenue}
                selectedGenre={selectedGenre}
                selectedCity={selectedCity}
                onVenueChange={setSelectedVenue}
                onGenreChange={setSelectedGenre}
                onCityChange={setSelectedCity}
                venues={venues}
                genres={genres}
                cities={cities}
                onClear={handleClearFilters}
              />
            </Card>

            {/* Venue Pick of the Week */}
            <Card className="hidden lg:block overflow-hidden flex-shrink-0">
              <div className="relative w-full" style={{ height: '12rem' }}>
                <img
                  src={intersectionImage}
                  alt="The Intersection venue"
                  className="w-full object-cover"
                  style={{ height: '12rem' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
              <div className="p-6 pt-4">
                <p className="text-xs font-medium text-muted-foreground mb-1">Our Venue Pick of the Week:</p>
                <h3 className="text-black font-bold text-2xl mb-4">The Intersection</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Celebrating 50 years as a staple of Grand Rapids' music scene! Known for its intimate atmosphere and stellar sound system, hosting everyone from local indie bands to national touring acts.
                </p>
                <div className="space-y-2 mb-5">
                  <p className="text-xs font-medium text-gray-700">133 Grandville Ave SW, Grand Rapids, MI</p>
                  <p className="text-xs font-medium text-gray-700">Capacity: 800 | All Ages Welcome</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://sectionlive.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Visit Website →
                  </a>
                  <span className="text-xs text-muted-foreground">|</span>
                  <a
                    href="#"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Shows →
                  </a>
                </div>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-6 hidden lg:block">
              <h3 className="mb-2">About</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover live music at West Michigan's best small venues. We spotlight
                local talent at intimate bars, coffee houses, breweries, and restaurants
                across the lakeshore.
              </p>
            </Card>
          </aside>

          {/* Events List */}
          <div>
            <EventsList events={filteredEvents} selectedDate={selectedDate} />
          </div>
        </div>
      </main>

      {/* Submit Event Button */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <div className="hidden lg:block"></div>
          <div style={{ backgroundColor: '#f3f4f6', padding: '40px 0', borderRadius: '8px', textAlign: 'center' }}>
            <button
              onClick={() => setShowEventModal(true)}
              style={{
                backgroundColor: '#ea580c',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '20px' }}>+</span>
              Suggest an Event
            </button>
          </div>
        </div>
      </div>

      {/* Simple Custom Modal */}
      {showEventModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowEventModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              padding: '32px',
              paddingTop: '48px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEventModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                lineHeight: '1'
              }}
            >
              ×
            </button>
            <SubmitEventForm onSuccess={() => setShowEventModal(false)} />
          </div>
        </div>
      )}

      {/* Banner Ad */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <div className="hidden lg:block"></div>
          <div>
            <a
              href="https://www.thestraycafe.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
            >
              <div
                style={{
                  height: '150px',
                  width: '100%',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <img
                  src={liveBand4}
                  alt="The Stray Cafe - Featured Sponsor"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10
                }}>
                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #e5e7eb'
                  }}>
                    <p style={{
                      color: '#1f2937',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      margin: 0
                    }}>The Stray Cafe • Visit Us</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">Set List</h3>
          <p className="text-gray-400">Grand Rapids, Michigan, USA</p>
          <p className="text-gray-500 text-sm mt-4">© 2025 Set List. Supporting small venues & local talent in West Michigan.</p>
        </div>
      </footer>
    </div>
  );
}
