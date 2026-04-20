
import React, { useState, useEffect, useId, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Download, 
  Mail, 
  Menu, 
  X,
  Code,
  Monitor,
  Smartphone,
  Server,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  BadgeCheck
} from 'lucide-react';

type ProjectCategory = 'all' | 'Web App' | 'Mobile App' | 'Cloud';

/** Play / app-store style mark: play triangle in a rounded tile (inherits `currentColor`). */
function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        fill="currentColor"
        d="M10 8.25v7.5l5.25-3.75L10 8.25z"
      />
    </svg>
  );
}

function isGooglePlayUrl(url: string) {
  return /play\.google\.com/i.test(url) || /^market:\/\//i.test(url);
}

/** Pick Play Store vs APK from `playStoreUrl`, `apkDownload`, and `mobileListing`. */
function resolveMobilePrimary(project: {
  type?: string;
  mobileListing?: 'apk' | 'playstore';
  playStoreUrl?: string;
  apkDownload?: string;
}): { kind: 'play' | 'apk'; href: string } | null {
  if (project.type !== 'Mobile App') return null;
  const playUrl = project.playStoreUrl?.trim() || '';
  const apkUrl = project.apkDownload?.trim() || '';
  const listing = project.mobileListing;

  if (listing === 'playstore') {
    if (playUrl) return { kind: 'play', href: playUrl };
    if (apkUrl && isGooglePlayUrl(apkUrl)) return { kind: 'play', href: apkUrl };
    return null;
  }
  if (listing === 'apk') {
    if (apkUrl && isGooglePlayUrl(apkUrl)) return { kind: 'play', href: apkUrl };
    if (apkUrl) return { kind: 'apk', href: apkUrl };
    if (playUrl) return { kind: 'play', href: playUrl };
    return null;
  }
  if (playUrl) return { kind: 'play', href: playUrl };
  if (apkUrl && isGooglePlayUrl(apkUrl)) return { kind: 'play', href: apkUrl };
  if (apkUrl) return { kind: 'apk', href: apkUrl };
  return null;
}

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [formErrors, setFormErrors] = useState({}) as any;

  const heroPortraitUrl =
    'https://res.cloudinary.com/dpp46k83h/image/upload/v1776696938/bolaji-01_f8fh3a.png';
  const heroPortraitFallbackUrl =
    'https://res.cloudinary.com/dpp46k83h/image/upload/v1753113423/DSC_3555_copy_2_cxynkl.jpg';
  const heroRingPathId = `hero-verified-ring-${useId().replace(/:/g, '')}`;
  const [heroImgSrc, setHeroImgSrc] = useState(heroPortraitUrl);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const validateForm = () => {
    const errors = {} as any;
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
          setFormStatus('sending');
          try {
            const response = await fetch('https://formspree.io/f/mvgqzylq', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });

            if (response.ok) {
              setFormStatus('success');
              setFormData({ name: '', email: '', subject: '', message: '' });
              setTimeout(() => setFormStatus(''), 5000); // Clear success message after 5 seconds
            } else {
              setFormStatus('error');
              setTimeout(() => setFormStatus(''), 5000); // Clear error message after 5 seconds
            }
          } catch (error) {
            setFormStatus('error');
            setTimeout(() => setFormStatus(''), 5000); // Clear error message after 5 seconds
          }
        }
      };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     setFormStatus('sending');
  //     // Simulate sending delay
  //     setTimeout(() => {
  //       const mailtoLink = `mailto:alex.developer@example.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
  //       window.location.href = mailtoLink;
  //       setFormStatus('success');
  //       setFormData({ name: '', email: '', subject: '', message: '' });
  //     }, 1000);
  //   }
  // };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const projects:any = [
        {
      id: 1,
      title: "Doctools",
      type: "Web App",
      image: "/doctools.jpg",
      description: "An all in one platform document conversion and other file conversions",
      technologies: ["FastAPI", "OpenAI", "AWS", "MongoDB","supabase","Nextjs","Tailwind CSS"],
      liveDemo: "https://www.doctools.io/",
      sourceCode: false,
      // github: "https://github.com/emperorbj/ai-docs"
    },
    {
      id: 2,
      title: "Soloa AI",
      type: "Web App",
      image: "/soloai.jpg",
      description: "An AI-powered platform that offers a suite of tools and services to help businesses and individuals leverage artificial intelligence for various applications, including content generation, data analysis, and automation.",
      technologies: ["Next.js", "Express", "MongoDB", "OpenAI","Langgraph","Tailwind CSS"],
      liveDemo: "https://www.soloa.ai/?ref=producthunt",
      sourceCode: false,
      // github: "https://github.com/emperorbj/cloud-monitor"
    },
    {
      id: 3,
      title: "Regwatch App",
      type: "Web App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753114570/Image_fx_1_jchfhx.png",
      description: "A platform that offer real time regulatory compliance updates and notifications to users with a compliance intelligence system",
      technologies: ["Nextjs", "Node.js", "MongoDB", "flutterwave", "ShadcnUI", "Tailwind CSS","React Query"],
      liveDemo: "https://www.regwatch.com.ng/",
      sourceCode: false
    },
     {
      id: 7,
      title: "Blog Deployment",
      type: "Cloud",
      image: "/blog.jpg",
      description: "Deployment of a React Web app with Docker and AWS EC2 instance.",
      technologies: ["React", "AWS EC2", "Docker",],
      liveDemo: "https://www.loom.com/share/54cae3d026ee4cdba301550d39cea550?sid=6eb369be-3f63-44f5-a5ed-ea7caf72e719",
      sourceCode: true,
      github: "https://github.com/emperorbj/fresh-fable-forge"
    },
    {
      id: 8,
      title: "Deploy Static Coffee Site",
      type: "Cloud",
      image: "/ci.jpg",
      description: "Deployed static react app with AWS S3 bucket,cloudfront and github actions ci/cd.",
      technologies: ["React.js", "AWS S3", "CloudFront", "GitHub Actions"],
      liveDemo: "https://www.loom.com/share/b054a371b5464d87968777374213876f",
      sourceCode: true,
      github: "https://github.com/emperorbj/coffee-crafter-web"
    },
     {
      id: 9,
      title: "Setting up a CI/CD Pipeline for a MERN Stack Notes App",
      type: "Cloud",
      image: "/diagram.png",
      description: "A comprehensive guide on setting up a CI/CD pipeline for a MERN stack application using GitHub Actions and AWS EC2.",
      technologies: ["React", "Nodejs", "AWS EC2", "Tailwind CSS","MongoDB","GitHub Actions","Docker"],
      liveDemo: "https://www.loom.com/share/897f49af1b274e3fba6921c842d0653b",
      sourceCode: true,
      github: "https://github.com/emperorbj/notify"
    },

      {
      id: 10,
      title: "Soloa AI",
      type: "Mobile App",
      image: "/soloai.jpg",
      description: "An all-in-one AI app for contentcreators. It does image,video,voice,charater generation and more",
      technologies: ["ReactNative", "FastApi", "MongoDB","React Query"],
      mobileListing: 'playstore' as const,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.soloaai.app&hl=en",
      sourceCode: true,
      github: "https://github.com/emperorbj/botydoc"
    },
      {
      id: 11,
      title: "Apologia App",
      type: "Mobile App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753114575/Image_fx_2_k2cbih.png",
      description: "An Apologetics app. You can watch videos and download ebooks here",
      technologies: ["ReactNative", "FastApi", "MongoDB","React Query","Gemini AI"],
      mobileListing: 'apk' as const,
      apkDownload: "https://drive.google.com/file/d/19B9gEkx94NAV-XqDSveOXGbEXwmHS7zp/view?usp=sharing",
      sourceCode: true
    },
    {
      id: 12,
      title: "Helixia App",
      type: "Mobile App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753114569/Image_fx_3_obye4r.png",
      description: "A mobile app for accessing lawyers and witha built-in response to emergency feature",
      technologies: ["ReactNative", "Supabase","React Query"],
      mobileListing: 'apk' as const,
      apkDownload: "https://drive.google.com/file/d/1lrPBjYQinyDQM6PKZZtEhggey3QxrCBA/view?usp=sharing",
      sourceCode: true,
      // github: "https://github.com/emperorbj/boodio"
    },
  ];

  const skills = {
    "Languages": ["JavaScript", "TypeScript", "Python",],
    "Frontend": ["React", "Vue.js", "Angular", "HTML5", "CSS3", "Tailwind CSS","Next.js", "ShadcnUI"],
    "Backend": ["Node.js", "Express", "FastApi", "Appwrite", "Supabase"],
    "Mobile": ["React Native"],
    "Databases": ["MongoDB", "PostgreSQL", "MySQL", "Redis",],
    "Tools": ["Git", "Docker", "Postman", "Figma", "click-up", "Slack"],
    "Cloud": ["Google Cloud Platform","AWS","K8","Terraform","Githun Actions"],
    "AI and Frameworks": ["LangChain","Langgraph","OpenAI","Gemini AI","FAISS"],
  };

  const projectCount = projects.length;
  const webProjectCount = projects.filter((p) => p.type === 'Web App').length;
  const mobileProjectCount = projects.filter((p) => p.type === 'Mobile App').length;
  const cloudProjectCount = projects.filter((p) => p.type === 'Cloud').length;

  const aboutServices = [
    {
      title: 'Web platforms',
      count: webProjectCount,
      icon: Monitor,
      accent: 'bg-[hsl(var(--portfolio-teal))]',
    },
    {
      title: 'Mobile applications',
      count: mobileProjectCount,
      icon: Smartphone,
      accent: 'bg-[hsl(var(--portfolio-gold))]',
    },
    {
      title: 'Cloud & DevOps',
      count: cloudProjectCount,
      icon: Server,
      accent: 'bg-[hsl(var(--portfolio-coral))]',
    },
  ] as const;

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return projects;
    return projects.filter((p) => p.type === projectFilter);
  }, [projectFilter, projects]);

  const projectTabCounts = useMemo(
    () => ({
      all: projects.length,
      'Web App': projects.filter((p) => p.type === 'Web App').length,
      'Mobile App': projects.filter((p) => p.type === 'Mobile App').length,
      Cloud: projects.filter((p) => p.type === 'Cloud').length,
    }),
    [projects]
  );

  const projectTabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'Web App', label: 'Web' },
    { id: 'Mobile App', label: 'Mobile' },
    { id: 'Cloud', label: 'Cloud' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/10 bg-gray-900/95 text-white shadow-lg backdrop-blur-sm'
            : 'border-b border-neutral-200/60 bg-[hsl(var(--portfolio-canvas))]/90 text-[hsl(var(--portfolio-ink))] backdrop-blur-sm'
        }`}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            <button
              type="button"
              onClick={() => smoothScroll('home')}
              className={`flex items-center gap-3 rounded-md transition-opacity hover:opacity-80 ${
                isScrolled ? 'text-white' : 'text-neutral-900'
              }`}
              aria-label="Go to top"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-md border text-[11px] font-bold tracking-tight ${
                  isScrolled
                    ? 'border-white/20 bg-white/5'
                    : 'border-neutral-300 bg-white'
                }`}
              >
                BO
              </span>
              <span className="hidden text-sm font-semibold tracking-tight sm:inline">
                Bolaji Opatola
              </span>
            </button>

            <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex md:items-center md:gap-10">
              {[
                { label: 'About Me', id: 'about' },
                { label: 'Portfolio', id: 'projects' },
                { label: 'Skills', id: 'skills' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => smoothScroll(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled
                      ? 'text-neutral-300 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => smoothScroll('contact')}
                className={`hidden items-center gap-1.5 text-sm font-semibold transition-colors sm:inline-flex ${
                  isScrolled
                    ? 'text-white hover:text-blue-300'
                    : 'text-neutral-900 hover:text-neutral-600'
                }`}
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </button>

              <button
                type="button"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-neutral-900'}`} />
                ) : (
                  <Menu className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-neutral-900'}`} />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div
              className={`md:hidden ${
                isScrolled
                  ? 'mt-2 rounded-lg border border-white/10 bg-gray-800 py-3'
                  : 'mt-2 rounded-lg border border-neutral-200 bg-white py-3 shadow-sm'
              }`}
            >
              {[
                { label: 'About Me', id: 'about' },
                { label: 'Portfolio', id: 'projects' },
                { label: 'Skills', id: 'skills' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => smoothScroll(item.id)}
                  className={`block w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    isScrolled
                      ? 'hover:bg-gray-700/80'
                      : 'hover:bg-neutral-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => smoothScroll('contact')}
                className={`mt-1 flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-semibold ${
                  isScrolled ? 'text-blue-300' : 'text-neutral-900'
                }`}
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section — editorial light monochrome (reference layout) */}
      <section
        id="home"
        className="relative min-h-screen bg-[hsl(var(--portfolio-canvas))] text-[hsl(var(--portfolio-ink))] antialiased"
      >
        <div className="mx-auto flex min-h-screen max-w-[1600px]">
          <aside className="relative hidden w-14 shrink-0 flex-col items-center justify-between border-r border-neutral-200 py-10 lg:flex">
            <span
              className="text-[10px] font-medium uppercase tracking-[0.28em] text-neutral-400"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Full-Stack Engineer
            </span>
            <span
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400"
              style={{ writingMode: 'vertical-rl' }}
            >
              2026
            </span>
          </aside>

          <div className="grid min-h-screen flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,460px)]">
            <div className="order-2 flex flex-col justify-between px-4 pb-10 pt-12 sm:px-8 sm:pt-16 lg:order-none lg:max-w-none lg:px-12 lg:pt-28 xl:px-14 xl:pt-32">
              <div className="flex flex-wrap gap-x-10 gap-y-8 sm:gap-x-14 sm:gap-x-20">
                <div>
                  <p className="text-4xl font-light tabular-nums tracking-tight text-[hsl(var(--portfolio-ink))] sm:text-5xl md:text-6xl">
                    +{projectCount}
                  </p>
                  <p className="mt-1 max-w-[10rem] text-sm leading-snug text-[hsl(var(--portfolio-muted))]">
                    Projects completed
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-light tabular-nums tracking-tight text-[hsl(var(--portfolio-ink))] sm:text-5xl md:text-6xl">
                    4+
                  </p>
                  <p className="mt-1 max-w-[10rem] text-sm leading-snug text-[hsl(var(--portfolio-muted))]">
                    Years experience
                  </p>
                </div>
              </div>

              <div className="my-10 lg:my-0">
                <h1 className="text-[clamp(3.75rem,12vw,10rem)] font-bold leading-[0.92] tracking-tight text-[hsl(var(--portfolio-ink))] sm:text-[clamp(4.5rem,14vw,10rem)]">
                  Hello
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[hsl(var(--portfolio-muted))] sm:mt-6 sm:text-lg">
                  <span className="text-[hsl(var(--portfolio-ink))]">—</span> I&apos;m{' '}
                  <span className="font-medium text-[hsl(var(--portfolio-ink))]">Bolaji Opatola</span>, a{' '}
                  Full-Stack (Web/Mobile) &amp; AI Solutions Developer. I craft digital experiences
                  that bridge creativity and technology—web applications, mobile and AI solutions,
                  and scalable APIs.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
                  <button
                    type="button"
                    onClick={() => smoothScroll('projects')}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full bg-[hsl(var(--portfolio-ink))] px-7 py-3 text-sm font-semibold text-[hsl(var(--portfolio-canvas))] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    View portfolio
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => smoothScroll('contact')}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border border-neutral-300 bg-transparent px-7 py-3 text-sm font-semibold text-[hsl(var(--portfolio-ink))] transition-colors hover:border-[hsl(var(--portfolio-ink))] active:scale-[0.98]"
                  >
                    Get in touch
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => smoothScroll('about')}
                className="group flex w-fit min-h-[44px] items-center gap-2 text-sm font-medium text-[hsl(var(--portfolio-muted))] transition-colors hover:text-[hsl(var(--portfolio-ink))]"
              >
                Scroll down
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>

            <div className="relative order-1 flex min-h-[38vh] items-center justify-center bg-[hsl(var(--portfolio-canvas))] px-4 pb-8 pt-20 sm:min-h-[42vh] sm:pt-24 lg:order-none lg:min-h-screen lg:px-6 lg:pb-0 lg:pt-0">
              <div className="relative flex w-full max-w-[min(420px,92vw)] flex-col items-center justify-center lg:max-w-[min(440px,36vw)]">
                <div
                  className="pointer-events-none absolute -right-1 top-[2%] z-10 h-[7.25rem] w-[7.25rem] sm:h-[8rem] sm:w-[8rem] sm:top-[6%] lg:right-[-0.5rem] lg:top-[10%]"
                  aria-hidden
                >
                  <svg
                    className="hero-verified-spin h-full w-full overflow-visible text-neutral-600"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <path
                        id={heroRingPathId}
                        d="M 50,50 m -38,0 a 38,38 0 1 1 76,0 a 38,38 0 1 1 -76,0"
                        fill="none"
                      />
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.2"
                      strokeWidth="0.35"
                    />
                    <text
                      fill="currentColor"
                      className="select-none font-semibold uppercase [font-size:6.25px] tracking-[0.2em]"
                    >
                      <textPath href={`#${heroRingPathId}`} startOffset="0%">
                        Verified · Full-Stack · Web &amp; Mobile · AI · 4+ yrs · Open to work ·
                        Verified · Full-Stack ·
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute left-1/2 top-1/2 flex h-[2.65rem] w-[2.65rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[2.5px] border-[hsl(var(--portfolio-ink))] bg-[hsl(var(--portfolio-canvas))] shadow-sm">
                    <BadgeCheck
                      className="h-[1.15rem] w-[1.15rem] text-[hsl(var(--portfolio-ink))]"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                  </div>
                </div>

                <img
                  src={heroImgSrc}
                  alt="Bolaji Opatola"
                  width={800}
                  height={1000}
                  loading="eager"
                  decoding="async"
                  onError={() => setHeroImgSrc((s) => (s === heroPortraitFallbackUrl ? s : heroPortraitFallbackUrl))}
                  className="mx-auto max-h-[min(52vh,520px)] w-full object-contain object-center drop-shadow-sm sm:max-h-[min(58vh,560px)] lg:max-h-[min(78vh,760px)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section — services + story (light marketing layout) */}
      <section
        id="about"
        className="bg-[hsl(var(--portfolio-surface))] px-4 py-16 text-[hsl(var(--portfolio-ink))] sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 xl:max-w-7xl">
          <div className="order-2 flex flex-col gap-5 lg:order-1 lg:gap-6">
            {aboutServices.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-2xl bg-[hsl(var(--portfolio-surface))] p-5 shadow-[0_8px_30px_rgba(7,30,38,0.07)] ring-1 ring-neutral-200/80 sm:gap-5 sm:p-6"
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16 ${item.accent}`}
                  >
                    <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold tracking-tight sm:text-lg">{item.title}</p>
                    <p className="mt-0.5 text-sm text-[hsl(var(--portfolio-muted))]">
                      {item.count} Projects
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              What do I help?
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[hsl(var(--portfolio-muted))] sm:text-lg">
              <p>
                I&apos;m Bolaji, a full-stack engineer with 4+ years of experience shipping products end to
                end. I care about clear UX, solid architecture, and delivery you can rely on—from first
                prototype to production.
              </p>
              <p>
                I build scalable web applications, polished mobile experiences, and AI-powered features
                backed by robust APIs and cloud infrastructure. Whether you need a new product, a rewrite,
                or DevOps and deployment support, I partner closely to turn goals into working software.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-neutral-200 pt-10 sm:mt-12 sm:gap-10 sm:pt-12">
              <div>
                <p className="text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
                  {projectCount}+
                </p>
                <p className="mt-1 text-sm text-[hsl(var(--portfolio-muted))]">Projects completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">4+</p>
                <p className="mt-1 text-sm text-[hsl(var(--portfolio-muted))]">Years experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section — light surface + narrower grid (matches hero / about) */}
      <section
        id="projects"
        className="relative overflow-hidden border-t border-neutral-200/80 bg-[hsl(var(--portfolio-surface))] px-4 py-16 text-[hsl(var(--portfolio-ink))] sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[hsl(var(--portfolio-teal))]/10 blur-3xl" />
          <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-[hsl(var(--portfolio-coral))]/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--portfolio-gold))]/8 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl xl:max-w-5xl">
          <div className="mx-auto mb-10 max-w-xl text-center lg:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(var(--portfolio-muted))]">
              Portfolio
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[hsl(var(--portfolio-ink))] sm:text-4xl lg:text-[2.5rem]">
              Featured projects
            </h2>
            <p className="mt-3 text-base text-[hsl(var(--portfolio-muted))] sm:text-lg">
              Real builds across web, mobile, and cloud—same details, sharper presentation.
            </p>
          </div>

          <div className="mb-10 flex justify-center sm:mb-12">
            <div className="scrollbar-none -mx-1 w-full max-w-full overflow-x-auto px-1 sm:mx-0 sm:max-w-none sm:overflow-visible sm:px-0">
              <div
                className="inline-flex min-w-max items-center gap-1 rounded-full border border-neutral-200/90 bg-white/65 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_30px_rgba(7,30,38,0.06)] backdrop-blur-xl ring-1 ring-black/[0.04] sm:gap-1.5 sm:p-2"
                role="tablist"
                aria-label="Filter projects by category"
              >
                {projectTabs.map((tab) => {
                  const active = projectFilter === tab.id;
                  const count = projectTabCounts[tab.id];
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setProjectFilter(tab.id)}
                      className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-5 sm:py-3 ${
                        active
                          ? 'bg-[hsl(var(--portfolio-ink))] text-[hsl(var(--portfolio-surface))] shadow-md shadow-[hsl(var(--portfolio-ink))]/12'
                          : 'text-[hsl(var(--portfolio-muted))] hover:bg-neutral-100/90 hover:text-[hsl(var(--portfolio-ink))]'
                      }`}
                    >
                      <span className="whitespace-nowrap">{tab.label}</span>
                      <span
                        className={`ml-1.5 tabular-nums text-xs font-medium ${
                          active ? 'text-white/75' : 'text-[hsl(var(--portfolio-muted))]/80'
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3 xl:gap-6">
            {filteredProjects.length === 0 ? (
              <p className="col-span-full rounded-2xl border border-neutral-200/90 bg-white/70 py-14 text-center text-sm text-[hsl(var(--portfolio-muted))] shadow-[0_8px_30px_rgba(7,30,38,0.06)] backdrop-blur-md sm:text-base">
                No projects in this category yet.
              </p>
            ) : null}
            {filteredProjects.map((project: any) => {
              const mobilePrimary = resolveMobilePrimary(project);

              const accent =
                project.type === 'Web App'
                  ? {
                      badge:
                        'bg-[hsl(var(--portfolio-teal))]/14 text-[hsl(var(--portfolio-teal))] ring-[hsl(var(--portfolio-teal))]/25',
                      primary:
                        'bg-[hsl(var(--portfolio-teal))] text-white hover:bg-[hsl(var(--portfolio-teal))]/88',
                    }
                  : project.type === 'Mobile App'
                    ? {
                        badge:
                          'bg-[hsl(var(--portfolio-gold))]/18 text-amber-900/90 ring-[hsl(var(--portfolio-gold))]/35',
                        primary:
                          'bg-[hsl(var(--portfolio-gold))] text-[hsl(var(--portfolio-ink))] hover:bg-[hsl(var(--portfolio-gold))]/88',
                      }
                    : {
                        badge:
                          'bg-[hsl(var(--portfolio-coral))]/12 text-[hsl(var(--portfolio-coral))] ring-[hsl(var(--portfolio-coral))]/28',
                        primary:
                          'bg-[hsl(var(--portfolio-coral))] text-white hover:bg-[hsl(var(--portfolio-coral))]/88',
                      };

              return (
                <article
                  key={project.id}
                  className="group relative mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-[1.75rem] border border-neutral-200/90 bg-gradient-to-br from-white/75 to-white/45 shadow-[0_12px_40px_rgba(7,30,38,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-neutral-300 hover:from-white/90 hover:shadow-[0_20px_48px_rgba(7,30,38,0.12)] sm:mx-0 sm:max-w-none"
                >
                  <div className="p-3 sm:p-3.5">
                    <div className="relative overflow-hidden rounded-2xl ring-1 ring-neutral-200/80">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-44 w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] sm:h-48"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(var(--portfolio-ink))]/18 to-transparent opacity-90" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-lg font-bold leading-snug tracking-tight text-[hsl(var(--portfolio-ink))] sm:text-xl">
                        {project.title}
                      </h3>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 backdrop-blur-sm ${accent.badge}`}
                      >
                        {project.type === 'Web App' && (
                          <Code className="h-3.5 w-3.5 opacity-90" aria-hidden />
                        )}
                        {project.type === 'Mobile App' && (
                          <Smartphone className="h-3.5 w-3.5 opacity-90" aria-hidden />
                        )}
                        {project.type === 'Cloud' && (
                          <Server className="h-3.5 w-3.5 opacity-90" aria-hidden />
                        )}
                        {project.type}
                      </span>
                    </div>
                    <p className="mb-4 line-clamp-4 flex-1 text-sm leading-relaxed text-[hsl(var(--portfolio-muted))] sm:text-[0.9375rem]">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech: any) => (
                        <span
                          key={tech}
                          className="rounded-full border border-neutral-200/90 bg-white/70 px-3 py-1 text-[11px] font-medium text-[hsl(var(--portfolio-ink))]/85 backdrop-blur-sm sm:text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-2">
                      {project.type === 'Mobile App' ? (
                        <>
                          {mobilePrimary?.kind === 'play' ? (
                            <a
                              href={mobilePrimary.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-center text-sm font-semibold transition active:scale-[0.98] ${accent.primary}`}
                            >
                              <PlayStoreIcon className="h-4 w-4 shrink-0" />
                              Play Store
                            </a>
                          ) : mobilePrimary?.kind === 'apk' ? (
                            <a
                              href={mobilePrimary.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-center text-sm font-semibold transition active:scale-[0.98] ${accent.primary}`}
                            >
                              <Download className="h-4 w-4 shrink-0" aria-hidden />
                              APK
                            </a>
                          ) : null}
                          {project.sourceCode && project.github ? (
                            <a
                              href={project.github}
                              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-neutral-300/90 bg-white/60 px-4 py-2.5 text-center text-sm font-semibold text-[hsl(var(--portfolio-ink))] backdrop-blur-md transition hover:border-neutral-400 hover:bg-white/85 active:scale-[0.98]"
                            >
                              <Github className="h-4 w-4 shrink-0" aria-hidden />
                              View Code
                            </a>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <a
                            href={project.liveDemo}
                            className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-center text-sm font-semibold transition active:scale-[0.98] ${accent.primary}`}
                          >
                            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                            Live Demo
                          </a>
                          {project.sourceCode && project.github ? (
                            <a
                              href={project.github}
                              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-neutral-300/90 bg-white/60 px-4 py-2.5 text-center text-sm font-semibold text-[hsl(var(--portfolio-ink))] backdrop-blur-md transition hover:border-neutral-400 hover:bg-white/85 active:scale-[0.98]"
                            >
                              <Github className="h-4 w-4 shrink-0" aria-hidden />
                              View Code
                            </a>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-300">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Contact Section */}
          <section id="contact" className="py-20 px-4 bg-gray-800/50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-6 text-blue-400">Let's Build Something Together</h2>
              <p className="text-center text-gray-300 mb-12">
                Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
              </p>
              
              <form
                action="https://formspree.io/f/mvgqzylq"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.name ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.subject ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Project Collaboration"
                  />
                  {formErrors.subject && <p className="text-red-400 text-sm mt-1">{formErrors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.message ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                  {formErrors.message && <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {formStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-600/20 border border-green-600 rounded-lg text-green-300 text-center">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-300 text-center">
                  Oops! Something went wrong. Please try again later.
                </div>
              )}
            </div>
          </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              {/* <div className="text-xl font-bold text-blue-400 mb-2">Opatola Bolaji</div> */}
              {/* <p className="text-gray-400">Full-Stack Developer & Mobile Innovator</p> */}
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/emperorbj"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/bolaji-opatola"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/BolajiOpatola"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Alex Chen. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;

          