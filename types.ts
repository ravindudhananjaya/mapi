
export enum Language {
  EN = 'EN',
  NP = 'NP'
}

export type Page = 'home' | 'services' | 'about' | 'contact' | 'login' | 'register' | 'checkout' | 'payment-success' | 'dashboard' | 'admin-dashboard' | 'provider-dashboard' | 'driver-dashboard' | 'service-info' | 'service-selection' | 'subscription-plans' | 'onetime-services' | 'settings' | 'book-service' | 'book-subscription' | 'book-onetime';

export type UserRole = 'family' | 'provider' | 'driver' | 'admin';

export type BookingStatus = 'pending' | 'approved' | 'declined' | 'completed';
export type ServiceType = 'subscription' | 'onetime';

export interface User {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
  address?: string;
  phone?: string;
  notes?: string;
}

export interface ServiceInfo {
  patientName: string;
  age: string;
  gender: string;
  address: string;
  phone: string;
  medicalConditions?: string;
  emergencyContact: string;
}

export interface Visit {
  id: string;
  date: string;
  type: string;
  providerName: string;
  notes: string;
  videoUrl?: string;
  reportUrl?: string;
  healthData?: {
    bp?: string;
    sugar?: string;
    heartRate?: string;
  };
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  price: string;
  features: PricingFeature[];
  highlight?: boolean;
}

export interface ServiceItem {
  title: string;
  price: string;
}

export type CheckoutSelection =
  | { type: 'plan'; data: PricingTier }
  | { type: 'service'; data: ServiceItem };

export interface ContentData {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    login: string;
    dashboard: string;
    logout: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    trust: string;
  };
  valueProp: {
    title: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    tiers: PricingTier[];
    oneTimeTitle: string;
    oneTimeServices: ServiceItem[];
    selectButton: string;
    bookButton: string;
  };
  appFeatures: {
    title: string;
    familyTitle: string;
    providerTitle: string;
    familyFeatures: string[];
    providerFeatures: string[];
  };
  about: {
    title: string;
    missionTitle: string;
    missionText: string;
    problemTitle: string;
    problemText: string;
    teamTitle: string;
    team: {
      name: string;
      role: string;
      image: string;
    }[];
    differentiationTitle: string;
    differentiationPoints: { title: string, desc: string }[];
  };
  landingServices: {
    title: string;
    subtitle: string;
    services: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  detailedServices: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      image: string;
      benefits: string[];
    }[];
  };
  appShowcase: {
    title: string;
    subtitle: string;
    features: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      location: string;
      quote: string;
      image: string;
    }[];
  };
  serviceTestimonials: {
    name: string;
    location: string;
    quote: string;
    image: string;
    role: string;
  }[];
  partnersSection: {
    title: string;
    subtitle: string;
    image: string;
    partners: string[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
    }[];
    trainingTitle: string;
    trainingPoints: string[];
    partnersTitle: string;
    partners: string[];
    safetyTitle: string;
    safetyText: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    submit: string;
    offices: string;
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    nameLabel: string;
    emailLabel: string;
    addressLabel: string;
    phoneLabel: string;
    notesLabel: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    loginButton: string;
    registerButton: string;
    haveAccount: string;
    noAccount: string;
    loginLink: string;
    registerLink: string;
  };
  checkout: {
    title: string;
    summaryTitle: string;
    planLabel: string;
    serviceLabel: string;
    totalLabel: string;
    paymentMethodLabel: string;
    payButton: string;
    secureText: string;
    successTitle: string;
    successMessage: string;
    backHome: string;
  };
  paymentSuccess: {
    title: string;
    message: string;
    orderIdLabel: string;
    amountLabel: string;
    methodLabel: string;
    dateLabel: string;
    dashboardButton: string;
  };
  dashboard: {
    welcome: string;
    activePlan: string;
    noPlan: string;
    status: string;
    statusActive: string;
    emergencyContact: string;
    providerProfile: string;
    healthTrends: string;
    visitHistory: string;
    bookExtra: string;
    aiAssistant: string;
    downloadReport: string;
    readWithAi: string;
    aiAnalysisTitle: string;
    close: string;
    watchVideo: string;
    providerNote: string;
  };
  adminDashboard: {
    title: string;
    nav: {
      overview: string;
      staff: string;
      assignments: string;
      payments: string;
      renewals: string;
    };
    overview: {
      totalUsers: string;
      activeProviders: string;
      monthlyRevenue: string;
      recentBookings: string;
    };
    staff: {
      title: string;
      addBtn: string;
      name: string;
      role: string;
      contact: string;
      save: string;
    };
    assignments: {
      title: string;
      subscriptionTitle: string;
      groceryTitle: string;
      assignProvider: string;
      assignDriver: string;
      unassigned: string;
    };
    payments: {
      title: string;
      historyTitle: string;
      table: {
        user: string;
        amount: string;
        date: string;
        method: string;
        status: string;
      };
    };
    renewals: {
      title: string;
      daysLeft: string;
      action: string;
    };
  };
  providerDashboard: {
    title: string;
    tabs: {
      schedule: string;
      requests: string;
      messages: string;
    };
    views: {
      today: string;
      week: string;
      month: string;
    };
    filters: {
      all: string;
      subscription: string;
      oneTime: string;
    };
    actions: {
      approve: string;
      decline: string;
      complete: string;
      navigate: string;
    };
    labels: {
      patient: string;
      address: string;
      time: string;
      type: string;
      notes: string;
    };
  };
  driverDashboard: {
    title: string;
    tabs: {
      trips: string;
      requests: string;
    };
    filters: {
      all: string;
      subscription: string;
      oneTime: string;
    };
    actions: {
      accept: string;
      decline: string;
      complete: string;
      openMap: string;
    };
    labels: {
      pickup: string;
      dropoff: string;
      client: string;
      type: string;
    };
  };
  footer: {
    tagline: string;
    contact: string;
    copyright: string;
  };
}
