import { MusicEvent } from '../types/event';

// Generate events for the next 7 days
const generateMockEvents = (): MusicEvent[] => {
  const venues = [
    { name: "The Tip Top Deluxe Bar & Grill", city: "Grand Haven", type: "Bar & Grill" },
    { name: "Seven Steps Up", city: "Spring Lake", type: "Jazz Club" },
    { name: "The Kirby House", city: "Grand Haven", type: "Historic Restaurant" },
    { name: "The Crossings", city: "Holland", type: "Coffee House" },
    { name: "New Holland Brewing", city: "Holland", type: "Brewery" },
    { name: "Unruly Brewing Co.", city: "Muskegon", type: "Brewery" },
    { name: "Pike 51 Brewing", city: "Hudsonville", type: "Brewpub" },
    { name: "Our Brewing Company", city: "Holland", type: "Brewery" },
    { name: "The Mitten Bar", city: "Ludington", type: "Bar" },
    { name: "Dockers Fish House", city: "Muskegon", type: "Seafood Restaurant" },
    { name: "Stable Grounds Coffee", city: "Coopersville", type: "Coffee Shop" },
    { name: "The Bookman", city: "Grand Haven", type: "Bookstore Cafe" },
    { name: "Piper's Restaurant", city: "Fennville", type: "Restaurant" },
    { name: "Salt of the Earth", city: "Fennville", type: "Farm Restaurant" },
    { name: "Virtue Cider", city: "Fennville", type: "Cidery" },
    // Grand Rapids area venues
    { name: "Wealthy Theatre", city: "Grand Rapids", type: "Historic Theater" },
    { name: "The Pyramid Scheme", city: "Grand Rapids", type: "Bar & Arcade" },
    { name: "SpeakEZ Lounge", city: "Grand Rapids", type: "Lounge" },
    { name: "Billy's Lounge", city: "Grand Rapids", type: "Dive Bar" },
    { name: "The Meanwhile Bar", city: "Grand Rapids", type: "Bar" },
    { name: "Harmony Brewing", city: "Grand Rapids", type: "Brewery" },
    { name: "Rockwell Republic", city: "Grand Rapids", type: "Gastropub" },
    { name: "Electric Cheetah", city: "Grand Rapids", type: "Bar & Grill" },
    { name: "The Old Goat", city: "Grand Rapids", type: "Tavern" },
    { name: "Mulligan's Pub", city: "Wyoming", type: "Irish Pub" },
    { name: "Railtown Brewing", city: "Wyoming", type: "Brewery" },
    { name: "The Station Grill", city: "Wyoming", type: "Bar & Grill" },
    { name: "Bob's Sports Bar", city: "Kentwood", type: "Sports Bar" },
    { name: "Bier Distillery", city: "Kentwood", type: "Distillery" },
    { name: "Rupert's Brew House", city: "Kentwood", type: "Brewpub" },
    { name: "The Cedar Lounge", city: "Caledonia", type: "Lounge" },
    { name: "Village Pub & Grill", city: "Caledonia", type: "Pub" },
    { name: "Vitale's", city: "Ada", type: "Italian Restaurant" },
    { name: "Ada Village Pub", city: "Ada", type: "Pub" },
    { name: "Rockford Brewing", city: "Rockford", type: "Brewery" },
    { name: "The Corner Bar", city: "Rockford", type: "Bar" },
    { name: "Flatwater Tavern", city: "Lowell", type: "Tavern" },
    { name: "Lowell Beer Company", city: "Lowell", type: "Brewery" },
    { name: "Gaslight Village", city: "East Grand Rapids", type: "Restaurant" },
    { name: "The Chimes", city: "East Grand Rapids", type: "Bar & Grill" },
    { name: "Standale House", city: "Standale", type: "Bar & Grill" },
    { name: "Riverside Cafe", city: "Standale", type: "Cafe" },
  ];

  const bands = [
    { name: "The Midwest String Collective", genre: "Bluegrass", image: "https://images.unsplash.com/photo-1745872261396-739c87693844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlZ3Jhc3MlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzYwMjc3Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Lakeshore Blues Band", genre: "Blues", image: "https://images.unsplash.com/photo-1572528481080-617af8f6bc93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlcyUyMG11c2ljaWFuJTIwYmFyfGVufDF8fHx8MTc2MDI3NzY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Red Pine", genre: "Folk", image: "https://images.unsplash.com/photo-1676039094008-661a89bd0956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xrJTIwYmFuZCUyMGJyZXdlcnl8ZW58MXx8fHwxNzYwMjc3NjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "The Crane Wives", genre: "Indie Folk", image: "https://images.unsplash.com/photo-1758610605872-3195caed0bdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGd1aXRhciUyMGNvZmZlZSUyMHNob3B8ZW58MXx8fHwxNzYwMjc3NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Lazy Genius", genre: "Jazz", image: "https://images.unsplash.com/photo-1563638431037-e06783610967?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwYmFuZCUyMHNtYWxsJTIwdmVudWV8ZW58MXx8fHwxNzYwMjc3NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Michigander", genre: "Indie Rock", image: "https://images.unsplash.com/photo-1622817245531-a07976979cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHJvY2slMjBjb25jZXJ0fGVufDF8fHx8MTc2MDI3NzY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "The Bootstrap Boys", genre: "Americana", image: "https://images.unsplash.com/photo-1758610605872-3195caed0bdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGd1aXRhciUyMGNvZmZlZSUyMHNob3B8ZW58MXx8fHwxNzYwMjc3NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Moors & McCumber", genre: "Folk", image: "https://images.unsplash.com/photo-1676039094008-661a89bd0956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xrJTIwYmFuZCUyMGJyZXdlcnl8ZW58MXx8fHwxNzYwMjc3NjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Frontier Ruckus", genre: "Indie Folk", image: "https://images.unsplash.com/photo-1676039094008-661a89bd0956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xrJTIwYmFuZCUyMGJyZXdlcnl8ZW58MXx8fHwxNzYwMjc3NjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "May Erlewine", genre: "Folk/Soul", image: "https://images.unsplash.com/photo-1704479220659-8d5911f8432c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nZXIlMjBzb25nd3JpdGVyJTIwdmVudWV8ZW58MXx8fHwxNzYwMjc3Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "The Soil & The Sun", genre: "Indie Rock", image: "https://images.unsplash.com/photo-1622817245531-a07976979cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHJvY2slMjBjb25jZXJ0fGVufDF8fHx8MTc2MDI3NzY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Sawyer Fredericks", genre: "Blues/Folk", image: "https://images.unsplash.com/photo-1572528481080-617af8f6bc93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlcyUyMG11c2ljaWFuJTIwYmFyfGVufDF8fHx8MTc2MDI3NzY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Jake Stevens", genre: "Singer-Songwriter", image: "https://images.unsplash.com/photo-1704479220659-8d5911f8432c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nZXIlMjBzb25nd3JpdGVyJTIwdmVudWV8ZW58MXx8fHwxNzYwMjc3Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "The Gasoline Gypsies", genre: "Americana", image: "https://images.unsplash.com/photo-1693948923846-39cf292b698d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MDI3NzY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Honeytree", genre: "Folk", image: "https://images.unsplash.com/photo-1676039094008-661a89bd0956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xrJTIwYmFuZCUyMGJyZXdlcnl8ZW58MXx8fHwxNzYwMjc3NjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Dead Sailors", genre: "Sea Shanty/Folk", image: "https://images.unsplash.com/photo-1676039094008-661a89bd0956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xrJTIwYmFuZCUyMGJyZXdlcnl8ZW58MXx8fHwxNzYwMjc3NjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Greensky Bluegrass Trio", genre: "Bluegrass", image: "https://images.unsplash.com/photo-1745872261396-739c87693844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlZ3Jhc3MlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzYwMjc3Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "The Accidentals", genre: "Indie Folk", image: "https://images.unsplash.com/photo-1758610605872-3195caed0bdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGd1aXRhciUyMGNvZmZlZSUyMHNob3B8ZW58MXx8fHwxNzYwMjc3NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Seth Bernard", genre: "Folk", image: "https://images.unsplash.com/photo-1676039094008-661a89bd0956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xrJTIwYmFuZCUyMGJyZXdlcnl8ZW58MXx8fHwxNzYwMjc3NjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Joe Sundell Trio", genre: "Jazz", image: "https://images.unsplash.com/photo-1563638431037-e06783610967?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwYmFuZCUyMHNtYWxsJTIwdmVudWV8ZW58MXx8fHwxNzYwMjc3NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ];

  const descriptions = [
    "An intimate evening of original music and covers",
    "Join us for a night of authentic local talent",
    "Live music on the patio (weather permitting)",
    "Special acoustic set featuring local favorites",
    "Weekly showcase of West Michigan's finest musicians",
    "Don't miss this unique performance",
    "Great music, great food, great atmosphere",
    "Supporting local music since day one",
  ];

  const events: MusicEvent[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate events for the next 14 days
  for (let day = 0; day < 14; day++) {
    const eventDate = new Date(today);
    eventDate.setDate(today.getDate() + day);
    
    // Generate 12-15 events per day
    const eventsPerDay = 12 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < eventsPerDay; i++) {
      const venue = venues[Math.floor(Math.random() * venues.length)];
      const band = bands[Math.floor(Math.random() * bands.length)];
      const hour = 17 + Math.floor(Math.random() * 5); // Between 5 PM and 9 PM
      const minute = Math.random() > 0.5 ? '00' : '30';
      const coverCharges = ['Free', '$5', '$10', '$8', '$12', 'Free', 'Free', '$7'];
      
      events.push({
        id: `${day}-${i}`,
        bandName: band.name,
        genre: band.genre,
        venue: venue,
        date: eventDate,
        time: `${hour}:${minute} PM`,
        coverCharge: coverCharges[Math.floor(Math.random() * coverCharges.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        imageUrl: band.image,
      });
    }
  }

  return events;
};

export const mockEvents = generateMockEvents();
