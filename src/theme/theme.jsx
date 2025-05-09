export const cricketTheme = {
  // Color schemes
  colors: {
    primary: {
      light: 'bg-violet-600',
      main: 'bg-violet-700',
      dark: 'bg-violet-800',
      text: 'text-white',
      gradient: 'from-violet-600 to-fuchsia-700',
      hover: 'hover:bg-violet-800',
      border: 'border-violet-700',
    },
    secondary: {
      light: 'bg-cyan-500',
      main: 'bg-cyan-600',
      dark: 'bg-cyan-700',
      text: 'text-white',
      gradient: 'from-cyan-500 to-blue-600',
      hover: 'hover:bg-cyan-700',
      border: 'border-cyan-600',
    },
    accent: {
      light: 'bg-amber-400',
      main: 'bg-amber-500',
      dark: 'bg-amber-600',
      text: 'text-gray-900',
      gradient: 'from-amber-400 to-orange-500',
      hover: 'hover:bg-amber-600',
      border: 'border-amber-500',
    },
    // Adding navigation colors to match current navbar
    navigation: {
      bg: 'bg-gradient-to-r from-green-700 to-green-900',
      text: 'text-white',
      active: 'bg-yellow-400 text-green-900 font-semibold',
      hover: 'hover:bg-green-600',
      border: 'border-green-700',
    },
    success: {
      light: 'bg-emerald-100',
      main: 'bg-emerald-200',
      dark: 'bg-emerald-300',
      text: 'text-emerald-800',
      gradient: 'from-emerald-200 to-emerald-300',
      border: 'border-emerald-300',
    },
    info: {
      light: 'bg-sky-100',
      main: 'bg-sky-200',
      dark: 'bg-sky-300',
      text: 'text-sky-800',
      gradient: 'from-sky-100 to-sky-200',
      border: 'border-sky-200',
    },
    warning: {
      light: 'bg-amber-100',
      main: 'bg-amber-200',
      dark: 'bg-amber-300',
      text: 'text-amber-800',
      gradient: 'from-amber-100 to-amber-200',
      border: 'border-amber-200',
    },
    error: {
      light: 'bg-rose-100',
      main: 'bg-rose-200',
      dark: 'bg-rose-300',
      text: 'text-rose-800',
      gradient: 'from-rose-100 to-rose-200',
      border: 'border-rose-200',
    },
    neutral: {
      50: 'bg-slate-50',
      100: 'bg-slate-100',
      200: 'bg-slate-200',
      300: 'bg-slate-300',
      400: 'bg-slate-400',
      500: 'bg-slate-500',
      600: 'bg-slate-600',
      700: 'bg-slate-700',
      800: 'bg-slate-800',
      900: 'bg-slate-900',
      text: {
        primary: 'text-slate-900',
        secondary: 'text-slate-700',
        disabled: 'text-slate-400',
      },
      border: 'border-slate-200',
    },
    team: {
      'India': "from-blue-500 to-blue-700",
      'Australia': "from-yellow-500 to-yellow-700",
      'England': "from-rose-500 to-rose-700",
      'New Zealand': "from-slate-700 to-black",
      'South Africa': "from-emerald-500 to-emerald-700",
      'West Indies': "from-purple-500 to-purple-700",
      'Pakistan': "from-emerald-600 to-emerald-800",
      'Sri Lanka': "from-blue-400 to-blue-600",
      'Bangladesh': "from-emerald-500 to-emerald-700",
      'Afghanistan': "from-blue-600 to-blue-800",
    },
    series: {
      test: "from-red-600 to-red-800",
      odi: "from-blue-600 to-blue-800",
      t20: "from-purple-600 to-purple-800",
      domestic: "from-teal-600 to-teal-800",
      women: "from-pink-500 to-pink-700",
      league: "from-amber-500 to-amber-700",
    },
    gradients: {
      sunset: "from-orange-500 to-pink-600",
      ocean: "from-cyan-500 to-blue-600",
      forest: "from-emerald-500 to-teal-700",
      berry: "from-purple-500 to-pink-600",
      night: "from-slate-800 to-slate-900",
      fire: "from-red-500 to-orange-600",
      cosmic: "from-violet-600 to-indigo-900",
      tropical: "from-green-400 to-cyan-500",
      desert: "from-yellow-400 to-orange-500",
      aurora: "from-green-400 to-blue-500",
    }
  },
  
  // Background styles
  background: {
    main: 'bg-gradient-to-br from-slate-50 to-violet-50',
    paper: 'bg-white',
    alt: 'bg-slate-50',
    card: 'bg-white/80 backdrop-blur-sm',
    glass: 'bg-white/20 backdrop-blur-md border border-white/30',
    frosted: 'bg-white/40 backdrop-blur-lg border border-white/40 shadow-xl',
    // Adding navigation background
    navigation: 'bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg',
  },
  
  // Typography
  typography: {
    heading: {
      1: 'text-4xl font-extrabold text-violet-900',
      2: 'text-3xl font-bold text-violet-800',
      3: 'text-2xl font-bold text-violet-800',
      4: 'text-xl font-semibold text-violet-800',
      5: 'text-lg font-semibold text-violet-800',
      6: 'text-base font-medium text-violet-800',
    },
    body: {
      large: 'text-lg text-slate-700',
      medium: 'text-base text-slate-700',
      small: 'text-sm text-slate-600',
      xs: 'text-xs text-slate-500',
    },
  },
  
  // Component styles
  components: {
    card: {
      root: 'bg-white rounded-lg shadow-md overflow-hidden border border-slate-100',
      header: 'p-4 border-b border-slate-100',
      body: 'p-4',
      footer: 'p-4 border-t border-slate-100 bg-slate-50',
      hover: 'hover:shadow-lg transition-shadow duration-300',
      glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
      frosted: 'bg-white/40 backdrop-blur-lg border border-white/40 shadow-xl rounded-xl',
      gradient: 'bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg shadow-md',
    },
    // Add navigation component
    navigation: {
      container: 'fixed top-0 left-0 right-0 z-50',
      wrapper: 'flex items-center justify-between px-8 py-4 max-w-6xl mx-auto',
      logo: 'text-2xl font-bold tracking-wide',
      menu: 'flex space-x-4',
      item: 'px-4 py-2 rounded-lg transition-colors duration-200',
      activeItem: 'bg-yellow-400 text-green-900 font-semibold',
      inactiveItem: 'hover:bg-green-600',
    },
    // Add news component
    news: {
      card: 'bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 transform-gpu',
      image: 'w-full h-56 object-cover transition-transform duration-500 hover:scale-105',
      content: 'bg-white',
      title: 'font-bold text-lg text-violet-900 transition-colors duration-300 hover:text-violet-700',
      context: 'text-xs font-medium text-violet-600 uppercase tracking-wider',
      intro: 'text-sm text-slate-600',
      meta: 'text-xs text-slate-500',
      featured: 'relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg',
      featuredContent: 'relative z-10 p-6',
      featuredOverlay: 'absolute inset-0 bg-black/30 backdrop-blur-sm',
      category: {
        match: 'bg-cyan-100 text-cyan-800',
        player: 'bg-amber-100 text-amber-800',
        team: 'bg-violet-100 text-violet-800',
        tournament: 'bg-emerald-100 text-emerald-800',
        default: 'bg-slate-100 text-slate-800',
      },
      highlight: 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-600/20 before:to-fuchsia-600/20 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-500',
    },
    button: {
      primary: 'bg-violet-700 hover:bg-violet-800 text-white font-medium py-2 px-4 rounded-lg transition-colors',
      secondary: 'bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg transition-colors',
      accent: 'bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors',
      outline: 'border border-violet-700 text-violet-700 hover:bg-violet-50 font-medium py-2 px-4 rounded-lg transition-colors',
      text: 'text-violet-700 hover:text-violet-800 hover:bg-violet-50 font-medium py-2 px-4 rounded-lg transition-colors',
      glass: 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 font-medium py-2 px-4 rounded-lg transition-colors',
    },
    badge: {
      primary: 'bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-xs font-medium',
      secondary: 'bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-xs font-medium',
      accent: 'bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium',
      success: 'bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium',
      error: 'bg-rose-100 text-rose-800 px-2 py-1 rounded-full text-xs font-medium',
      info: 'bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-xs font-medium',
      warning: 'bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium',
      glass: 'bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium border border-white/30',
    },
    avatar: {
      sm: 'w-8 h-8 rounded-full',
      md: 'w-12 h-12 rounded-full',
      lg: 'w-16 h-16 rounded-full',
      xl: 'w-24 h-24 rounded-full',
    },
    input: {
      root: 'border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
      label: 'block text-sm font-medium text-slate-700 mb-1',
      error: 'border-rose-300 focus:ring-rose-500',
      disabled: 'bg-slate-100 text-slate-500 cursor-not-allowed',
    },
    table: {
      root: 'min-w-full divide-y divide-slate-200',
      head: 'bg-white',
      headCell: 'px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider',
      body: 'bg-white divide-y divide-slate-200',
      row: 'hover:bg-slate-50',
      cell: 'px-6 py-4 whitespace-nowrap text-sm text-slate-500',
    },
    tabs: {
      list: 'flex border-b border-slate-200',
      tab: 'px-6 py-4 font-semibold transition-colors duration-200 flex items-center justify-center gap-2',
      active: 'border-b-4 border-violet-600 text-violet-800 bg-violet-50',
      inactive: 'text-slate-500 hover:text-violet-700 hover:bg-slate-50',
    },
    loader: {
      spinner: 'w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin',
    },
  },
  
  // Layout
  layout: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    section: 'py-8',
    grid: {
      1: 'grid grid-cols-1 gap-6',
      2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
      3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    },
    flex: {
      row: 'flex flex-row',
      col: 'flex flex-col',
      wrap: 'flex flex-wrap',
      center: 'flex items-center justify-center',
      between: 'flex items-center justify-between',
      start: 'flex items-start justify-start',
      end: 'flex items-end justify-end',
    },
  },
  
  // Spacing
  spacing: {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  },
  
  // Animations
  animation: {
    fadeIn: 'animate-fadeIn',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    shimmer: 'animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent',
  },
  
  // Effects
  effects: {
    glow: 'shadow-lg shadow-violet-500/20',
    shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
    tilt: 'hover:rotate-1 transition-transform duration-300',
    float: 'hover:-translate-y-1 transition-transform duration-300',
    scale: 'hover:scale-105 transition-transform duration-300',
  }
};

// Helper function to combine theme classes
export const cx = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Helper function to get team color
export const getTeamColor = (teamName) => {
  if (!teamName) return "from-blue-500 to-blue-700";
  
  const teamColors = cricketTheme.colors.team;
  
  // Find the team by checking if the teamName includes any of the keys
  for (const [key, value] of Object.entries(teamColors)) {
    if (teamName.includes(key)) {
      return value;
    }
  }
  
  return "from-blue-500 to-blue-700";
};

// Helper function to get series format color
export const getSeriesFormatColor = (format) => {
  if (!format) return cricketTheme.colors.series.domestic;
  
  const formatLower = format.toLowerCase();
  
  if (formatLower.includes('test')) return cricketTheme.colors.series.test;
  if (formatLower.includes('odi')) return cricketTheme.colors.series.odi;
  if (formatLower.includes('t20') || formatLower.includes('twenty20')) return cricketTheme.colors.series.t20;
  if (formatLower.includes('women')) return cricketTheme.colors.series.women;
  if (formatLower.includes('league') || formatLower.includes('ipl') || formatLower.includes('bbl')) return cricketTheme.colors.series.league;
  
  return cricketTheme.colors.series.domestic;
};

// Helper function to get a random gradient
export const getRandomGradient = () => {
  const gradients = Object.values(cricketTheme.colors.gradients);
  return gradients[Math.floor(Math.random() * gradients.length)];
};

// Format date for display
export const formatDateString = (dateString) => {
  if (!dateString) return "N/A";
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};