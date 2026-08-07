import type { Locale } from "./locales";

export interface ProjectEntry {
  id: string;
  index: string;
  name: string;
  url?: string;
  tag: string;
  period: string;
  summary: string;
  bullets: string[];
  tech?: string[];
  focus?: string[];
  subItems?: { label: string; detail: string }[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
}

export interface CapabilityGroup {
  label: string;
  items: string[];
}

export interface SiteContent {
  localeName: string;
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    primaryNav: string;
    themeToggle: string;
    themeLight: string;
    themeDark: string;
    languageLabel: string;
    menu: string;
    close: string;
    portraitAlt: string;
    externalLink: string;
  };
  header: {
    nav: { label: string; href: string }[];
  };
  hero: {
    kicker: string;
    name: string;
    title: string;
    lede: string;
    stackLabel: string;
    stack: string[];
    primaryCta: string;
    cvCta: string;
    location: string;
    portraitCaption: string;
  };
  work: {
    kicker: string;
    heading: string;
    intro: string;
    techLabel: string;
    focusLabel: string;
    projects: ProjectEntry[];
  };
  experience: {
    kicker: string;
    heading: string;
    entries: ExperienceEntry[];
  };
  capabilities: {
    kicker: string;
    heading: string;
    groups: CapabilityGroup[];
  };
  about: {
    kicker: string;
    heading: string;
    paragraphs: string[];
  };
  contact: {
    kicker: string;
    heading: string;
    body: string;
    emailCta: string;
    cvEnCta: string;
    cvTrCta: string;
  };
  footer: {
    note: string;
    builtWith: string;
  };
}

const en: SiteContent = {
  localeName: "English",
  meta: {
    title: "İsa Kaya — Full Stack Developer",
    description:
      "Full Stack Developer focused on React and Next.js. I build web applications, SaaS products and operational software — QR menus, POS, digital signage and service tracking — with Node.js, PostgreSQL and hands-on deployment experience.",
  },
  a11y: {
    skipToContent: "Skip to content",
    primaryNav: "Primary navigation",
    themeToggle: "Toggle color theme",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    languageLabel: "Language",
    menu: "Menu",
    close: "Close",
    portraitAlt: "Portrait of İsa Kaya",
    externalLink: "opens in a new tab",
  },
  header: {
    nav: [
      { label: "Work", href: "#work" },
      { label: "Experience", href: "#experience" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  hero: {
    kicker: "Full Stack Developer",
    name: "İsa Kaya",
    title: "Full Stack Developer",
    lede:
      "I build web applications, SaaS products and operational software. My work is frontend-focused with React and Next.js, backed by hands-on experience across Node.js, PostgreSQL, deployment and real-world technical operations.",
    stackLabel: "Core stack",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL"],
    primaryCta: "View selected work",
    cvCta: "Download CV",
    location: "İstanbul, Türkiye",
    portraitCaption: "İsa Kaya — İstanbul, Türkiye",
  },
  work: {
    kicker: "Selected work",
    heading: "Products I have helped design, build and ship",
    intro:
      "Independent SaaS products developed end to end, and operational software carried from requirements through testing to real-world use.",
    techLabel: "Stack",
    focusLabel: "Focus",
    projects: [
      {
        id: "menurevo",
        index: "01",
        name: "MenuRevo",
        url: "https://menurevo.com",
        tag: "Independent SaaS product",
        period: "2025 — 2026",
        summary:
          "A QR menu SaaS that lets restaurants and cafés manage their menus digitally. Designed and developed end to end as an independent product.",
        bullets: [
          "Business dashboard, admin panel and the mobile menu interface reached through QR codes",
          "Menu, category, product, price, portion, image and language management screens",
          "QR code generation, PDF export and ready-made menu templates",
          "Multi-business structure with user authorization and administration workflows",
        ],
        tech: [
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "Prisma ORM",
          "shadcn/ui",
          "Tailwind CSS",
        ],
      },
      {
        id: "techsimum",
        index: "02",
        name: "Techsimum",
        url: "https://techsimum.com",
        tag: "Independent SaaS product",
        period: "2025 — 2026",
        summary:
          "A cloud-based service tracking SaaS for small and medium-sized technical service businesses. Designed and developed end to end as an independent product.",
        bullets: [
          "Device intake, fault records, repair status, payment and delivery tracking screens",
          "Create, update and review workflows for customer, device and service records",
          "Features for informing customers about the status of their service process",
          "User authorization, business management and record tracking",
        ],
        tech: [
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "Prisma ORM",
          "shadcn/ui",
          "Tailwind CSS",
        ],
      },
      {
        id: "mapos-signage",
        index: "03",
        name: "MaPos Digital Signage",
        tag: "MaPos Business Solutions",
        period: "2026",
        summary:
          "Digital signage software I contributed to end to end — from product requirements and feature development through functional testing to installation and daily use in the field.",
        bullets: [
          "Device pairing, content management, playlists and broadcast scheduling",
          "Remote device control features",
          "Functional testing of developed features under real operating conditions",
          "On-site installation, configuration and user training for businesses",
        ],
        focus: [
          "Product analysis",
          "Functional testing",
          "Field installation",
          "User support",
        ],
      },
      {
        id: "aspower",
        index: "04",
        name: "Aspower",
        tag: "Engineering work",
        period: "2024 — 2025",
        summary:
          "Full stack development across management software, digital signage and electric-vehicle charging tooling.",
        bullets: [],
        subItems: [
          {
            label: "CMS admin panel",
            detail: "Next.js, shadcn/ui, Tailwind CSS, PostgreSQL, Prisma ORM",
          },
          {
            label: "Digital signage screen management",
            detail: "React, Material UI, Node.js, Sequelize ORM",
          },
          {
            label: "EV charging operator panel",
            detail: "Rewrite of an Angular application in React",
          },
          {
            label: "Charging-station diagnostics panel",
            detail: "Status monitoring built on MongoDB",
          },
          {
            label: "OCPP log analysis tool",
            detail: "Desktop application built with PySide6",
          },
        ],
      },
    ],
  },
  experience: {
    kicker: "Experience",
    heading: "Professional experience",
    entries: [
      {
        company: "MaPos Business Solutions",
        role: "Product & Technical Operations Specialist",
        period: "Feb 2026 — Jul 2026",
        location: "İstanbul",
        summary:
          "Product analysis, functional testing, installation and user support for the MaPos restaurant management software. End-to-end contribution to the Digital Signage product; POS, printer, mobile app and network installation; user training, pre-sales demos and post-sales technical support.",
      },
      {
        company: "Independent",
        role: "Software Developer — SaaS Products",
        period: "Aug 2025 — Jan 2026",
        summary:
          "Designed and developed two SaaS products end to end: MenuRevo, a QR menu product for restaurants and cafés, and Techsimum, a service tracking product for technical service businesses — with Next.js, Node.js, PostgreSQL and Prisma ORM.",
      },
      {
        company: "Aspower",
        role: "Full Stack Developer",
        period: "Jun 2024 — Jul 2025",
        summary:
          "CMS admin panel with Next.js and Prisma ORM; digital signage screen management with React, Node.js and Sequelize ORM; EV charging operator panel rewritten from Angular to React; MongoDB-based diagnostics panel; PySide6 desktop tool for OCPP log analysis.",
      },
      {
        company: "Beranet Yazılım",
        role: "Full Stack Developer",
        period: "Feb 2023 — Jul 2023",
        summary:
          "Corporate websites with admin panels using PHP, jQuery, Bootstrap and Tailwind CSS — user interface, backend and database development, plus administration screens for content management and data entry.",
      },
      {
        company: "SaveAs Yazılım",
        role: "Frontend Developer",
        period: "Jun 2020 — Feb 2022",
        summary:
          "User interface and content development for istanbultarihi.ist. Supported server installation, configuration and maintenance; database backups and checks; setup of the team's development tooling on the server.",
      },
    ],
  },
  capabilities: {
    kicker: "Capabilities",
    heading: "Technical capabilities",
    groups: [
      {
        label: "Frontend",
        items: [
          "React",
          "Next.js",
          "Angular",
          "JavaScript",
          "jQuery",
          "Tailwind CSS",
          "Bootstrap",
          "Material UI",
          "shadcn/ui",
        ],
      },
      {
        label: "Backend & APIs",
        items: ["Node.js", "PHP", "REST APIs"],
      },
      {
        label: "Databases & ORM",
        items: ["PostgreSQL", "MongoDB", "Prisma ORM", "Sequelize ORM"],
      },
      {
        label: "Desktop & protocols",
        items: ["PySide6", "OCPP log analysis"],
      },
      {
        label: "Tools & systems",
        items: ["Git", "GitHub", "GitLab", "Docker", "Linux", "Ubuntu", "Debian"],
      },
      {
        label: "Product domains",
        items: [
          "SaaS products",
          "Admin dashboards",
          "POS & restaurant systems",
          "Digital signage",
          "QR menus",
          "Service tracking",
          "Product analysis",
          "Functional testing",
          "Technical installation",
          "User training",
        ],
      },
    ],
  },
  about: {
    kicker: "About",
    heading: "How I work",
    paragraphs: [
      "I am a full stack developer with a frontend focus. Most of my day-to-day work is React and Next.js, and I stay hands-on across the stack — Node.js and PHP backends, PostgreSQL and MongoDB data layers, REST APIs, and the deployment work around them.",
      "I have built two SaaS products of my own end to end, and I have worked on operational software where requirements come from the field: POS and restaurant management, digital signage, QR menus and technical service tracking.",
      "Because I have also done installation, user training and on-site support, I test software against real operating conditions rather than the happy path. I care about clear interfaces, maintainable code and products that hold up in daily use.",
    ],
  },
  contact: {
    kicker: "Contact",
    heading: "Get in touch",
    body: "The fastest way to reach me is email. You can also find my code on GitHub and my professional background on LinkedIn — or download my CV directly.",
    emailCta: "Email me",
    cvEnCta: "Download CV — English",
    cvTrCta: "CV İndir — Türkçe",
  },
  footer: {
    note: "İstanbul, Türkiye",
    builtWith: "Built with Next.js, deployed on Cloudflare Workers.",
  },
};

const tr: SiteContent = {
  localeName: "Türkçe",
  meta: {
    title: "İsa Kaya — Full Stack Developer",
    description:
      "React ve Next.js odaklı Full Stack Developer. Web uygulamaları, SaaS ürünleri ve operasyonel yazılımlar — QR menü, POS, Digital Signage ve servis takip — Node.js, PostgreSQL ve uçtan uca yayınlama deneyimiyle.",
  },
  a11y: {
    skipToContent: "İçeriğe atla",
    primaryNav: "Ana gezinme",
    themeToggle: "Renk temasını değiştir",
    themeLight: "Açık temaya geç",
    themeDark: "Koyu temaya geç",
    languageLabel: "Dil",
    menu: "Menü",
    close: "Kapat",
    portraitAlt: "İsa Kaya'nın portre fotoğrafı",
    externalLink: "yeni sekmede açılır",
  },
  header: {
    nav: [
      { label: "Çalışmalar", href: "#work" },
      { label: "Deneyim", href: "#experience" },
      { label: "Yetkinlikler", href: "#capabilities" },
      { label: "Hakkımda", href: "#about" },
      { label: "İletişim", href: "#contact" },
    ],
  },
  hero: {
    kicker: "Full Stack Developer",
    name: "İsa Kaya",
    title: "Full Stack Developer",
    lede:
      "Web uygulamaları, SaaS ürünleri ve operasyonel yazılımlar geliştiriyorum. Çalışmalarım React ve Next.js ağırlıklı; Node.js, PostgreSQL, yayınlama ve saha operasyonlarına uzanan pratik deneyimle destekleniyor.",
    stackLabel: "Ana teknolojiler",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL"],
    primaryCta: "Çalışmaları gör",
    cvCta: "CV indir",
    location: "İstanbul, Türkiye",
    portraitCaption: "İsa Kaya — İstanbul, Türkiye",
  },
  work: {
    kicker: "Seçilmiş çalışmalar",
    heading: "Tasarlanmasına, geliştirilmesine ve yayınlanmasına katkı verdiğim ürünler",
    intro:
      "Uçtan uca geliştirdiğim bağımsız SaaS ürünleri ve gereksinimden gerçek kullanım koşullarına taşıdığım operasyonel yazılımlar.",
    techLabel: "Teknolojiler",
    focusLabel: "Odak",
    projects: [
      {
        id: "menurevo",
        index: "01",
        name: "MenuRevo",
        url: "https://menurevo.com",
        tag: "Bağımsız SaaS ürünü",
        period: "2025 — 2026",
        summary:
          "Restoran ve kafelerin menülerini dijital ortamda yönetmesini sağlayan QR menü SaaS ürünü. Bağımsız bir ürün olarak uçtan uca tasarladım ve geliştirdim.",
        bullets: [
          "İşletme paneli, yönetici paneli ve QR kod ile erişilen mobil menü arayüzü",
          "Menü, kategori, ürün, fiyat, porsiyon, görsel ve dil yönetimi ekranları",
          "QR kod oluşturma, PDF çıktısı ve hazır menü şablonları",
          "Çoklu işletme yapısı, kullanıcı yetkilendirmeleri ve yönetim süreçleri",
        ],
        tech: [
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "Prisma ORM",
          "shadcn/ui",
          "Tailwind CSS",
        ],
      },
      {
        id: "techsimum",
        index: "02",
        name: "Techsimum",
        url: "https://techsimum.com",
        tag: "Bağımsız SaaS ürünü",
        period: "2025 — 2026",
        summary:
          "Küçük ve orta ölçekli teknik servis işletmeleri için bulut tabanlı servis takip SaaS ürünü. Bağımsız bir ürün olarak uçtan uca tasarladım ve geliştirdim.",
        bullets: [
          "Cihaz kabulü, arıza kaydı, onarım durumu, ödeme ve teslimat takibi ekranları",
          "Müşteri, cihaz ve servis kayıtları için oluşturma, güncelleme ve görüntüleme akışları",
          "Müşterileri servis sürecinin durumu hakkında bilgilendiren özellikler",
          "Kullanıcı yetkilendirme, işletme yönetimi ve kayıt takibi",
        ],
        tech: [
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "Prisma ORM",
          "shadcn/ui",
          "Tailwind CSS",
        ],
      },
      {
        id: "mapos-signage",
        index: "03",
        name: "MaPos Digital Signage",
        tag: "MaPos Business Solutions",
        period: "2026",
        summary:
          "Ürün gereksinimlerinden özellik geliştirmeye, fonksiyonel testlerden kuruluma ve sahadaki günlük kullanıma kadar baştan sona görev aldığım Digital Signage yazılımı.",
        bullets: [
          "Cihaz eşleştirme, içerik yönetimi, oynatma listeleri ve yayın planlama",
          "Uzaktan cihaz kontrolü özellikleri",
          "Geliştirilen özelliklerin gerçek kullanım koşullarında fonksiyonel testleri",
          "İşletmelerde yerinde kurulum, yapılandırma ve kullanıcı eğitimi",
        ],
        focus: [
          "Ürün analizi",
          "Fonksiyonel test",
          "Saha kurulumu",
          "Kullanıcı desteği",
        ],
      },
      {
        id: "aspower",
        index: "04",
        name: "Aspower",
        tag: "Mühendislik çalışmaları",
        period: "2024 — 2025",
        summary:
          "Yönetim yazılımları, Digital Signage ve elektrikli araç şarj araçları genelinde full stack geliştirme.",
        bullets: [],
        subItems: [
          {
            label: "CMS yönetim paneli",
            detail: "Next.js, shadcn/ui, Tailwind CSS, PostgreSQL, Prisma ORM",
          },
          {
            label: "Digital Signage ekran yönetimi",
            detail: "React, Material UI, Node.js, Sequelize ORM",
          },
          {
            label: "EVC operatör paneli",
            detail: "Angular uygulamasının React ile yeniden yazılması",
          },
          {
            label: "Şarj istasyonu diagnostic paneli",
            detail: "MongoDB üzerinde durum izleme",
          },
          {
            label: "OCPP log analiz aracı",
            detail: "PySide6 ile geliştirilen masaüstü uygulaması",
          },
        ],
      },
    ],
  },
  experience: {
    kicker: "Deneyim",
    heading: "İş deneyimi",
    entries: [
      {
        company: "MaPos Business Solutions",
        role: "Ürün ve Teknik Operasyon Sorumlusu",
        period: "Şub 2026 — Tem 2026",
        location: "İstanbul",
        summary:
          "MaPos adisyon yazılımında ürün analizi, fonksiyonel test, kurulum ve kullanıcı desteği. Digital Signage ürününe baştan sona katkı; POS, yazıcı, mobil uygulama ve ağ kurulumları; kullanıcı eğitimi, satış öncesi ürün anlatımı ve satış sonrası teknik destek.",
      },
      {
        company: "Bağımsız",
        role: "Yazılım Geliştirici — SaaS Ürünleri",
        period: "Ağu 2025 — Oca 2026",
        summary:
          "İki SaaS ürününü uçtan uca tasarladım ve geliştirdim: restoran ve kafeler için QR menü ürünü MenuRevo ve teknik servis işletmeleri için servis takip ürünü Techsimum — Next.js, Node.js, PostgreSQL ve Prisma ORM ile.",
      },
      {
        company: "Aspower",
        role: "Full Stack Developer",
        period: "Haz 2024 — Tem 2025",
        summary:
          "Next.js ve Prisma ORM ile CMS yönetim paneli; React, Node.js ve Sequelize ORM ile Digital Signage ekran yönetimi; Angular'dan React'e EVC operatör paneli; MongoDB tabanlı diagnostic panel; OCPP log analizi için PySide6 masaüstü aracı.",
      },
      {
        company: "Beranet Yazılım",
        role: "Full Stack Developer",
        period: "Şub 2023 — Tem 2023",
        summary:
          "PHP, jQuery, Bootstrap ve Tailwind CSS ile yönetim panelli kurumsal web siteleri — arayüz, backend ve veri tabanı geliştirme ile içerik yönetimi ve veri girişi ekranları.",
      },
      {
        company: "SaveAs Yazılım",
        role: "Frontend Developer",
        period: "Haz 2020 — Şub 2022",
        summary:
          "istanbultarihi.ist için arayüz ve içerik geliştirme. Sunucu kurulumu, yapılandırması ve bakımına destek; veri tabanı yedekleme ve kontrolleri; ekibin geliştirme araçlarının sunucuya kurulumu.",
      },
    ],
  },
  capabilities: {
    kicker: "Yetkinlikler",
    heading: "Teknik yetkinlikler",
    groups: [
      {
        label: "Frontend",
        items: [
          "React",
          "Next.js",
          "Angular",
          "JavaScript",
          "jQuery",
          "Tailwind CSS",
          "Bootstrap",
          "Material UI",
          "shadcn/ui",
        ],
      },
      {
        label: "Backend ve API",
        items: ["Node.js", "PHP", "REST API"],
      },
      {
        label: "Veritabanı ve ORM",
        items: ["PostgreSQL", "MongoDB", "Prisma ORM", "Sequelize ORM"],
      },
      {
        label: "Masaüstü ve protokoller",
        items: ["PySide6", "OCPP log analizi"],
      },
      {
        label: "Araçlar ve sistemler",
        items: ["Git", "GitHub", "GitLab", "Docker", "Linux", "Ubuntu", "Debian"],
      },
      {
        label: "Ürün alanları",
        items: [
          "SaaS ürünleri",
          "Yönetim panelleri",
          "POS ve adisyon sistemleri",
          "Digital Signage",
          "QR menü",
          "Servis takibi",
          "Ürün analizi",
          "Fonksiyonel test",
          "Teknik kurulum",
          "Kullanıcı eğitimi",
        ],
      },
    ],
  },
  about: {
    kicker: "Hakkımda",
    heading: "Nasıl çalışırım",
    paragraphs: [
      "Frontend ağırlıklı bir full stack developer'ım. Günlük işlerimin çoğu React ve Next.js; ancak Node.js ve PHP backend'ler, PostgreSQL ve MongoDB veri katmanları, REST API'ler ve bunların etrafındaki yayınlama süreçlerinde de aktif olarak çalışıyorum.",
      "Kendi iki SaaS ürünümü uçtan uca geliştirdim; gereksinimlerin sahadan geldiği operasyonel yazılımlarda — POS ve adisyon sistemleri, Digital Signage, QR menü ve teknik servis takibi — görev aldım.",
      "Kurulum, kullanıcı eğitimi ve yerinde destek deneyimim sayesinde yazılımı ideal senaryoyla değil gerçek kullanım koşullarıyla test ederim. Net arayüzler, sürdürülebilir kod ve günlük kullanıma dayanıklı ürünler benim için önceliktir.",
    ],
  },
  contact: {
    kicker: "İletişim",
    heading: "İletişime geçin",
    body: "Bana ulaşmanın en hızlı yolu e-posta. Kodlarımı GitHub'da, profesyonel geçmişimi LinkedIn'de inceleyebilir veya CV'mi doğrudan indirebilirsiniz.",
    emailCta: "E-posta gönderin",
    cvEnCta: "Download CV — English",
    cvTrCta: "CV İndir — Türkçe",
  },
  footer: {
    note: "İstanbul, Türkiye",
    builtWith: "Next.js ile geliştirildi, Cloudflare Workers üzerinde yayınlanıyor.",
  },
};

export const CONTENT: Record<Locale, SiteContent> = { en, tr };

export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}
