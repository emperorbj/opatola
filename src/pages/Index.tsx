
import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X,
  ChevronDown,
  Code,
  Smartphone,
  Server,
  ArrowRight,
  User,
  Briefcase,
  GraduationCap,
  Star
} from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [formErrors, setFormErrors] = useState({}) as any;

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
      title: "Renergy App",
      type: "Web App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753113446/Screenshot_2025-07-21_152845_fzn0zo.png",
      description: "A platform that provides users access to renewable energy solutions, including solar panel installations, energy efficiency tips, and a marketplace for eco-friendly products.",
      technologies: ["Nextjs", "Node.js", "MongoDB", "flutterwave", "ShadcnUI", "Tailwind CSS","React Query"],
      liveDemo: "https://www.renergyhub.com.ng/",
      sourceCode: false
    },
    {
      id: 4,
      title: "OpexA App Platform",
      type: "Web App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753113462/Screenshot_2025-07-21_143627_tfj18l.png",
      description: "An Edtech platform that guides user to choose a career, provides learning paths, assess them and even have a job application feature.",
      technologies: ["Nextjs", "FastApi", "MongoDB", "ShadcnUI", "Tailwind CSS","React Query"],
      liveDemo: "https://opexa.app/",
      sourceCode: false
    },
    {
      id: 5,
      title: "OpexA Affiliate App",
      type: "Web App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753113892/Screenshot_2025-07-21_170427_yucbes.png",
      description: "A platform that allows users to earn money by promoting products and services through affiliate marketing. Users can track their earnings, manage campaigns, and access marketing resources.",
      technologies: ["Nextjs", "Node.js", "MongoDB", "flutterwave", "ShadcnUI", "Tailwind CSS","React Query"],
      liveDemo: "https://affiliate.opexa.app/dashboard",
      sourceCode: false
    },
    {
      id: 6,
      title: "Opexa Corporate App",
      type: "Web App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753113913/Screenshot_2025-07-21_170236_rsfqtv.png",
      description: "A part of the OpexA ecosystem that provides a robust plafform for managing corporate training programs, job application listings,.",
      technologies: ["Nextjs", "Node.js", "MongoDB", "flutterwave", "ShadcnUI", "Tailwind CSS","React Query"],
      liveDemo: "https://corporate.opexa.app/auth/signup",
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
      title: "Botdoc AI",
      type: "Mobile App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753114570/Image_fx_1_jchfhx.png",
      description: "A RAG AI Agent that takes documents and allows user to interact with it.",
      technologies: ["ReactNative", "FastApi", "MongoDB","React Query"],
       apkDownload: "https://drive.google.com/file/d/1JyRpAXCSJJ8P9v5Cf9mQWuGN1YqG9MVg/view?usp=sharing",
      sourceCode: true,
      github: "https://github.com/emperorbj/botydoc"
    },
      {
      id: 11,
      title: "Apologia App",
      type: "Mobile App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753114575/Image_fx_2_k2cbih.png",
      description: "An Apologetics app.",
      technologies: ["ReactNative", "FastApi", "MongoDB","React Query","Gemini AI"],
       apkDownload: "https://drive.google.com/file/d/1gF8ON-I7wDbG_TUo_ZMm6FAnBudWPyeK/view?usp=sharing",
      sourceCode: true
    },
    {
      id: 12,
      title: "Boodio App",
      type: "Mobile App",
      image: "https://res.cloudinary.com/dpp46k83h/image/upload/v1753114569/Image_fx_3_obye4r.png",
      description: "An Apologetics app.",
      technologies: ["ReactNative", "Supabase","React Query"],
      apkDownload: "",
      sourceCode: true,
      github: "https://github.com/emperorbj/boodio"
    },
  ];

  const skills = {
    "Languages": ["JavaScript", "TypeScript", "Python",],
    "Frontend": ["React", "Vue.js", "Angular", "HTML5", "CSS3", "Tailwind CSS","Next.js", "ShadcnUI"],
    "Backend": ["Node.js", "Express", "FastApi", "Appwrite", "Supabase"],
    "Mobile": ["React Native"],
    "Databases": ["MongoDB", "PostgreSQL", "MySQL", "Redis",],
    "Tools": ["Git", "Docker", "Postman", "Figma", "click-up", "Slack"],
    "Cloud": ["Google Cloud Platform","AWS"],
    "AI and Frameworks": ["LangChain","Langgraph","OpenAI","Gemini AI","FAISS"],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-blue-400">Bolaji Opatola</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => smoothScroll(item.toLowerCase())}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-800 rounded-lg mt-2 py-4">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => smoothScroll(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Bolaji Opatola
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
            Full-Stack (Web/Mobile) & AI Solutions Developer
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Crafting digital experiences that bridge creativity and technology. 
            Specializing in web applications, mobile and AI solutions, and scalable APIs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => smoothScroll('projects')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              View My Work <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => smoothScroll('contact')}
              className="border border-gray-600 hover:border-blue-400 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold mb-6 text-blue-400">About Me</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Welcome! I'm Bolaji, a passionate full-stack developer with over 3 years of experience 
                  creating innovative digital solutions. My journey began with a fascination for how 
                  code can transform ideas into reality, and that curiosity continues to drive me today.
                </p>
                <p>
                  I specialize in building scalable web applications, intuitive mobile and AI apps, and robust 
                  APIs that power modern businesses. From startups to enterprise clients, I've helped 
                  organizations leverage technology to achieve their goals and create meaningful user experiences.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring the latest tech trends, contributing to 
                  open-source projects, or mentoring aspiring developers. I believe in the power of 
                  technology to solve real-world problems and make a positive impact.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <Briefcase className="h-5 w-5" />
                  <span>3+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Star className="h-5 w-5" />
                  <span>10+ Projects Completed</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dpp46k83h/image/upload/v1753113423/DSC_3555_copy_2_cxynkl.jpg"
                  alt="Bolaji Opatola"
                  className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Featured Projects</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.map((project:any) => (
              <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.type === 'Web App' ? 'bg-blue-600' :
                      project.type === 'Mobile App' ? 'bg-green-600' : 'bg-purple-600'
                    }`}>
                      {project.type === 'Web App' && <Code className="inline h-3 w-3 mr-1" />}
                      {project.type === 'Mobile App' && <Smartphone className="inline h-3 w-3 mr-1" />}
                      {project.type === 'API' && <Server className="inline h-3 w-3 mr-1" />}
                      {project.type}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech:any) => (
                      <span key={tech} className="bg-gray-700 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.type === 'Mobile App' ? (
                      <>
                        <a
                          href={project.apkDownload}
                          className="flex-1 text-sm bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download APK
                        </a>
                        {project.sourceCode && <a
                          href={project?.github}
                          className={`flex flex-1 border text-sm border-gray-600 hover:border-blue-400 px-4 py-2 rounded-lg text-center transition-colors  items-center justify-center gap-2`}
                        >
                          <Github className="h-4 w-4" />
                          View Code
                        </a>
                        }
                      </>
                    ) : (
                      <>
                        <a
                          href={project.liveDemo}
                          className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                        {project.sourceCode && <a
                          href={project.github}
                          className={`flex flex-1 text-sm border border-gray-600 hover:border-blue-400 px-4 py-2 rounded-lg text-center transition-colors  items-center justify-center gap-2`}
                        >
                          <Github className="h-4 w-4" />
                          View Code
                        </a>
                        }
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
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

          