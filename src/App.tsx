import React, { useEffect, useState, useRef } from 'react';
import { Building2, Users2, Hammer, Phone, ChevronRight, Facebook, Instagram, Linkedin as LinkedIn, Mail, Send, Menu, X, MapPin, Wrench, Sun, Droplet, Zap, Waves, Settings, MessageCircle, Moon } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Region } from './types';
import { mozambiqueRegions } from './data';

const heroSlides = [
  {
    image: "https://www.engenhariacompartilhada.com.br//Imagens/Conteudo/CONSTRUCAO-CIVIL.jpg",
    title: "Construindo o Futuro de Moçambique",
    subtitle: "Excelência em Construção e Engenharia"
  },
  {
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Inovação em Cada Projeto",
    subtitle: "Transformando Visões em Realidade"
  },
  {
    image: "https://criteriaenergia.com.br/wp-content/uploads/2023/12/painel-solar_criacao-e-historia-752x440-1.jpg",
    title: "Compromisso com a Qualidade",
    subtitle: "Construindo com Excelência"
  }
];

const projects = [
  {
    title: "Obras de Emergência em Sofala",
    location: "Província de Sofala",
    description: "Contratação de Empreitada para Obras de Emergência na Província de Sofala, incluindo intervenções críticas e melhorias na infraestrutura local.",
    image: "https://noticias.mmo.co.mz/wp-content/uploads/2023/08/Obras-de-emergencia-no-troco-Save-Muxungue-Inchope.jpg"
  },
  {
    title: "Manutenção de Estradas na Zambézia",
    location: "Maganja da Costa, Zambézia",
    description: "Manutenção de rotina de 198,67 km da estrada e reparação de um acampamento base, garantindo a qualidade e segurança do tráfego.",
    image: "https://www.rm.co.mz/wp-content/uploads/2022/01/3433f4e2f36f2510e3f91cf9fb61b7d9.jpg"
  },
  {
    title: "Reabilitação OMS Maputo",
    location: "Maputo",
    description: "Reabilitação dos escritórios da Organização Mundial de Saúde em Maputo, incluindo modernização das instalações e melhorias estruturais.",
    image: "https://www.afro.who.int/sites/default/files/2022-02/Dr%20Crescencio%20da%20OMS%20e%20Sra%20Riva%20Mendonca%20%20na%20parte%20do%20centro%20de%20saude%20%20de%20%20Topuito%20destruido%20pelo%20ciclone%20ANA%20na%20Provincia%20de%20Nampula%20.jpg"
  },
  {
    title: "Praças de Portagem",
    location: "Província de Maputo",
    description: "Obras de construção de praças de portagem e centros de manutenção na cidade de província de Maputo, melhorando a infraestrutura viária.",
    image: "https://www.revimo.co.mz/assets/img/portagens/portagens5.jpg"
  },
  {
    title: "Intervenção Urbana em Quelimane",
    location: "Quelimane, Zambézia",
    description: "Obras de Manutenção da rotunda e praça da independência, incluindo a av. Eduardo Mondlane e av. Dos Heróis da libertação nacional.",
    image: "https://verdade.co.mz/wp-content/uploads/elementor/thumbs/quelimane-aerea-pctgynvni6bbj0je0tubwi8uk4dz5yv26sty1jmnpk.jpg"
  },
  {
    title: "Ponte Rio Raraga",
    location: "Maganja da Costa, Zambézia",
    description: "Obras de Manutenção da ponte sobre o rio raraga, garantindo a segurança e durabilidade da estrutura.",
    image: "https://www.rm.co.mz/wp-content/uploads/2023/03/estrada-EN-13.jpg"
  },
  {
    title: "Reabilitação INCM",
    location: "Maputo",
    description: "Reabilitação e Remodelação das Antigas Instalações do INCM, modernizando o espaço e melhorando sua funcionalidade.",
    image: "https://aimnews.org/wp-content/uploads/2023/09/INCMa.jpg"
  },
  {
    title: "Edifício MAAF Quelimane",
    location: "Quelimane, Zambézia",
    description: "Obra de Construção do Edifício Comercial do Director da MAAF, incluindo instalações modernas e funcionais.",
    image: "https://www.zambezia.gov.mz/var/ezdemo_site/storage/images/galeria/fotos/edificios-do-governo-da-zambezia/governo-da-zambezia/39510-1-por-MZ/Governo-da-Zambezia_galleryfull.jpg"
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -18.665695,
  lng: 35.529562
};

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div className="relative">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.5, 1.2, 1],
          opacity: [0, 1, 1]
        }}
        transition={{ 
          duration: 1.8,
          times: [0, 0.6, 1],
          ease: "easeOut"
        }}
        className="flex flex-col items-center"
      >
        <img 
          src="/images/logo.png" 
          alt="ENGEP•WER" 
          className="h-32 w-auto mb-4"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-1 bg-orange-500 rounded-full w-48"
        />
      </motion.div>
    </div>
  </motion.div>
);

// Primeiro, adicione os dados das áreas de atuação
const areasAtuacao = [
  {
    title: "CONSTRUÇÃO",
    items: [
      "Estudos de Viabilidade",
      "Programa-base",
      "Projectos preliminares e executivos",
      "Preparação de documentos de concurso e avaliação de propostas",
      "Fiscalização da construção",
      "Auditoria e controlo de qualidade",
      "Gestão de empreendimentos"
    ],
    image: "https://www.squadrapvc.com.br/img/blog/grande/9096383d22567dd1a505888d438f34ac.webp"
  },
  {
    title: "FUNDAÇÕES E GEOTECNIA",
    items: [
      "Fundações especiais",
      "Contenções e escavações",
      "Movimentos de terras",
      "Planos de sondagens"
    ],
    image: "https://www.fungeo.com.br/wp-content/uploads/2023/08/reforco-de-fundacao.webp"
  },
  {
    title: "HIDRÁULICA",
    items: [
      "Abastecimento de água",
      "Drenagem e saneamento",
      "Sistemas de rega",
      "Estudos hidrológicos",
      "Obras hidráulicas"
    ],
    image: "https://fullconnection.com.br/site/wp-content/uploads/2019/07/manuteno-hidrulica.jpg"
  },
  {
    title: "SEGURANÇA",
    items: [
      "Deteção de incêndios",
      "Intrusão",
      "Segurança passiva contra incêndios",
      "Planos de segurança e saúde"
    ],
    image: "https://www.ravacampos.com.br/imagens/informacoes/sistemas-protecao-incendio-08.jpg"
  },
  {
    title: "VIAS DE COMUNICAÇÃO",
    items: [
      "Projecto de vias",
      "Vias urbanas",
      "Pavimentações",
      "Movimentação de terras"
    ],
    image: "https://www.lucasdorioverde.mt.gov.br/arquivos/noticias/7133/g/pref_lrv.jpg"
  },
  {
    title: "SUSTENTABILIDADE",
    items: [
      "Materiais",
      "Aproveitamento e poupança energética",
      "Disposições construtivas",
      "Construção, desconstrução e demolições"
    ],
    image: "https://2bsupply.com.br/wp-content/uploads/2024/11/construcao-sustentavel.png"
  },
  {
    title: "MEIO AMBIENTE",
    items: [
      "Diagnósticos ambientais",
      "Estudos de Impacto Ambiental",
      "Monitorias Ambientais",
      "Auditorias Ambientais",
      "Processos de Participação Pública"
    ],
    image: "https://atual7.com/wp-content/uploads/2018/05/Ilustra%C3%A7%C3%A3o-para-o-artigo-1.jpg"
  },
  {
    title: "COORDENAÇÃO DE PROJECTOS",
    items: [
      "Estudo de compatibilização de projectos",
      "Gestão de projectos",
      "Revisão de projectos"
    ],
    image: "https://blog.ipog.edu.br/wp-content/uploads/2018/04/gerente-de-projetos.jpg"
  },
  {
    title: "CONSULTORIA E ESTUDOS ESPECIAIS",
    items: [
      "Pareceres relativos à concepção de projecto de estruturas",
      "Pareceres sobre o comportamento, patologia e recuperação de estruturas",
      "Peritagens e pareceres relativos às causas de acidentes e colapsos em edifícios e obras de arte",
      "Avaliação da segurança e reforço de estruturas existentes",
      "Pareceres sobre concursos"
    ],
    image: "https://gppd.com.br/wp-content/uploads/2020/07/png.jpg"
  },
  {
    title: "ENERGIA SOLAR",
    items: [
      "Instalação de sistemas fotovoltaicos",
      "Manutenção preventiva e corretiva",
      "Dimensionamento de sistemas solares",
      "Monitoramento de performance",
      "Consultoria técnica especializada",
      "Upgrade de sistemas existentes",
      "Análise de viabilidade técnica"
    ],
    image: "https://ptsolar.pt/wp-content/uploads/2023/11/inversor_solax.jpg"
  },
  {
    title: "INSTALAÇÕES ELÉTRICAS DE ALTA TENSÃO",
    items: [
      "Instalação de transformadores de potência",
      "Manutenção de subestações",
      "Montagem de postos de transformação",
      "Instalação de sistemas de proteção",
      "Dimensionamento de redes elétricas",
      "Manutenção preventiva e corretiva",
      "Testes e comissionamento"
    ],
    image: "https://eletropedro.com.br/wp-content/uploads/2021/02/WhatsApp-Image-2021-02-22-at-16.31.04-1.jpeg"
  },
  {
    title: "SISTEMAS DE GERAÇÃO DE ENERGIA",
    items: [
      "Instalação de geradores industriais e residenciais",
      "Dimensionamento de grupos geradores",
      "Manutenção preventiva e corretiva",
      "Sistemas de transferência automática",
      "Instalação de quadros de comando",
      "Monitoramento e controle de geradores",
      "Serviços de emergência 24h",
      "Testes de carga e eficiência"
    ],
    image: "https://image.made-in-china.com/2f0j00AhukDCpykibS/gerador-silencioso-de-diesel-de-20-kw-30-kw-40-kw-50-kw-60-kW-com-pequena-pot-ncia-e-garantia-global.webp"
  },
  {
    title: "SISTEMAS DE RASTREAMENTO VEICULAR",
    items: [
      "Instalação de GPS em frotas",
      "Monitoramento em tempo real",
      "Gestão de rotas e logística",
      "Controle de combustível",
      "Relatórios de trajetos",
      "Manutenção preventiva",
      "Bloqueio remoto de veículos",
      "Suporte técnico especializado"
    ],
    image: "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/s/01/032e2fe1-b5bf-4a58-8584-050c250e9d50.jpg"
  }
];

function App() {
  const [currentProject, setCurrentProject] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Region | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 8000); // Alterado de 6000 para 8000ms (8 segundos)
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000); // Aumentado para 3 segundos para mostrar a animação completa
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Criar URLSearchParams para enviar dados como form-urlencoded
      const formBody = new URLSearchParams();
      formBody.append('nome', formData.name);
      formBody.append('email', formData.email);
      formBody.append('mensagem', formData.message);

      const response = await fetch('https://vidplusmz.vercel.app/enviar-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      });

      if (response.ok) {
        // Limpar o formulário após envio bem-sucedido
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setIsFormSubmitted(true); // Set form submitted state to true
      } else {
        throw new Error('Falha ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage.trim();
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);

    setIsChatLoading(true);
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA7JmeO-KmIL2tUmlhI4UXaFr1sUlihY30',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `Você é um assistente da ENGEPOWER, uma empresa de engenharia e construção em Moçambique. 
              Responda a seguinte pergunta de forma profissional: ${userMessage}` }]
            }]
          })
        }
      );

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem.' 
      }]);
    }
    setIsChatLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <AnimatePresence>
        {isInitialLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Header com Menu Mobile */}
      <header className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50">
        <nav className="container mx-auto px-6 h-24">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center space-x-2">
              <img 
                src="/images/logo.png" 
                alt="ENGEP•WER" 
                className="h-20 w-auto"
              />
            </div>
            
            {/* Menu Mobile Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center h-full">
              {[
                { href: "#inicio", label: "Início" },
                { href: "#sobre", label: "Sobre" },
                { href: "#servicos", label: "Serviços" },
                { href: "#projetos", label: "Projetos" },
                { href: "#contato", label: "Contato" }
              ].map((item) => (
                <div key={item.href} className="h-full flex items-center relative group">
                  <a 
                    href={item.href} 
                    className="px-4 py-2 text-gray-700 dark:text-gray-200 group-hover:text-orange-500 transition-colors relative"
                  >
                    {item.label}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                  {/* Card no hover */}
                  <div className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Menu Mais com dropdown */}
              <div 
                className="relative h-full flex items-center group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="h-full flex items-center px-4 text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors">
                  Mais
                  <ChevronRight className={`w-4 h-4 ml-1 transform transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {/* Dropdown Content */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl py-2 z-50"
                  >
                    <a 
                      href="#areas-atuacao" 
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-600 hover:text-orange-500 transition-colors"
                    >
                      Áreas de Atuação
                    </a>
                    <a 
                      href="#experiencia" 
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-600 hover:text-orange-500 transition-colors"
                    >
                      Experiência
                    </a>
                    <a 
                      href="#presenca" 
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-600 hover:text-orange-500 transition-colors"
                    >
                      Nossa Presença
                    </a>
                  </motion.div>
                )}
              </div>

              {/* Botão Dark Mode */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-orange-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 w-64 h-screen bg-white shadow-lg z-50 md:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/images/logo.png" 
                      alt="ENGEP•WER" 
                      className="h-12 w-auto"
                    />
                  </div>
                  <button onClick={() => setIsMenuOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col space-y-4">
                  <a href="#inicio" className="text-gray-700 hover:text-orange-500 transition-colors">Início</a>
                  <a href="#sobre" className="text-gray-700 hover:text-orange-500 transition-colors">Sobre</a>
                  <a href="#servicos" className="text-gray-700 hover:text-orange-500 transition-colors">Serviços</a>
                  <a href="#projetos" className="text-gray-700 hover:text-orange-500 transition-colors">Projetos</a>
                  <a href="#contato" className="text-gray-700 hover:text-orange-500 transition-colors">Contato</a>
                  <a href="#areas-atuacao" className="text-gray-700 hover:text-orange-500 transition-colors">Áreas de Atuação</a>
                  <a href="#experiencia" className="text-gray-700 hover:text-orange-500 transition-colors">Experiência</a>
                  <a href="#presenca" className="text-gray-700 hover:text-orange-500 transition-colors">Nossa Presença</a>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-5 h-5" />
                        <span>Modo Claro</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5" />
                        <span>Modo Escuro</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section with Swiper */}
      <section id="inicio" className="pt-16 md:pt-28">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000 }}
          loop={true}
          className="h-[50vh] sm:h-[60vh] md:h-[80vh]"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img 
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50">
                  <div className="container mx-auto px-4 md:px-6 h-full flex items-center">
                    <div className="text-white max-w-2xl" data-aos="fade-right">
                      <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                      <p className="text-base sm:text-lg md:text-xl mb-8">{slide.subtitle}</p>
                      <button 
                        onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-orange-500 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center space-x-2"
                      >
                        <span>Comece Agora</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">Saiba mais sobre os nossos serviços</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Na EngePOWER, somos especializados em fornecer soluções inovadoras nas áreas de construção e energia.
            Com um compromisso com a sustentabilidade e tecnologia de ponta, fornecemos também serviços de
            alto nível, desde o desenvolvimento de infraestruturas e projetos de energia renovável.
            
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: <Building2 className="w-12 h-12 text-orange-500" />,
                title: "Construção de Edifícios",
                description: "Construção de edifícios residenciais e comerciais com os mais altos padrões de qualidade."
              },
              {
                icon: <MapPin className="w-12 h-12 text-orange-500" />,
                title: "Construção de Pontes",
                description: "Desenvolvimento e construção de pontes com tecnologia avançada e durabilidade garantida."
              },
              {
                icon: <Sun className="w-12 h-12 text-orange-500" />,
                title: "Sistemas Solares de Energia",
                description: "Instalação de sistemas solares para abastecimento de energia sustentável e eficiente."
              },
              {
                icon: <Droplet className="w-12 h-12 text-orange-500" />,
                title: "Sistemas de Abastecimento de Água",
                description: "Construção de sistemas solares para abastecimento de água em diversas escalas."
              },
              {
                icon: <Zap className="w-12 h-12 text-orange-500" />,
                title: "Energia",
                description: "Soluções completas em energia, desde instalação até manutenção de sistemas energéticos."
              },
              {
                icon: <Waves className="w-12 h-12 text-orange-500" />,
                title: "Sistemas Hidráulicos",
                description: "Desenvolvimento e implementação de sistemas hidráulicos eficientes e sustentáveis."
              },
              {
                icon: <Wrench className="w-12 h-12 text-orange-500" />,
                title: "Prestação de Serviços",
                description: "Serviços especializados de manutenção e consultoria em engenharia."
              },
              {
                icon: <Settings className="w-12 h-12 text-orange-500" />,
                title: "Diversos",
                description: "Soluções personalizadas para diferentes necessidades em construção e engenharia."
              }
            ].map((service, index) => (
              <div 
                key={index}
                data-aos="flip-left"
                data-aos-delay={index * 100}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg card-3d group hover:bg-orange-50 transition-colors duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas de Atuação Section */}
      <section id="areas-atuacao" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">Áreas de Atuação</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
              Oferecemos soluções completas e especializadas em diversas áreas da engenharia e construção
            </p>
          </motion.div>
          
          <div className="space-y-12 md:space-y-32">
            {areasAtuacao.map((area, index) => (
              <motion.div
                key={area.title}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-6 md:gap-12 items-center`}
              >
                <motion.div 
                  className="w-full md:w-1/2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={area.image}
                    alt={area.title}
                    className="rounded-lg shadow-xl object-cover h-[250px] md:h-[400px] w-full"
                    initial={{ filter: "grayscale(100%)" }}
                    whileInView={{ filter: "grayscale(0%)" }}
                    transition={{ duration: 1 }}
                  />
                </motion.div>
                <div className="md:w-1/2 space-y-6">
                  <motion.h3 
                    className="text-2xl font-bold text-orange-500"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {area.title}
                  </motion.h3>
                  <motion.ul 
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {area.items.map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 * i }}
                        whileHover={{ x: 10, color: "#f97316" }}
                      >
                        <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 dark:text-gray-300 transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Nossos Projetos</h2>
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2" data-aos="fade-right">
              <img 
                src={projects[currentProject].image}
                alt={projects[currentProject].title}
                className="rounded-lg shadow-2xl w-full h-[250px] md:h-[400px] object-cover"
              />
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{projects[currentProject].title}</h3>
              <p className="text-orange-500 font-semibold mb-4 text-gray-600 dark:text-gray-300">{projects[currentProject].location}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">{projects[currentProject].description}</p>
              <div className="flex space-x-4">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProject(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentProject === index ? 'bg-orange-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Coluna da esquerda - Título */}
            <div className="space-y-6">
              <div>
                <p className="text-orange-500 font-semibold mb-4 text-gray-900 dark:text-white">Quem Somos</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                  Uma Experiência<br />
                  Excepcionalmente<br />
                  Única Sob Medida<br />
                  Para Você
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('areas-atuacao')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-all"
                >
                  Saiba Mais
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all"
                >
                  Contacte-Nos
                </motion.button>
              </div>
            </div>

            {/* Coluna da direita - Cards e Imagem */}
            <div className="space-y-6 mt-8 lg:mt-0">
              <div className="grid grid-cols-1 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Com Vasta Experiência na área de:</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Construção e Manutenção de Estradas asfaltadas, Terraplanadas e Pavês
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Inclusive Estruturas de Grande Engenharia como:</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Pontes de Betão armado, Lançamento de Pontes metálicas e Aqueodutos de várias dimensões
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative lg:block hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Equipe de Engenharia"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Chatbot Section */}
      <section id="presenca" className="pt-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Nossa Presença em Moçambique</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-xl overflow-hidden shadow-xl h-[300px] md:h-[400px]">
              <LoadScript googleMapsApiKey="AIzaSyCh39n5U-4IoWpsVGUHWdqB6puEkhRLdmI">
                <GoogleMap
                  mapContainerStyle={{
                    width: '100%',
                    height: '100%'
                  }}
                  center={center}
                  zoom={6}
                >
                  {mozambiqueRegions.map((region, index) => (
                    <Marker
                      key={index}
                      position={{
                        lat: region.coordinates.lat,
                        lng: region.coordinates.lng
                      }}
                      onClick={() => setSelectedMarker(region)}
                    />
                  ))}
                  {selectedMarker && (
                    <InfoWindow
                      position={{
                        lat: selectedMarker.coordinates.lat,
                        lng: selectedMarker.coordinates.lng
                      }}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{selectedMarker.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{selectedMarker.projects} Projetos</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 flex flex-col h-[400px]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Chat ENGEP•WER</h3>
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto mb-4 space-y-4"
              >
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                      Digitando...
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section - Movida para depois do mapa/chatbot */}
      <section id="sobre" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sobre a ENGEPOWER</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              é uma sociedade individual com um alvará da 4ª Classe com um capital de 
5,000,000.00 (Cinco Milhões de Meticais), sediada na cidade de Lichinga e 
representações no Centro e Norte de Moçambique, cuja atividade baseia-se na particular especialização dos seus sócios e colaboradores chave nas 
áreas de estruturas de engenharia civil, tecnologias e gestão de processos 
de construção, fundações e obras enterradas, geotecnia e vias de 
comunicação, meio ambiente, recursos hídricos, eletricidade e tecnologias 
de informação e comunicação, mecânica e energia. 
O domínio de atividades e o âmbito de intervenções da empresa inclui 
todas as áreas relacionadas com os projetos de especialidade, 
coordenação de projetos e assistência técnica, e com estudos e peritagem 
de consultoria.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">30+</div>
                  <div className="text-gray-600 dark:text-gray-300">Projetos Concluídos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">5+</div>
                  <div className="text-gray-600 dark:text-gray-300">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">11+</div>
                  <div className="text-gray-600 dark:text-gray-300">Profissionais</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">1</div>
                  <div className="text-gray-600 dark:text-gray-300">Escritórios</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Equipe ENGEP•WER"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-lg shadow-xl">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Compromisso com a Qualidade</p>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">E garantida</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section with Form */}
      <section id="contato" className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Entre em Contato</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div data-aos="fade-right">
                {isFormSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-green-500 text-white p-6 rounded-lg text-center"
                  >
                    <h3 className="text-2xl font-bold mb-4">Obrigado!</h3>
                    <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensagem</label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center space-x-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                      ) : (
                        <>
                          <span>Enviar Mensagem</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
              <div data-aos="fade-left" className="flex flex-col justify-center">
                <div className="bg-orange-500 text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Informações de Contato</h3>
                  <div className="space-y-4">
                    <p className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <Phone className="w-5 h-5" />
                      <span>+258 866 414 240</span>
                    </p>
                    <p className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <span>+258 842 390 139 (WhatsApp)</span>
                    </p>
                    <p className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <Mail className="w-5 h-5 flex-shrink-0" />
                      <span className="break-all">alygulamo@enge-power.com</span>
                    </p>
                    <p className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-5 h-5" />
                      <span>Niassa, Moçambique</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Social Media */}
      <footer className="bg-gray-900 text-white py-12 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Coluna 1 - Logo e Descrição */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src="./images/logo.png" 
                  alt="ENGEPOWER" 
                  className="h-20 w-auto"
                />
              </div>
              <p className="text-gray-400 dark:text-gray-400">Excelência em Construção e Engenharia</p>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-400 dark:text-gray-400">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#inicio" className="text-gray-400 dark:text-gray-400 hover:text-orange-500">Início</a></li>
                <li><a href="#servicos" className="text-gray-400 dark:text-gray-400 hover:text-orange-500">Serviços</a></li>
                <li><a href="#projetos" className="text-gray-400 dark:text-gray-400 hover:text-orange-500">Projetos</a></li>
                <li><a href="#contato" className="text-gray-400 dark:text-gray-400 hover:text-orange-500">Contato</a></li>
              </ul>
            </div>

            {/* Coluna 3 - Contatos */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-400 dark:text-gray-400">Contatos</h4>
              <div className="space-y-3">
                <p className="flex items-center space-x-3 text-gray-400 dark:text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span>+258 866 414 240</span>
                </p>
                <p className="flex items-center space-x-3 text-gray-400 dark:text-gray-400">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <span>+258 842 390 139 (WhatsApp)</span>
                </p>
                <p className="flex items-center space-x-3 text-gray-400 dark:text-gray-400">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="break-all">alygulamo@enge-power.com</span>
                </p>
                <p className="flex items-center space-x-3 text-gray-400 dark:text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>Niassa, Moçambique</span>
                </p>
                <div className="flex space-x-4 pt-4">
                  <a href="#" className="text-gray-400 dark:text-gray-400 hover:text-orange-500 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 dark:text-gray-400 hover:text-orange-500 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 dark:text-gray-400 hover:text-orange-500 transition-colors">
                    <LinkedIn className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Coluna 4 - Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-400 dark:text-gray-400">Newsletter</h4>
              <p className="text-gray-400 dark:text-gray-400 mb-4">Inscreva-se para receber nossas novidades</p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
                >
                  Inscrever-se
                </motion.button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 dark:text-gray-400">© 2025 ENGEPOWER. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/258842390139?text=${encodeURIComponent(
          "Olá! Gostaria de saber mais sobre os serviços da ENGEPOWER. Podem me ajudar?"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20ba57] z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <svg 
          viewBox="0 0 32 32" 
          className="w-6 h-6 fill-current"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2zm7.34 19.42c-.35.98-1.76 1.8-2.44 1.89-.62.09-1.43.16-4.06-.85-3.37-1.3-5.54-4.68-5.71-4.9-.16-.21-1.35-1.81-1.35-3.45 0-1.65.86-2.45 1.21-2.79.29-.29.77-.42 1.23-.42.15 0 .28.01.4.02.35.02.53.04.76.57.29.67.98 2.34 1.07 2.51.09.17.16.38.03.59-.13.21-.19.2-.4.42-.38.36-.61.58c-.19.2-.4.42-.17.79.23.37 1.04 1.6 2.24 2.59 1.54 1.26 2.83 1.65 3.23 1.84.3.14.66.11.88-.14.28-.31.63-.82.98-1.33.25-.36.34.13 2.13 1.02 2.51 1.2.37.18.62.27.71.42.09.15.09.88-.26 1.85z"/>
        </svg>
      </motion.a>
    </div>
  );
}

export default App;
