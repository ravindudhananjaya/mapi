
import { ContentData, Language } from './types';

export const CONTENT: Record<Language, ContentData> = {
  [Language.EN]: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      contact: "Contact",
      login: "Login / Register",
      dashboard: "Dashboard",
      logout: "Logout"
    },
    hero: {
      title: "Care that feels like family, even when you're far away.",
      subtitle: "We connect your parents in Nepal with trusted 'Saathis' (Companions) for health support, daily assistance, and social connection.",
      cta: "Find a Saathi",
      trust: "Trusted by 500+ Nepali families in USA, Australia, UK & UAE"
    },
    landingServices: {
      title: "More than just care. It's companionship.",
      subtitle: "Our 'Saathis' provide the support your parents need to live happily and independently at home.",
      services: [
        {
          title: "Companionship (Saathi)",
          description: "Friendly visits to share tea, stories, and walks. No more loneliness.",
          icon: "heart"
        },
        {
          title: "Health Support",
          description: "Hospital visits, medicine reminders, and regular BP/Sugar monitoring.",
          icon: "stethoscope"
        },
        {
          title: "Daily Assistance",
          description: "Help with groceries, technology, bill payments, and errands.",
          icon: "shopping-bag"
        },
        {
          title: "Emergency Support",
          description: "24/7 on-call coordination with local hospitals and ambulance services.",
          icon: "phone-call"
        }
      ]
    },
    detailedServices: {
      title: "Comprehensive Care Services",
      subtitle: "We offer a wide range of services designed to ensure the well-being and happiness of your loved ones.",
      items: [
        {
          title: "Companionship & Emotional Support",
          description: "Loneliness is a major issue for the elderly. Our Saathis provide genuine companionship, engaging in conversations, playing games, or simply sharing a cup of tea. We treat your parents like our own family.",
          image: "/about-hero.png",
          benefits: ["Reduced loneliness and isolation", "Mental stimulation through conversation", "Emotional support and friendship"]
        },
        {
          title: "Professional Health Monitoring",
          description: "Our trained care providers assist with medication management, accompany parents to hospital visits, and monitor vital signs like Blood Pressure and Sugar levels regularly.",
          image: "/service-health.png",
          benefits: ["Regular health tracking", "Medication adherence", "Stress-free hospital visits"]
        },
        {
          title: "Daily Living Assistance",
          description: "From grocery shopping to paying utility bills, we handle the daily chores that can become burdensome. We also help with technology, ensuring they can video call you easily.",
          image: "/service-daily.png",
          benefits: ["Hassle-free grocery shopping", "Timely bill payments", "Technology assistance"]
        }
      ]
    },
    appShowcase: {
      title: "Stay connected from miles away",
      subtitle: "Our app bridges the distance between you and your parents.",
      features: [
        {
          title: "Real-time Updates",
          description: "Get notified instantly when a Saathi arrives and completes a visit.",
          icon: "bell"
        },
        {
          title: "Health Vitals Dashboard",
          description: "View blood pressure, sugar levels, and other vitals in easy-to-read charts.",
          icon: "activity"
        },
        {
          title: "Photo & Video Feed",
          description: "See your parents smiling with photos and videos from every visit.",
          icon: "camera"
        },
        {
          title: "Direct Chat",
          description: "Message the care provider directly for any special instructions.",
          icon: "message-circle"
        }
      ]
    },
    testimonials: {
      title: "Peace of mind for you, joy for them.",
      subtitle: "Hear from children living abroad who trust MAPI.",
      items: [
        {
          name: "Sujata K.",
          location: "Sydney, Australia",
          quote: "I used to worry every day about my mom being alone in Kathmandu. Now, her Saathi visits 3 times a week. Mom is happier, and I can sleep better.",
          image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
          name: "Rajesh S.",
          location: "New York, USA",
          quote: "The health updates on the app are a game changer. I know exactly when dad takes his meds and what his BP is. Thank you MAPI!",
          image: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
          name: "Priya M.",
          location: "London, UK",
          quote: "It's not just a service, it's like having a family member there. The Saathi even helped mom set up Zoom so we can talk more often.",
          image: "https://randomuser.me/api/portraits/women/3.jpg"
        }
      ]
    },
    partnersSection: {
      title: "Our Trusted Partners",
      subtitle: "Collaborating with the best to provide top-notch care.",
      image: "/partners/nano_banana.png",
      partners: [
        "Nano Banana",
        "Himalayan Care",
        "Kathmandu Meds",
        "Nepal Life Insurance"
      ]
    },
    serviceTestimonials: [
      {
        name: "Aayush K.",
        location: "Melbourne, Australia",
        quote: "MAPI has been a lifesaver. Being a student, I couldn't visit home often, but the daily updates make me feel connected.",
        image: "/avatar-1.png",
        role: "Student"
      },
      {
        name: "Sarita B.",
        location: "Texas, USA",
        quote: "The health monitoring service is excellent. I get the BP reports instantly on WhatsApp and the App.",
        image: "/avatar-3.png",
        role: "Software Engineer"
      },
      {
        name: "Rohan M.",
        location: "Dubai, UAE",
        quote: "Trustworthy and professional. My parents love their Saathi!",
        image: "/avatar-2.png",
        role: "Business Owner"
      }
    ],
    valueProp: {
      title: "Why Choose MAPI?",
      items: [
        { title: "Professional Care", desc: "Trained care providers, not just helpers. Background checked and verified." },
        { title: "Health Monitoring", desc: "Regular BP & Sugar checkups with reports sent directly to your phone." },
        { title: "Real-time Updates", desc: "Track services via our app and receive photo/video updates of visits." },
        { title: "Emergency Response", desc: "24/7 coordination with local hospitals and emergency services." }
      ]
    },
    pricing: {
      title: "Monthly Care Packages",
      subtitle: "Choose the right level of support for your parents",
      selectButton: "Select Plan",
      bookButton: "Book Now",
      tiers: [
        {
          name: "Basic Care",
          price: "NPR 5,000 - 8,000",
          features: [
            { text: "Weekly grocery shopping assistance", included: true },
            { text: "2 Health check-ups (BP, Sugar) per month", included: true },
            { text: "Daily phone check-in", included: true },
            { text: "Emergency contact service", included: true },
            { text: "Transportation trips", included: false },
            { text: "Weekly video calls", included: false },
          ]
        },
        {
          name: "Standard Care",
          price: "NPR 10,000 - 15,000",
          highlight: true,
          features: [
            { text: "All Basic features", included: true },
            { text: "4 Transportation trips/month (Hospital, Market)", included: true },
            { text: "Weekly video calls with family abroad", included: true },
            { text: "Medication reminders", included: true },
            { text: "Monthly health report", included: true },
            { text: "Care coordinator assigned", included: false },
          ]
        },
        {
          name: "Premium Care",
          price: "NPR 20,000 - 30,000",
          features: [
            { text: "All Standard features", included: true },
            { text: "Unlimited transportation", included: true },
            { text: "4 Health check-ups/month", included: true },
            { text: "Dedicated care coordinator", included: true },
            { text: "24/7 Emergency response", included: true },
            { text: "Companion visits (3x week)", included: true },
          ]
        }
      ],
      oneTimeTitle: "One-Time Services",
      oneTimeServices: [
        { title: "Single Transportation Trip", price: "NPR 500 - 1,500" },
        { title: "Health Check-up Visit", price: "NPR 800 - 1,200" },
        { title: "Grocery Shopping Assistance", price: "NPR 600 - 1,000" },
        { title: "Companion Visit (2 hours)", price: "NPR 1,000 - 1,500" }
      ]
    },
    appFeatures: {
      title: "Technology Enabled Care",
      familyTitle: "For Families (App)",
      providerTitle: "For Care Providers",
      familyFeatures: [
        "Real-time service tracking",
        "View health reports (BP/Sugar)",
        "Photo/Video updates from visits",
        "Direct messaging with providers",
        "Easy payments (eSewa, Khalti, Stripe)"
      ],
      providerFeatures: [
        "Task assignment & scheduling",
        "GPS Check-in/Check-out verification",
        "Digital health data entry",
        "Incident reporting system",
        "Route navigation"
      ]
    },
    about: {
      title: "About MAPI",
      missionTitle: "Our Mission",
      missionText: "To ensure elderly individuals in Nepal receive dignified, professional care and companionship, while providing peace of mind to their children working abroad.",
      problemTitle: "The Problem We Solve",
      problemText: "Elderly people in Nepal are often left without adequate care as younger family members work abroad, creating a gap in daily assistance, healthcare monitoring, and social connection.",
      teamTitle: "Our Core Team",
      team: [
        { name: "Aarav Sharma", role: "Operations Manager", image: "/avatar-2.png" },
        { name: "Sita Poudel", role: "Senior Care Coordinator", image: "/avatar-1.png" },
        { name: "Gita Rai", role: "Head Nurse", image: "/avatar-3.png" },
        { name: "Dr. Ram Thapa", role: "Medical Consultant", image: "/avatar-2.png" },
        { name: "Nita KC", role: "Customer Support", image: "/avatar-1.png" }
      ],
      differentiationTitle: "Why MAPI Will Win",
      differentiationPoints: [
        { title: "Technology-Enabled", desc: "Real-time updates, transparency, and easy international payments." },
        { title: "Trained Professionals", desc: "Not just helpers, but trained care providers with background checks." },
        { title: "Health Focus", desc: "Regular monitoring, early intervention, and medical partnerships." },
        { title: "Family Connection", desc: "Keeping families abroad connected through updates, calls, and reports." }
      ]
    },
    process: {
      title: "How it works",
      subtitle: "Getting started is simple and transparent.",
      steps: [
        {
          title: "1. Register & Select Plan",
          description: "Create an account and choose the care package that best fits your parents' needs."
        },
        {
          title: "2. Select Subscription Service",
          description: "Choose from our Basic, Standard, or Premium monthly subscriptions for continuous care."
        },
        {
          title: "3. Enjoy Peace of Mind",
          description: "Receive real-time updates, visit videos, and detailed health reports directly on the app."
        }
      ],
      trainingTitle: "Our Quality Assurance",
      trainingPoints: [
        "Elderly care basics & cultural sensitivity",
        "Health monitoring procedures (BP, Sugar)",
        "App usage and documentation",
        "Emergency protocols",
        "First Aid Certification"
      ],
      partnersTitle: "Our Partners",
      partners: [
        "Local pharmacies (Medication delivery)",
        "Diagnostic centers (Discounted check-ups)",
        "Hospitals (Emergency coordination)",
        "Grocery stores (Bulk delivery discounts)",
        "Insurance companies"
      ],
      safetyTitle: "Trust & Safety",
      safetyText: "We implement rigorous background checks, GPS tracking for all visits, and real-time updates to ensure the highest level of safety and trust."
    },
    contactPage: {
      title: "Get in Touch",
      subtitle: "Have questions about our care packages? We are here to help.",
      formName: "Your Name",
      formEmail: "Email Address",
      formMessage: "Message",
      submit: "Send Message",
      offices: "Our Offices"
    },
    auth: {
      loginTitle: "Welcome Back",
      registerTitle: "Create Account",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      addressLabel: "Full Address (Nepal)",
      phoneLabel: "Phone Number",
      notesLabel: "Special Notes / Medical Conditions",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",
      loginButton: "Sign In",
      registerButton: "Create Account",
      haveAccount: "Already have an account?",
      noAccount: "Don't have an account?",
      loginLink: "Sign In",
      registerLink: "Register"
    },
    checkout: {
      title: "Checkout",
      summaryTitle: "Order Summary",
      planLabel: "Selected Plan",
      serviceLabel: "Selected Service",
      totalLabel: "Total Amount",
      paymentMethodLabel: "Select Payment Method",
      payButton: "Pay Now",
      secureText: "Secure SSL Encryption. 100% Safe.",
      successTitle: "Payment Successful!",
      successMessage: "Thank you for subscribing. Our care coordinator will contact you shortly to set up the service.",
      backHome: "Return to Home"
    },
    paymentSuccess: {
      title: "Payment Successful!",
      message: "Thank you for your payment. Your service has been successfully booked.",
      orderIdLabel: "Transaction ID",
      amountLabel: "Amount Paid",
      methodLabel: "Payment Method",
      dateLabel: "Date",
      dashboardButton: "Go to Dashboard"
    },
    dashboard: {
      welcome: "Welcome,",
      activePlan: "Your Active Plan",
      noPlan: "No active plan",
      status: "Status",
      statusActive: "Active",
      emergencyContact: "Emergency Contact",
      providerProfile: "Your Care Provider",
      healthTrends: "Health Monitoring (BP & Sugar)",
      visitHistory: "Recent Visits & Reports",
      bookExtra: "Book Extra Services",
      aiAssistant: "MAPI AI Assistant",
      downloadReport: "Download Report",
      readWithAi: "Analyze with AI",
      aiAnalysisTitle: "MAPI AI Health Analysis",
      close: "Close",
      watchVideo: "Watch Visit Video",
      providerNote: "Care Provider Note"
    },
    adminDashboard: {
      title: "Admin Dashboard",
      nav: {
        overview: "Overview",
        staff: "Staff Management",
        assignments: "Assignments",
        payments: "Payments",
        renewals: "Renewals"
      },
      overview: {
        totalUsers: "Total Users",
        activeProviders: "Active Providers",
        monthlyRevenue: "Monthly Revenue",
        recentBookings: "Recent Bookings"
      },
      staff: {
        title: "Manage Staff",
        addBtn: "Add New Staff",
        name: "Name",
        role: "Role",
        contact: "Contact",
        save: "Save Staff"
      },
      assignments: {
        title: "Service Assignments",
        subscriptionTitle: "Unassigned Subscriptions",
        groceryTitle: "Unassigned Orders",
        assignProvider: "Assign Provider",
        assignDriver: "Assign Driver",
        unassigned: "Unassigned"
      },
      payments: {
        title: "Payment History",
        historyTitle: "Recent Transactions",
        table: {
          user: "User",
          amount: "Amount",
          date: "Date",
          method: "Method",
          status: "Status"
        }
      },
      renewals: {
        title: "Subscription Renewals",
        daysLeft: "days left",
        action: "Process Renewal"
      }
    },
    providerDashboard: {
      title: "Care Provider Dashboard",
      tabs: {
        schedule: "My Schedule",
        requests: "New Requests",
        messages: "Messages"
      },
      views: {
        today: "Today",
        week: "Weekly",
        month: "Monthly"
      },
      filters: {
        all: "All Types",
        subscription: "Subscription",
        oneTime: "One-Time"
      },
      actions: {
        approve: "Approve",
        decline: "Decline",
        complete: "Complete Visit",
        navigate: "Navigate"
      },
      labels: {
        patient: "Patient",
        address: "Address",
        time: "Time",
        type: "Service Type",
        notes: "Notes"
      }
    },
    driverDashboard: {
      title: "Driver Dashboard",
      tabs: {
        trips: "My Trips",
        requests: "New Requests"
      },
      filters: {
        all: "All Trips",
        subscription: "Subscription",
        oneTime: "One-Time"
      },
      actions: {
        accept: "Accept Trip",
        decline: "Decline",
        complete: "Complete",
        openMap: "Open Map"
      },
      labels: {
        pickup: "Pickup Location",
        dropoff: "Dropoff Location",
        client: "Client Name",
        type: "Trip Type"
      }
    },
    footer: {
      tagline: "Connecting hearts across borders.",
      contact: "Contact Us",
      copyright: "© 2024 MAPI Elderly Care Service. Kathmandu, Nepal."
    }
  },
  [Language.NP]: {
    nav: {
      home: "गृह पृष्ठ",
      services: "सेवाहरू",
      about: "हाम्रो बारेमा",
      contact: "सम्पर्क",
      login: "लगइन / दर्ता",
      dashboard: "ड्यासबोर्ड",
      logout: "लगआउट"
    },
    hero: {
      title: "तपाईं टाढा भए पनि, बुबाआमाको साथमा हामी छौं",
      subtitle: "हामी तपाईंका आमाबुबालाई 'साथी' (Saathi) सँग जोड्छौं, जसले स्वास्थ्य सहयोग, दैनिक सहायता र भावनात्मक साथ प्रदान गर्छन्।",
      cta: "साथी खोज्नुहोस्",
      trust: "विदेशमा रहेका ५००+ नेपाली परिवारहरूको विश्वासिलो साथी"
    },
    landingServices: {
      title: "हेरचाह मात्र होइन, आत्मीय साथ।",
      subtitle: "हाम्रा 'साथी' हरूले तपाईंका आमाबुबालाई घरमै खुशी र स्वतन्त्र भएर बाँच्न मद्दत गर्छन्।",
      services: [
        {
          title: "साथी (Companionship)",
          description: "चिया गफ, रमाइलो कुराकानी र हिँडडुल। अब एक्लोपन हट्छ।",
          icon: "heart"
        },
        {
          title: "स्वास्थ्य सहयोग",
          description: "अस्पताल जान सहयोग, औषधि समयमा खुवाउने र प्रेसर/सुगर जाँच।",
          icon: "stethoscope"
        },
        {
          title: "दैनिक सहायता",
          description: "किराना किनमेल, मोबाइल चलाउन सिकाउने, र बिल भुक्तानीमा सहयोग।",
          icon: "shopping-bag"
        },
        {
          title: "आकस्मिक सेवा",
          description: "२४/७ अस्पताल र एम्बुलेन्ससँग समन्वय।",
          icon: "phone-call"
        }
      ]
    },
    detailedServices: {
      title: "विस्तृत सेवाहरू",
      subtitle: "हामी तपाईंका प्रियजनहरूको सुख र स्वास्थ्य सुनिश्चित गर्न विभिन्न सेवाहरू प्रदान गर्दछौं।",
      items: [
        {
          title: "साथी र भावनात्मक सहयोग",
          description: "वृद्धावस्थामा एक्लोपन एउटा ठूलो समस्या हो। हाम्रा साथीहरूले कुराकानी गर्ने, खेल खेल्ने वा सँगै चिया पिउने जस्ता क्रियाकलाप मार्फत साँचो साथ दिन्छन्। हामी तपाईंका आमाबुबालाई आफ्नै परिवार जस्तै व्यवहार गर्छौं।",
          image: "/about-hero.png",
          benefits: ["एक्लोपन र निराशा कम हुने", "कुराकानी मार्फत मानसिक सक्रियता", "भावनात्मक साथ र मित्रता"]
        },
        {
          title: "व्यावसायिक स्वास्थ्य निगरानी",
          description: "हाम्रा तालिम प्राप्त केयर गिभरहरूले औषधि व्यवस्थापनमा मद्दत गर्छन्, अस्पताल जाँदा साथ दिन्छन्, र नियमित रूपमा रक्तचाप र सुगर जस्ता स्वास्थ्य सूचकहरूको निगरानी गर्छन्।",
          image: "/service-health.png",
          benefits: ["नियमित स्वास्थ्य ट्रयाकिङ", "समयमा औषधि सेवन", "तनावमुक्त अस्पताल भ्रमण"]
        },
        {
          title: "दैनिक जीवनमा सहायता",
          description: "किराना किनमेलदेखि बिजुलीको बिल तिर्नेसम्म, हामी दैनिक कामहरूमा सघाउँछौं। हामी प्रविधि चलाउन पनि सिकाउँछौं, जसले गर्दा उहाँहरूले तपाईंलाई सजिलै भिडियो कल गर्न सक्नुहुन्छ।",
          image: "/service-daily.png",
          benefits: ["झन्झटमुक्त किनमेल", "समयमा बिल भुक्तानी", "प्रविधिमा सहयोग"]
        }
      ]
    },
    appShowcase: {
      title: "टाढा भए पनि नजिकै",
      subtitle: "हाम्रो एपले तपाईं र तपाईंका आमाबुबा बीचको दूरी कम गर्छ।",
      features: [
        {
          title: "ताजा अपडेट",
          description: "साथी कहिले आउनुभयो र जानुभयो, तुरुन्तै थाहा पाउनुहोस्।",
          icon: "bell"
        },
        {
          title: "स्वास्थ्य ड्यासबोर्ड",
          description: "प्रेसर, सुगर र अन्य स्वास्थ्य विवरणहरू चार्टमा हेर्नुहोस्।",
          icon: "activity"
        },
        {
          title: "फोटो र भिडियो",
          description: "हरेक भेटघाटको फोटो र भिडियो हेरेर आमाबुबाको मुस्कान देख्नुहोस्।",
          icon: "camera"
        },
        {
          title: "सिधा कुराकानी",
          description: "केही विशेष भन्नु परेमा केयर गिभरलाई सिधै म्यासेज गर्नुहोस्।",
          icon: "message-circle"
        }
      ]
    },
    testimonials: {
      title: "तपाईंलाई ढुक्क, उहाँहरूलाई खुसी।",
      subtitle: "MAPI मा विश्वास गर्ने विदेशमा रहेका छोराछोरीहरूको अनुभव।",
      items: [
        {
          name: "सुजाता के.",
          location: "सिड्नी, अष्ट्रेलिया",
          quote: "ममी काठमाडौंमा एक्लै हुनुहुन्छ भनेर सधैं चिन्ता लाग्थ्यो। अब 'साथी' हप्तामा ३ पटक जानुहुन्छ। ममी खुसी हुनुहुन्छ, म पनि ढुक्कले सुत्छु।",
          image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
          name: "राजेश एस.",
          location: "न्यूयोर्क, अमेरिका",
          quote: "एपमा आउने स्वास्थ्य रिपोर्टले धेरै सजिलो बनाएको छ। बुबाले औषधि खानुभयो कि भएन भनेर अब सोधिरहनु पर्दैन। धन्यवाद MAPI!",
          image: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
          name: "प्रिया एम.",
          location: "लन्डन, बेलायत",
          quote: "यो सेवा मात्र होइन, परिवारको सदस्य जस्तै हो। साथीले ममीलाई जुम चलाउन सिकाउनुभयो, अब हामी धेरै कुरा गर्न सक्छौं।",
          image: "https://randomuser.me/api/portraits/women/3.jpg"
        }
      ]
    },
    partnersSection: {
      title: "हाम्रा विश्वासिला साझेदारहरू",
      subtitle: "उत्कृष्ट सेवा प्रदान गर्न हामी उत्कृष्ट संस्थाहरू सँग सहकार्य गर्छौं।",
      image: "/partners/nano_banana.png",
      partners: [
        "Nano Banana",
        "हिमालयन केयर",
        "काठमाडौं मेड्स",
        "नेपाल लाइफ इन्स्योरेन्स"
      ]
    },
    serviceTestimonials: [
      {
        name: "आयुष के.",
        location: "मेलबर्न, अष्ट्रेलिया",
        quote: "MAPI मेरो लागि वरदान साबित भएको छ। विद्यार्थी भएकोले म घर जान पाउँदिन, तर दैनिक अपडेटले मलाई नजिक महसुस गराउँछ।",
        image: "/avatar-1.png",
        role: "विद्यार्थी"
      },
      {
        name: "सरिता बी.",
        location: "टेक्सास, अमेरिका",
        quote: "स्वास्थ्य निगरानी सेवा उत्कृष्ट छ। मलाई व्हाट्सएप र एपमा तुरुन्तै प्रेसर रिपोर्ट आउँछ।",
        image: "/avatar-3.png",
        role: "सफ्टवेयर इन्जिनियर"
      },
      {
        name: "रोहन एम.",
        location: "दुबई, यूएई",
        quote: "विश्वासिलो र व्यावसायिक। मेरा बुबाआमाले आफ्नो साथीलाई धेरै मन पराउनुहुन्छ!",
        image: "/avatar-2.png",
        role: "व्यवसायी"
      }
    ],
    valueProp: {
      title: "MAPI नै किन?",
      items: [
        { title: "व्यावसायिक सेवा", desc: "तालिम प्राप्त सहयोगीहरू। पूर्ण रूपमा प्रमाणित र विश्वासिलो।" },
        { title: "स्वास्थ्य निगरानी", desc: "नियमित प्रेसर र सुगर जाँच, रिपोर्ट सिधै तपाईंको मोबाइलमा।" },
        { title: "ताजा अपडेट", desc: "हाम्रो एप मार्फत सेवाको ट्रयाकिङ र फोटो/भिडियो अपडेट।" },
        { title: "आकस्मिक सहयोग", desc: "अस्पताल र एम्बुलेन्ससँग २४ सै घण्टा समन्वय।" }
      ]
    },
    pricing: {
      title: "मासिक सेवा प्याकेजहरू",
      subtitle: "आफ्नो आवश्यकता अनुसारको प्याकेज छान्नुहोस्",
      selectButton: "प्याकेज छान्नुहोस्",
      bookButton: "बुकिंग गर्नुहोस्",
      tiers: [
        {
          name: "आधारभूत सेवा (Basic)",
          price: "रु. ५,००० - ८,०००",
          features: [
            { text: "साप्ताहिक किराना किनमेलमा सहयोग", included: true },
            { text: "महिनामा २ पटक स्वास्थ्य जाँच (BP, Sugar)", included: true },
            { text: "दैनिक फोन सम्पर्क", included: true },
            { text: "आकस्मिक सम्पर्क सेवा", included: true },
            { text: "यातायात सुविधा", included: false },
            { text: "साप्ताहिक भिडियो कल", included: false },
          ]
        },
        {
          name: "मानक सेवा (Standard)",
          price: "रु. १०,००० - १५,०००",
          highlight: true,
          features: [
            { text: "आधारभूत प्याकेजका सबै सुविधाहरू", included: true },
            { text: "महिनामा ४ पटक यातायात सुविधा", included: true },
            { text: "विदेशमा रहेका परिवारसँग भिडियो कल", included: true },
            { text: "औषधि खाने समयको जानकारी", included: true },
            { text: "मासिक स्वास्थ्य रिपोर्ट", included: true },
            { text: "छुट्टै केयर कोअर्डिनेटर", included: false },
          ]
        },
        {
          name: "प्रिमियम सेवा (Premium)",
          price: "रु. २०,००० - ३०,०००",
          features: [
            { text: "मानक प्याकेजका सबै सुविधाहरू", included: true },
            { text: "असीमित यातायात सुविधा", included: true },
            { text: "महिनामा ४ पटक स्वास्थ्य जाँच", included: true },
            { text: "छुट्टै केयर कोअर्डिनेटरको व्यवस्था", included: true },
            { text: "२४/७ आकस्मिक सेवा", included: true },
            { text: "हप्तामा ३ पटक घरमै भेटघाट (Companion)", included: true },
          ]
        }
      ],
      oneTimeTitle: "एक पटकको सेवाहरू (One-Time Services)",
      oneTimeServices: [
        { title: "एक पटक यातायात सेवा", price: "रु. ५०० - १,५००" },
        { title: "स्वास्थ्य जाँच (Health Check-up)", price: "रु. ८०० - १,२००" },
        { title: "किराना किनमेल सहयोग", price: "रु. ६०० - १,०००" },
        { title: "साथी भेटघाट (२ घण्टा)", price: "रु. १,००० - १,५००" }
      ]
    },
    appFeatures: {
      title: "प्रविधि मैत्री सेवा",
      familyTitle: "परिवारको लागि (मोबाइल एप)",
      providerTitle: "केयर गिभरको लागि",
      familyFeatures: [
        "रियल टाइम सेवा ट्रयाकिङ",
        "स्वास्थ्य रिपोर्ट हेर्न मिल्ने",
        "भेटघाटको फोटो र भिडियो अपडेट",
        "केयर गिभरसँग सिधा कुराकानी",
        "सजिलो भुक्तानी (eSewa, Khalti, Stripe)"
      ],
      providerFeatures: [
        "कार्य तालिका र व्यवस्थापन",
        "GPS लोकेसन भेरिफिकेशन",
        "डिजिटल स्वास्थ्य डाटा इन्ट्री",
        "घटना रिपोर्टिङ सिस्टम",
        "लोकेसन म्याप नेभिगेसन"
      ]
    },
    about: {
      title: "MAPI को बारेमा",
      missionTitle: "हाम्रो मिशन",
      missionText: "नेपालका ज्येष्ठ नागरिकहरूलाई सम्मानजनक र व्यावसायिक हेरचाह प्रदान गर्नु, साथै विदेशमा रहेका उहाँहरूका छोराछोरीलाई मनको शान्ति प्रदान गर्नु।",
      problemTitle: "हामीले समाधान गर्ने समस्या",
      problemText: "रोजगारीको लागि युवा पुस्ता विदेशिँदा नेपालमा रहेका बुबाआमा एक्लै पर्नुभएको छ। दैनिक सहायता, स्वास्थ्य निगरानी र सामाजिक निकटताको अभावलाई हामी पूरा गर्छौं।",
      teamTitle: "हाम्रो टोली",
      team: [
        { name: "आरव शर्मा", role: "अपरेसन म्यानेजर", image: "/avatar-2.png" },
        { name: "सीता पौडेल", role: "वरिष्ठ केयर कोअर्डिनेटर", image: "/avatar-1.png" },
        { name: "गीता राई", role: "प्रमुख नर्स", image: "/avatar-3.png" },
        { name: "डा. राम थापा", role: "चिकित्सा परामर्शदाता", image: "/avatar-2.png" },
        { name: "निता के.सी.", role: "ग्राहक सेवा", image: "/avatar-1.png" }
      ],
      differentiationTitle: "MAPI किन उत्कृष्ट छ?",
      differentiationPoints: [
        { title: "प्रविधि-मैत्री", desc: "रियल-टाइम अपडेट, पारदर्शिता र विदेशबाट सजिलो भुक्तानी।" },
        { title: "तालिम प्राप्त पेशेवरहरू", desc: "केवल सहयोगी मात्र होइन, ब्याकग्राउन्ड चेक गरिएका तालिम प्राप्त व्यक्तिहरू।" },
        { title: "स्वास्थ्यमा फोकस", desc: "नियमित निगरानी, प्रारम्भिक उपचार र अस्पतालहरूसँग सहकार्य।" },
        { title: "पारिवारिक सम्बन्ध", desc: "अपडेट, कल र रिपोर्टहरू मार्फत परिवारलाई जोडी राख्ने।" }
      ]
    },
    process: {
      title: "सेवा कसरी लिने?",
      subtitle: "सुरु गर्न धेरै सजिलो छ।",
      steps: [
        {
          title: "१. दर्ता र प्याकेज छनोट",
          description: "खाता खोल्नुहोस् र आफ्ना आमाबुबाको आवश्यकता अनुसारको प्याकेज छान्नुहोस्।"
        },
        {
          title: "२. सदस्यता सेवा छान्नुहोस्",
          description: "निरन्तर हेरचाहको लागि हाम्रो आधारभूत, मानक, वा प्रिमियम मासिक सदस्यता छान्नुहोस्।"
        },
        {
          title: "३. ढुक्क हुनुहोस्",
          description: "एपमा हरेक भेटघाटको भिडियो, फोटो र विस्तृत स्वास्थ्य रिपोर्ट प्राप्त गर्नुहोस्।"
        }
      ],
      trainingTitle: "हाम्रो गुणस्तर",
      trainingPoints: [
        "ज्येष्ठ नागरिक हेरचाह र सांस्कृतिक संवेदनशीलता",
        "स्वास्थ्य निगरानी प्रक्रिया (BP, सुगर)",
        "एप प्रयोग र डकुमेन्टेसन",
        "आकस्मिक अवस्थाका प्रोटोकलहरू",
        "प्राथमिक उपचार (First Aid) प्रमाणपत्र"
      ],
      partnersTitle: "हाम्रा साझेदारहरू",
      partners: [
        "स्थानीय फार्मेसी (औषधि डेलिभरी)",
        "डायग्नोस्टिक सेन्टर (छुटमा चेकजाँच)",
        "अस्पतालहरू (आकस्मिक समन्वय)",
        "किराना पसल (थोक डेलिभरी)",
        "बीमा कम्पनीहरू"
      ],
      safetyTitle: "विश्वास र सुरक्षा",
      safetyText: "हामी कडा ब्याकग्राउन्ड चेक, हरेक भेटघाटको GPS ट्रयाकिङ, र रियल-टाइम अपडेटहरू मार्फत पूर्ण सुरक्षा र विश्वास सुनिश्चित गर्छौं।"
    },
    contactPage: {
      title: "सम्पर्क गर्नुहोस्",
      subtitle: "के तपाईंसँग हाम्रा सेवाहरूबारे प्रश्नहरू छन्? हामी मद्दत गर्न यहाँ छौं।",
      formName: "तपाईंको नाम",
      formEmail: "ईमेल ठेगाना",
      formMessage: "सन्देश",
      submit: "सन्देश पठाउनुहोस्",
      offices: "हाम्रो कार्यालय"
    },
    auth: {
      loginTitle: "स्वागत छ",
      registerTitle: "खाता खोल्नुहोस्",
      nameLabel: "पूरा नाम",
      emailLabel: "ईमेल ठेगाना",
      addressLabel: "पूरा ठेगाना (नेपाल)",
      phoneLabel: "फोन नम्बर",
      notesLabel: "विशेष नोट / स्वास्थ्य अवस्था",
      passwordLabel: "पासवर्ड",
      confirmPasswordLabel: "पासवर्ड पुष्टि गर्नुहोस्",
      loginButton: "लगइन",
      registerButton: "दर्ता गर्नुहोस्",
      haveAccount: "पहिल्यै खाता छ?",
      noAccount: "खाता छैन?",
      loginLink: "लगइन",
      registerLink: "दर्ता"
    },
    checkout: {
      title: "भुक्तानी विवरण",
      summaryTitle: "अर्डर सारांश",
      planLabel: "छानिएको प्याकेज",
      serviceLabel: "छानिएको सेवा",
      totalLabel: "जम्मा रकम",
      paymentMethodLabel: "भुक्तानी माध्यम छान्नुहोस्",
      payButton: "भुक्तानी गर्नुहोस्",
      secureText: "सुरक्षित SSL ईन्क्रिप्शन। १००% सुरक्षित।",
      successTitle: "भुक्तानी सफल भयो!",
      successMessage: "सेवा लिनु भएकोमा धन्यवाद। हाम्रो केयर कोअर्डिनेटरले तपाईंलाई सेवा सुरु गर्न छिट्टै सम्पर्क गर्नेछन्।",
      backHome: "गृह पृष्ठमा फर्कनुहोस्"
    },
    paymentSuccess: {
      title: "भुक्तानी सफल भयो!",
      message: "तपाईंको भुक्तानी प्राप्त भयो। तपाईंको सेवा सफलतापुर्वक बुक गरिएको छ।",
      orderIdLabel: "कारोबार आईडी",
      amountLabel: "तिरेको रकम",
      methodLabel: "भुक्तानी माध्यम",
      dateLabel: "मिति",
      dashboardButton: "ड्यासबोर्डमा जानुहोस्"
    },
    dashboard: {
      welcome: "स्वागत छ,",
      activePlan: "तपाईंको सक्रिय प्याकेज",
      noPlan: "कुनै सक्रिय प्याकेज छैन",
      status: "स्थिति",
      statusActive: "सक्रिय",
      emergencyContact: "आकस्मिक सम्पर्क",
      providerProfile: "तपाईंको केयर गिभर",
      healthTrends: "स्वास्थ्य निगरानी (BP र सुगर)",
      visitHistory: "हालैका भेटघाट र रिपोर्टहरू",
      bookExtra: "थप सेवा बुक गर्नुहोस्",
      aiAssistant: "MAPI AI सहायक",
      downloadReport: "रिपोर्ट डाउनलोड",
      readWithAi: "AI विश्लेषण",
      aiAnalysisTitle: "MAPI AI स्वास्थ्य विश्लेषण",
      close: "बन्द गर्नुहोस्",
      watchVideo: "भिडियो हेर्नुहोस्",
      providerNote: "केयर गिभरको नोट"
    },
    adminDashboard: {
      title: "Admin Dashboard",
      nav: {
        overview: "Overview",
        staff: "स्टाफ व्यवस्थापन",
        assignments: "सेवा व्यवस्थापन",
        payments: "भुक्तानीहरू",
        renewals: "नवीकरणहरू"
      },
      overview: {
        totalUsers: "जम्मा प्रयोगकर्ता",
        activeProviders: "सक्रिय केयर गिभर",
        monthlyRevenue: "मासिक आम्दानी",
        recentBookings: "हालैका बुकिङहरू"
      },
      staff: {
        title: "स्टाफ व्यवस्थापन",
        addBtn: "नयाँ स्टाफ थप्नुहोस्",
        name: "नाम",
        role: "पद",
        contact: "सम्पर्क",
        save: "सेभ गर्नुहोस्"
      },
      assignments: {
        title: "सेवा व्यवस्थापन",
        subscriptionTitle: "अनसाइन गरिएका प्याकेजहरू",
        groceryTitle: "अनसाइन गरिएका अर्डरहरू",
        assignProvider: "केयर गिभर तोक्नुहोस्",
        assignDriver: "चालक तोक्नुहोस्",
        unassigned: "तोकिएको छैन"
      },
      payments: {
        title: "भुक्तानी इतिहास",
        historyTitle: "हालैका कारोबारहरू",
        table: {
          user: "प्रयोगकर्ता",
          amount: "रकम",
          date: "मिति",
          method: "माध्यम",
          status: "स्थिति"
        }
      },
      renewals: {
        title: "प्याकेज नवीकरण",
        daysLeft: "दिन बाँकी",
        action: "नवीकरण गर्नुहोस्"
      }
    },
    providerDashboard: {
      title: "केयर गिभर ड्यासबोर्ड",
      tabs: {
        schedule: "मेरो तालिका",
        requests: "नयाँ अनुरोधहरू",
        messages: "सन्देशहरू"
      },
      views: {
        today: "आज",
        week: "साप्ताहिक",
        month: "मासिक"
      },
      filters: {
        all: "सबै प्रकार",
        subscription: "मासिक प्याकेज",
        oneTime: "एक पटक"
      },
      actions: {
        approve: "स्वीकार गर्नुहोस्",
        decline: "अस्वीकार गर्नुहोस्",
        complete: "सम्पन्न गर्नुहोस्",
        navigate: "लोकेसन हेर्नुहोस्"
      },
      labels: {
        patient: "बिरामी",
        address: "ठेगाना",
        time: "समय",
        type: "सेवा प्रकार",
        notes: "नोट"
      }
    },
    driverDashboard: {
      title: "चालक ड्यासबोर्ड",
      tabs: {
        trips: "मेरो यात्राहरू",
        requests: "नयाँ अनुरोधहरू"
      },
      filters: {
        all: "सबै यात्राहरू",
        subscription: "मासिक प्याकेज",
        oneTime: "एक पटक"
      },
      actions: {
        accept: "स्वीकार गर्नुहोस्",
        decline: "अस्वीकार गर्नुहोस्",
        complete: "सम्पन्न गर्नुहोस्",
        openMap: "नक्सा खोल्नुहोस्"
      },
      labels: {
        pickup: "पिकअप लोकेसन",
        dropoff: "ड्रपअफ लोकेसन",
        client: "ग्राहकको नाम",
        type: "यात्रा प्रकार"
      }
    },
    footer: {
      tagline: "टाढा भएपनि, मन नजिक।",
      contact: "सम्पर्क गर्नुहोस्",
      copyright: "© २०२४ MAPI ज्येष्ठ नागरिक सेवा। काठमाडौं, नेपाल।"
    }
  }
};
