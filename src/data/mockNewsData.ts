import { NewsArticle } from '@/types';

export const mockNewsData: NewsArticle[] = [
  {
    id: '1',
    title: 'SpaceX Launches 60 Starlink Satellites to Orbit',
    content: 'SpaceX successfully launched 60 Starlink satellites into orbit on Thursday, furthering its goal of creating a global high-speed internet network. The Falcon 9 rocket lifted off from Kennedy Space Center in Florida at 3:24 p.m. Eastern time.',
    summary: 'SpaceX adds 60 more satellites to its Starlink constellation.',
    category: 'Technology',
    author: 'Jane Smith',
    source: 'TechCrunch',
    publishedAt: '2025-06-10T15:30:00Z',
    url: 'https://example.com/spacex-launch',
    imageUrl: 'https://images.pexels.com/photos/23769/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 1205,
    comments: 342,
    views: 54280,
    isTrending: true,
    location: {
      country: 'USA',
      coordinates: [-80.6039, 28.6083]
    }
  },
  {
    id: '2',
    title: 'Global Markets React to Federal Reserve Interest Rate Decision',
    content: 'Global financial markets showed mixed reactions today as the Federal Reserve announced it would maintain current interest rates. The decision comes amid concerns about inflation and ongoing economic recovery efforts.',
    summary: 'Markets show volatility after Fed maintains interest rates.',
    category: 'Business',
    author: 'Robert Johnson',
    source: 'Bloomberg',
    publishedAt: '2025-06-09T18:45:00Z',
    url: 'https://example.com/federal-reserve',
    imageUrl: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 872,
    comments: 298,
    views: 42190,
    isTrending: true,
    location: {
      country: 'USA',
      coordinates: [-77.0369, 38.9072]
    }
  },
  {
    id: '3',
    title: 'Olympic Committee Announces New Host City for 2032 Games',
    content: 'The International Olympic Committee has announced Brisbane, Australia as the host city for the 2032 Summer Olympic Games. This marks the third time Australia will host the Olympics.',
    summary: 'Brisbane named host city for 2032 Olympic Games.',
    category: 'Sports',
    author: 'Michael Chen',
    source: 'ESPN',
    publishedAt: '2025-06-09T12:15:00Z',
    url: 'https://example.com/olympics-2032',
    imageUrl: 'https://images.pexels.com/photos/2404475/pexels-photo-2404475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 1543,
    comments: 421,
    views: 67830,
    isTrending: true,
    location: {
      country: 'Australia',
      coordinates: [153.0251, -27.4698]
    }
  },
  {
    id: '4',
    title: 'New AI Model Can Predict Protein Structures with 98% Accuracy',
    content: 'Scientists have developed a groundbreaking artificial intelligence model that can predict three-dimensional protein structures with unprecedented accuracy. The breakthrough could accelerate drug discovery and our understanding of diseases.',
    summary: 'Revolutionary AI model achieves near-perfect protein structure prediction.',
    category: 'Science',
    author: 'Emily Zhang',
    source: 'Nature Journal',
    publishedAt: '2025-06-08T09:30:00Z',
    url: 'https://example.com/ai-protein',
    imageUrl: 'https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 2105,
    comments: 287,
    views: 59340,
    isTrending: true,
    location: {
      country: 'UK',
      coordinates: [-0.1278, 51.5074]
    }
  },
  {
    id: '5',
    title: 'Major Film Studio Announces Expanded Universe for Popular Franchise',
    content: 'A leading film studio has announced plans to expand its most successful franchise with three new films and two spin-off television series over the next five years. The announcement has sent shares soaring.',
    summary: 'Film studio expands popular franchise with multiple new projects.',
    category: 'Entertainment',
    author: 'David Wilson',
    source: 'Hollywood Reporter',
    publishedAt: '2025-06-08T14:20:00Z',
    url: 'https://example.com/film-franchise',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 3287,
    comments: 928,
    views: 124750,
    isTrending: true,
    location: {
      country: 'USA',
      coordinates: [-118.2437, 34.0522]
    }
  },
  {
    id: '6',
    title: 'Quantum Computing Breakthrough Promises Faster Problem Solving',
    content: 'Researchers have achieved a significant breakthrough in quantum computing, demonstrating a new qubit architecture that maintains coherence a hundred times longer than previous designs. This advancement could lead to practical quantum computers capable of solving complex problems beyond the reach of classical computers.',
    summary: 'New quantum architecture extends qubit coherence time substantially.',
    category: 'Technology',
    author: 'Thomas Lee',
    source: 'MIT Technology Review',
    publishedAt: '2025-06-07T10:45:00Z',
    url: 'https://example.com/quantum-breakthrough',
    imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 1876,
    comments: 245,
    views: 48720,
    isTrending: false,
    location: {
      country: 'USA',
      coordinates: [-71.0942, 42.3601]
    }
  },
  {
    id: '7',
    title: 'New Study Finds Surprising Benefits of Intermittent Fasting',
    content: 'A comprehensive five-year study has revealed unexpected benefits of intermittent fasting beyond weight loss, including improved cognitive function and cellular repair mechanisms. Researchers followed over 5,000 participants across different age groups and lifestyles.',
    summary: 'Long-term study shows intermittent fasting improves brain function and cellular health.',
    category: 'Health',
    author: 'Sarah Johnson',
    source: 'Journal of Nutrition',
    publishedAt: '2025-06-07T08:15:00Z',
    url: 'https://example.com/fasting-benefits',
    imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 2354,
    comments: 518,
    views: 79640,
    isTrending: false,
    location: {
      country: 'Canada',
      coordinates: [-79.3832, 43.6532]
    }
  },
  {
    id: '8',
    title: 'Electric Vehicle Sales Surpass Traditional Cars in Leading Markets',
    content: 'For the first time, electric vehicle sales have exceeded those of traditional combustion engine cars in several key markets including Norway, the Netherlands, and parts of California. Industry analysts project this trend will accelerate as more affordable models enter the market.',
    summary: 'EV sales overtake traditional vehicles in multiple markets for the first time.',
    category: 'Business',
    author: 'Lisa Morgan',
    source: 'Financial Times',
    publishedAt: '2025-06-06T16:30:00Z',
    url: 'https://example.com/ev-sales',
    imageUrl: 'https://images.pexels.com/photos/9331075/pexels-photo-9331075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 1658,
    comments: 372,
    views: 52470,
    isTrending: false,
    location: {
      country: 'Norway',
      coordinates: [10.7522, 59.9139]
    }
  },
  {
    id: '9',
    title: 'Record-Breaking Athlete Signs Unprecedented Sponsorship Deal',
    content: 'After setting three world records this season, track and field star Amara Johnson has signed a groundbreaking sponsorship deal worth an estimated $50 million annually. The contract includes innovative performance-based incentives and social justice initiatives.',
    summary: 'World record holder secures largest sponsorship deal in track and field history.',
    category: 'Sports',
    author: 'James Williams',
    source: 'Sports Illustrated',
    publishedAt: '2025-06-06T11:20:00Z',
    url: 'https://example.com/athlete-deal',
    imageUrl: 'https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 2987,
    comments: 743,
    views: 104680,
    isTrending: false,
    location: {
      country: 'USA',
      coordinates: [-84.3880, 33.7490]
    }
  },
  {
    id: '10',
    title: 'Global Climate Summit Reaches Historic Agreement on Emissions',
    content: 'After intense negotiations, 195 countries have reached a landmark agreement at the Global Climate Summit to reduce carbon emissions by 60% before 2040. The pact includes unprecedented funding for developing nations to transition to renewable energy sources.',
    summary: 'World leaders agree on ambitious global emissions reduction targets.',
    category: 'Politics',
    author: 'Alex Rahman',
    source: 'Reuters',
    publishedAt: '2025-06-05T19:45:00Z',
    url: 'https://example.com/climate-agreement',
    imageUrl: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 3142,
    comments: 827,
    views: 118950,
    isTrending: false,
    location: {
      country: 'Switzerland',
      coordinates: [6.1432, 46.2044]
    }
  },
  {
    id: '11',
    title: 'Revolutionary Fusion Energy Reactor Reaches Stability Milestone',
    content: 'Scientists at the International Fusion Research Center have achieved sustained plasma stability for over 8 minutes in their experimental reactor, a critical milestone toward practical fusion energy. The breakthrough brings us closer to limitless clean energy.',
    summary: 'Fusion reactor maintains stable plasma for record duration, advancing clean energy goals.',
    category: 'Science',
    author: 'Sophia Chen',
    source: 'Scientific American',
    publishedAt: '2025-06-05T13:10:00Z',
    url: 'https://example.com/fusion-milestone',
    imageUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 1897,
    comments: 432,
    views: 67820,
    isTrending: false,
    location: {
      country: 'France',
      coordinates: [5.3698, 43.5283]
    }
  },
  {
    id: '12',
    title: 'Streaming Service Acquires Rights to Classic Film Archive',
    content: 'A major streaming platform has acquired the digital rights to one of Hollywood\'s most significant classic film archives, comprising over 2,000 titles from the golden age of cinema. The collection will be remastered in 4K and gradually released with new commentary and bonus features.',
    summary: 'Streaming giant secures rights to thousands of classic films for digital restoration.',
    category: 'Entertainment',
    author: 'Maria Rodriguez',
    source: 'Variety',
    publishedAt: '2025-06-04T17:35:00Z',
    url: 'https://example.com/streaming-classics',
    imageUrl: 'https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 2465,
    comments: 683,
    views: 93740,
    isTrending: false,
    location: {
      country: 'USA',
      coordinates: [-118.2437, 34.0522]
    }
  }
];