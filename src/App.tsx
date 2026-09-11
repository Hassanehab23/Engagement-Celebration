import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import confetti from 'canvas-confetti';
import { Heart, Music, VolumeX, MapPin, Calendar as CalendarIcon, Image as ImageIcon, Sparkles, Send, Stars, MessageCircleHeart, Shirt } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Wish {
  name: string;
  message: string;
  date: string;
}

// Styled Dynamic Components based on Guest Side
const HeroSection = styled.div<{ isBride: boolean }>`
  background: linear-gradient(rgba(45, 10, 25, 0.75), rgba(30, 10, 20, 0.8)), 
              url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  border-bottom: 6px solid ${props => props.isBride ? '#ffb6c1' : '#2b2b2b'};
`;

const BackgroundWatermarkText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15vw;
  font-weight: 900;
  font-family: 'Playfair Display', serif;
  color: rgba(255, 255, 255, 0.03);
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  text-transform: uppercase;
  letter-spacing: 20px;
`;

const GoldText = styled.span<{ isBride: boolean }>`
  color: ${props => props.isBride ? '#f3c6df' : '#d4af37'};
  font-weight: 700;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 10px ${props => props.isBride ? 'rgba(243, 198, 223, 0.3)' : 'rgba(212, 175, 55, 0.4)'};
`;

const GlassCard = styled.div`
  background: rgba(255, 240, 245, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(243, 198, 223, 0.35);
  box-shadow: 0 25px 50px rgba(70, 15, 35, 0.3);
`;

const LuxuryGoldCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 24px;
  position: relative;
  box-shadow: 0 20px 40px rgba(212, 175, 55, 0.12), 0 10px 20px rgba(70, 15, 35, 0.08);
  border: 2px solid transparent;
  background-image: linear-gradient(white, white), 
                    linear-gradient(135deg, #d4af37 0%, #fff0f5 50%, #d4af37 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(212, 175, 55, 0.25), 0 15px 25px rgba(70, 15, 35, 0.12);
  }
`;

// مكون متطور للظهور بسلاسة عند التمرير (Scroll Reveal)
interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className = "", direction = 'up', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.15 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getDirectionClasses = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'opacity-0 translate-y-16';
        case 'down': return 'opacity-0 -translate-y-16';
        case 'left': return 'opacity-0 translate-x-16';
        case 'right': return 'opacity-0 -translate-x-16';
        case 'scale': return 'opacity-0 scale-90';
        default: return 'opacity-0 translate-y-16';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${getDirectionClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default function App(): React.JSX.Element {
  // استرجاع حالة الفتح واختيار الجانب من الـ localStorage لمنع اختفائها عند الـ Refresh
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    return localStorage.getItem('wedding_is_open_mohamed_nada') === 'true';
  });

  const [guestSide, setGuestSide] = useState<'groom' | 'bride' | null>(() => {
    const savedSide = localStorage.getItem('wedding_guest_side_mohamed_nada');
    return (savedSide === 'groom' || savedSide === 'bride') ? savedSide : null;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null);
  
  const [wishName, setWishName] = useState<string>('');
  const [wishMessage, setWishMessage] = useState<string>('');
  
  // التهاني المحفوظة محلياً عبر LocalStorage
  const [wishes, setWishes] = useState<Wish[]>(() => {
    const savedWishes = localStorage.getItem('wedding_wishes_mohamed_nada');
    if (savedWishes) {
      try {
        return JSON.parse(savedWishes);
      } catch (e) {
        console.error("Error parsing saved wishes", e);
      }
    }
    return [
    ];
  });

  useEffect(() => {
    localStorage.setItem('wedding_wishes_mohamed_nada', JSON.stringify(wishes));
  }, [wishes]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const targetDate = new Date('2026-09-30T19:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isBride = guestSide === 'bride';

  // استخدم روابط بصيغة mp3 مباشرة لكي يعمل عنصر audio بنجاح
  const groomAudioUrl = "/Hollela.mp3"; 
  const brideAudioUrl = "/El Leila.mp3";

  const theme = isBride ? {
    bgMain: '#fff8fa',
    bgSection: '#fff5f8',
    primaryColor: '#d87093',
    accentPink: '#ffb6c1',
    cardBg: '#fff0f5',
    textDark: '#501525',
  } : {
    bgMain: '#f9f9fb',
    bgSection: '#f2f2f5',
    primaryColor: '#2b2b2b',
    accentPink: '#d4af37',
    cardBg: '#ffffff',
    textDark: '#1a1a1a',
  };

  const handleSelectSide = (side: 'groom' | 'bride'): void => {
    setGuestSide(side);
    setIsOpen(true);
    
    // تخزين الاختيار في الذاكرة المحلية
    localStorage.setItem('wedding_guest_side_mohamed_nada', side);
    localStorage.setItem('wedding_is_open_mohamed_nada', 'true');
    
    // تشغيل الأغنية المخصصة فوراً بعد تغيير المصدر
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err: unknown) => console.log("Audio autoplay restricted", err));
      }
    }, 150);

    confetti({
      particleCount: 200,
      spread: 110,
      origin: { y: 0.6 },
      colors: side === 'bride' ? ['#ffb6c1', '#d4af37', '#ffffff', '#ff69b4', '#fff0f5'] : ['#2b2b2b', '#d4af37', '#ffffff', '#708090']
    });
  };

  // زر تغيير الجانب لإعادة ضبط الحالة وحذف الـ localStorage
  const handleSwitchSide = () => {
    setIsOpen(false);
    setGuestSide(null);
    localStorage.removeItem('wedding_guest_side_mohamed_nada');
    localStorage.setItem('wedding_is_open_mohamed_nada', 'false');
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err: unknown) => console.log("Audio play error", err));
      }
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    
    const groomPhoneNumber = "201149605489";
    const bridePhoneNumber = "201286993480";

    const targetPhoneNumber = isBride ? bridePhoneNumber : groomPhoneNumber;
    const sideText = isBride ? "Bride's Side" : "Groom's Side";

    const message = encodeURIComponent(`Hello! I am ${guestName} (${sideText}), and I am delighted to confirm my attendance at Mohamed & Nada's engagement party! 💍✨`);
    
    setRsvpStatus(`Thank you, ${guestName}! Redirecting to WhatsApp to confirm your attendance...`);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.8 }, colors: isBride ? ['#ffb6c1', '#d4af37'] : ['#2b2b2b', '#d4af37'] });

    setTimeout(() => {
      window.open(`https://wa.me/${targetPhoneNumber}?text=${message}`, '_blank');
    }, 1500);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) return;
    
    const newWish: Wish = {
      name: wishName,
      message: wishMessage,
      date: "Just now"
    };

    setWishes([newWish, ...wishes]);
    setWishName('');
    setWishMessage('');
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.7 }, colors: isBride ? ['#ff69b4', '#d4af37'] : ['#2b2b2b', '#d4af37'] });
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Mohamed & Nada's Engagement")}&dates=20260930T190000Z/20260930T230000Z&details=${encodeURIComponent("Join us to celebrate the engagement of Mohamed & Nada at Nile Hall, Nile Corniche, Imbaba, Giza.")}&location=${encodeURIComponent("Nile Hall, Nile Corniche, Imbaba, Giza")}`;
  const galleryItems = [
    { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", caption: "Where our hearts connected..." },
    { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", caption: "Precious Childhood Memories" },
    { url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80", caption: "Growing up together in love" },
    { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", caption: "Our Forever Chapter" }
  ];
  return (
    <div className="min-h-screen font-sans transition-colors duration-500" style={{ backgroundColor: theme.bgMain, color: theme.textDark }}>
      {/* عنصر الصوت الديناميكي الذي يغير الأغنية حسب اختيار العريس أو العروس */}
      <audio 
        ref={audioRef} 
        loop 
        src={isBride ? brideAudioUrl : groomAudioUrl} 
      />

      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center">
          <GlassCard className="p-10 rounded-3xl max-w-lg w-full border-[#ffb6c1]/40 animate-fade-in">
            <Sparkles className="w-12 h-12 text-[#ffb6c1] mx-auto mb-5 animate-bounce" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#ffb6c1] font-semibold block mb-2">The Engagement Celebration</span>
            <h2 className="text-3xl font-serif text-white mb-3">Mohamed & Nada</h2>
            <p className="text-gray-200 text-sm mb-8 leading-relaxed italic">
              "Two souls with but a single thought, two hearts that beat as one."
            </p>
            
            <p className="text-xs uppercase tracking-widest text-pink-200 mb-4 font-medium">Which side of the family are you joining us from?</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSelectSide('groom')}
                className="py-4 px-4 bg-linear-to-r from-gray-800 to-gray-950 text-white font-bold rounded-2xl shadow-xl hover:opacity-95 transition transform hover:scale-105 cursor-pointer text-sm uppercase border border-amber-500/30 flex flex-col items-center justify-center gap-1"
              >
                <span>Groom's Side 🤵</span>
                <span className="text-[10px] text-amber-400 font-normal lowercase tracking-normal">🎵 Classic Melody</span>
              </button>
              <button
                onClick={() => handleSelectSide('bride')}
                className="py-4 px-4 bg-linear-to-r from-pink-300 to-pink-200 text-gray-950 font-bold rounded-2xl shadow-xl hover:opacity-95 transition transform hover:scale-105 cursor-pointer text-sm uppercase flex flex-col items-center justify-center gap-1"
              >
                <span>Bride's Side 👰</span>
                <span className="text-[10px] text-pink-700 font-normal lowercase tracking-normal">🎶 Uplifting Melody</span>
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {isOpen && (
        <button 
          onClick={toggleMusic}
          className="fixed bottom-6 left-6 z-45 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 border border-white/40"
          style={{ backgroundColor: isBride ? '#ffb6c1' : '#2b2b2b', color: isBride ? '#000' : '#d4af37' }}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? <Music className="w-6 h-6 animate-spin" /> : <VolumeX className="w-6 h-6" />}
        </button>
      )}

      {isOpen && (
        <button 
          onClick={handleSwitchSide}
          className="fixed top-6 right-6 z-45 px-4 py-2 rounded-full shadow-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md cursor-pointer border border-white/20 transition hover:opacity-80"
          style={{ backgroundColor: isBride ? 'rgba(216, 112, 147, 0.8)' : 'rgba(43, 43, 43, 0.8)', color: '#fff' }}
        >
          Switch Side
        </button>
      )}

      <HeroSection isBride={isBride}>
        <BackgroundWatermarkText>FOREVER</BackgroundWatermarkText>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-[0.3em]">
            <Stars className="w-4 h-4 text-amber-300" /> Save The Date ({isBride ? "Bride's Invitation" : "Groom's Invitation"})
          </div>
          <h1 className="text-6xl md:text-8xl font-serif tracking-wide text-white">
            <GoldText isBride={isBride}>Mohamed</GoldText> <span className="text-white/60 font-light">&</span> <GoldText isBride={isBride}>Nada</GoldText>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed italic">
            "With great joy and love, we invite you to celebrate our engagement."
          </p>

          <div className="pt-4">
            <div className="bg-white/10 backdrop-blur-md px-8 py-3.5 rounded-full border border-white/30 inline-block text-sm md:text-base text-white shadow-2xl">
              💍 Wednesday, September 30, 2026 💍
            </div>
          </div>

          <div className="w-full max-w-xl mx-auto bg-[#1a1412] border border-white/20 rounded-3xl p-6 shadow-2xl">
            <div className="text-center tracking-[0.3em] uppercase text-sm font-serif text-amber-200 mb-5 font-semibold">
              S E P T E M B E R &nbsp;&nbsp;&nbsp; 2 0 2 6
            </div>

            <div className="grid grid-cols-7 text-center gap-1">
              {[
                { dayName: 'SUN', date: 27 },
                { dayName: 'MON', date: 28 },
                { dayName: 'TUE', date: 29 },
                { dayName: 'WED', date: 30, isHighlight: true },
                { dayName: 'THU', date: 1 },
                { dayName: 'FRI', date: 2 },
                { dayName: 'SAT', date: 3 },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center relative">
                  <span className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2 font-medium">
                    {item.dayName}
                  </span>
                  
                  {item.isHighlight ? (
                    <div className="relative flex items-center justify-center my-1">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-pink-400 flex items-center justify-center bg-pink-500/20 text-white font-bold text-base md:text-lg shadow-lg animate-pulse">
                        {item.date}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm md:text-base text-white/90 font-light my-2">
                      {item.date}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 text-center font-serif italic text-pink-300 text-lg tracking-wider">
              Save the Date
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Countdown Section */}
      <FadeInSection direction="up">
        <section className="py-20 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <FadeInSection direction="down">
              <span className="uppercase text-xs tracking-[0.3em] font-bold block mb-2" style={{ color: isBride ? '#d87093' : '#d4af37' }}>Counting Down To Forever</span>
              <h3 className="text-4xl font-serif mb-12 text-gray-900">The Magic Begins In</h3>
            </FadeInSection>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => {
                const val = timeLeft[unit as keyof TimeLeft];
                return (
                  <FadeInSection key={idx} direction="scale" delay={idx * 150}>
                    <div className="p-8 rounded-3xl shadow-sm hover:shadow-md transition border" style={{ backgroundColor: theme.cardBg, borderColor: isBride ? 'rgba(255,182,193,0.4)' : 'rgba(212,175,55,0.3)' }}>
                      <span className="text-5xl font-serif font-bold block mb-1" style={{ color: isBride ? '#d87093' : '#1a1a1a' }}>{val}</span>
                      <span className="text-gray-500 uppercase text-xs tracking-widest font-medium">{unit}</span>
                    </div>
                  </FadeInSection>
                );
              })}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Event Details & Venue */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: theme.bgSection }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          
          <FadeInSection direction="right" delay={100}>
            <LuxuryGoldCard className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-6" style={{ color: isBride ? '#d87093' : '#d4af37' }}>
                  <CalendarIcon className="w-8 h-8" />
                  <h4 className="text-2xl font-serif text-gray-900">Event Time</h4>
                </div>
                <div className="space-y-3 mb-6">
                  <p className="text-base text-gray-700">
                    <span className="font-semibold text-gray-900 block">Day:</span> Wednesday, Sep 30, 2026
                  </p>
                  <p className="text-base text-gray-700">
                    <span className="font-semibold text-gray-900 block">Time:</span> 7:00 PM Onwards
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-white font-bold rounded-2xl text-center shadow-md transition block tracking-wide uppercase text-xs"
                  style={{ backgroundColor: isBride ? '#d87093' : '#d4af37' }}
                >
                  📅 Add to Google Calendar
                </a>
                <div className="p-3 rounded-2xl text-center text-xs font-semibold border" style={{ backgroundColor: theme.cardBg, color: isBride ? '#d87093' : '#d4af37', borderColor: isBride ? 'rgba(255,182,193,0.3)' : 'rgba(212,175,55,0.3)' }}>
                  Your presence completes our happiness.
                </div>
              </div>
            </LuxuryGoldCard>
          </FadeInSection>

          <FadeInSection direction="up" delay={200}>
            <LuxuryGoldCard className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-serif font-bold text-gray-900">September 2026</h4>
                  <span className="text-xs uppercase px-3 py-1 rounded-full font-bold border" style={{ backgroundColor: theme.cardBg, color: isBride ? '#d87093' : '#d4af37', borderColor: isBride ? 'rgba(255,182,193,0.3)' : 'rgba(212,175,55,0.3)' }}>Save The Date</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2 font-semibold">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm items-center">
                  {Array.from({ length: 30 }, (_, i) => {
                    const dayNum = i + 1;
                    const isSpecialDay = dayNum === 30;
                    return (
                      <div key={i} className={`py-2 transition flex items-center justify-center ${isSpecialDay ? 'font-bold scale-110' : 'text-gray-700'}`}>
                        {isSpecialDay ? (
                          <div className="relative flex items-center justify-center w-9 h-9">
                            <Heart className="w-9 h-9 fill-current animate-pulse" style={{ color: isBride ? '#d87093' : '#d4af37' }} />
                            <span className="absolute text-xs text-white font-bold z-10">{dayNum}</span>
                          </div>
                        ) : (
                          dayNum
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">Mark your calendar for September 30</p>
            </LuxuryGoldCard>
          </FadeInSection>

          <FadeInSection direction="left" delay={300}>
            <LuxuryGoldCard className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-6" style={{ color: isBride ? '#d87093' : '#d4af37' }}>
                  <MapPin className="w-8 h-8" />
                  <h4 className="text-2xl font-serif text-gray-900">The Venue</h4>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-xl font-serif font-bold text-gray-900">Nile Hall</p>
                  <p className="text-gray-600 text-sm">Nile Corniche, Imbaba, Giza</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Nile+Corniche+Imbaba+Giza"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 text-white font-bold rounded-2xl text-center shadow-lg transition block tracking-wide uppercase text-xs"
                style={{ backgroundColor: isBride ? '#d87093' : '#2b2b2b' }}
              >
                📍 Open Google Maps
              </a>
            </LuxuryGoldCard>
          </FadeInSection>

        </div>
      </section>

      {/* Dress Code Section */}
      <FadeInSection direction="up">
        <section className="py-20 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-2" style={{ color: isBride ? '#d87093' : '#d4af37' }}>
              <Shirt className="w-7 h-7" />
              <h3 className="text-3xl font-serif text-gray-900">Dress Code Palette</h3>
            </div>
            <p className="text-gray-500 mb-10 text-sm">We kindly request our guests to dress in harmony with our celebration palette.</p>

            <div className="grid md:grid-cols-2 gap-8">
              <FadeInSection direction="right">
                <div className="bg-linear-to-b from-gray-900 to-gray-950 text-white p-8 rounded-3xl border border-gray-800 shadow-md relative overflow-hidden text-center h-full">
                  <div className="absolute top-0 right-0 bg-gray-800 text-gray-200 text-[10px] tracking-widest px-4 py-1 rounded-bl-xl uppercase font-bold">Gentlemen</div>
                  <h4 className="font-serif font-bold text-2xl text-gray-100 mb-2">Black Gradient Suite</h4>
                  <p className="text-gray-300 text-sm mb-6 font-medium">Shades of Black & Charcoal</p>
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="text-center"><span className="w-10 h-10 rounded-full bg-black shadow-lg border-2 border-gray-700 block mx-auto mb-1"></span><span className="text-[11px] text-gray-400">Black</span></div>
                    <div className="text-center"><span className="w-10 h-10 rounded-full bg-[#222222] shadow-lg border-2 border-gray-700 block mx-auto mb-1"></span><span className="text-[11px] text-gray-400">Dark Charcoal</span></div>
                    <div className="text-center"><span className="w-10 h-10 rounded-full bg-[#444444] shadow-lg border-2 border-gray-700 block mx-auto mb-1"></span><span className="text-[11px] text-gray-400">Charcoal</span></div>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection direction="left">
                <div className="bg-linear-to-b from-[#fff0f5] to-white p-8 rounded-3xl border border-[#ffb6c1]/50 shadow-md relative overflow-hidden text-center h-full">
                  <div className="absolute top-0 right-0 bg-[#800020] text-white text-[10px] tracking-widest px-4 py-1 rounded-bl-xl uppercase font-bold">Ladies</div>
                  <h4 className="font-serif font-bold text-2xl text-[#800020] mb-2">Burgundy Gradient Palette</h4>
                  <p className="text-gray-600 text-sm mb-6 font-medium">Shades of Burgundy & Deep Rose</p>
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="text-center"><span className="w-10 h-10 rounded-full bg-[#58111A] shadow-lg border-2 border-white block mx-auto mb-1"></span><span className="text-[11px] text-gray-500">Deep Burgundy</span></div>
                    <div className="text-center"><span className="w-10 h-10 rounded-full bg-[#800020] shadow-lg border-2 border-white block mx-auto mb-1"></span><span className="text-[11px] text-gray-500">Burgundy</span></div>
                    <div className="text-center"><span className="w-10 h-10 rounded-full bg-[#A52A2A] shadow-lg border-2 border-white block mx-auto mb-1"></span><span className="text-[11px] text-gray-500">Rose Wine</span></div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* RSVP Section */}
      <FadeInSection direction="up">
        <section className="py-20 text-center" style={{ backgroundColor: theme.bgMain }}>
          <div className="max-w-xl mx-auto px-4">
            <span className="uppercase text-xs tracking-[0.3em] font-bold block mb-2" style={{ color: isBride ? '#d87093' : '#d4af37' }}>Be Our Guest</span>
            <h3 className="text-3xl font-serif mb-4 text-gray-900">Confirm Your Attendance</h3>
            
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold border" style={{ backgroundColor: theme.cardBg, color: isBride ? '#d87093' : '#d4af37', borderColor: isBride ? '#ffb6c1' : '#d4af37' }}>
              {isBride ? "The invitation is for: The Bride's side 👰" : "The invitation is for: The Groom's side 🤵"}
            </div>

            <p className="text-gray-500 mb-8 text-sm">Enter your name and confirm via WhatsApp to notify the correct side directly.</p>
            
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Your Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border focus:outline-none text-center text-lg bg-white shadow-sm"
                style={{ borderColor: isBride ? '#ffb6c1' : '#d4af37' }}
                required
              />
              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer uppercase text-xs tracking-widest"
              >
                <Send className="w-4 h-4" /> Confirm via WhatsApp
              </button>
            </form>

            {rsvpStatus && (
              <div className="mt-6 p-4 rounded-2xl border text-sm font-semibold animate-fade-in" style={{ backgroundColor: theme.cardBg, color: isBride ? '#d87093' : '#333' }}>
                {rsvpStatus}
              </div>
            )}
          </div>
        </section>
      </FadeInSection>

      {/* Wishes Section */}
      <FadeInSection direction="up">
        <section className="py-20" style={{ backgroundColor: theme.bgSection }}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-2" style={{ color: isBride ? '#d87093' : '#d4af37' }}>
                <MessageCircleHeart className="w-8 h-8" />
                <h3 className="text-3xl font-serif text-gray-900">Send Your Wishes</h3>
              </div>
              <p className="text-gray-500 text-sm">Leave a loving note or a congratulatory message for Mohamed & Nada.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border mb-10" style={{ borderColor: isBride ? 'rgba(255,182,193,0.3)' : 'rgba(212,175,55,0.3)' }}>
              <form onSubmit={handleWishSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl border focus:outline-none bg-white text-gray-900"
                  style={{ borderColor: isBride ? '#ffb6c1' : '#d4af37' }}
                  required
                />
                <textarea
                  placeholder="Write your heartfelt wish here..."
                  rows={3}
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl border focus:outline-none bg-white text-gray-900"
                  style={{ borderColor: isBride ? '#ffb6c1' : '#d4af37' }}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3.5 text-white font-bold rounded-2xl shadow-md transition uppercase text-xs tracking-widest cursor-pointer"
                  style={{ backgroundColor: isBride ? '#d87093' : '#2b2b2b' }}
                >
                  Send Wish ✨
                </button>
              </form>
            </div>




<div className="grid gap-4">
              {wishes.length === 0 ? (
                <p className="text-center text-gray-400 py-6 text-sm">كن أول من يترك تهنئة للعروسين! ✨</p>
              ) : (
                wishes.map((wish, index) => (
                  <FadeInSection key={index} direction="up" delay={index * 50}>
                    <div className="bg-white p-6 rounded-2xl shadow-md border" style={{ borderColor: isBride ? 'rgba(255,182,193,0.3)' : 'rgba(212,175,55,0.3)' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-serif font-bold text-gray-900 text-lg">{wish.name}</span>
                        <span className="text-xs text-gray-400">{wish.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{wish.message}</p>
                    </div>
                  </FadeInSection>
                ))
              )}
            </div>












          </div>
        </section>
      </FadeInSection>


      {/* Gallery */}
      <FadeInSection direction="up">
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2" style={{ color: isBride ? '#d87093' : '#d4af37' }}>
              <ImageIcon className="w-6 h-6" />
              <h3 className="text-4xl font-serif text-gray-900">Our Story in Pictures</h3>
            </div>
            <p className="text-gray-500 mb-12">Sweet childhood memories and wonderful moments leading to forever.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {galleryItems.map((item, index) => (
                <FadeInSection key={index} direction="scale" delay={index * 100}>
                  <div className="p-3 rounded-3xl shadow-xl border group overflow-hidden h-full flex flex-col justify-between" style={{ backgroundColor: theme.cardBg, borderColor: isBride ? 'rgba(255,182,193,0.3)' : 'rgba(212,175,55,0.3)' }}>
                    <div className="overflow-hidden rounded-2xl mb-3">
                      <img src={item.url} alt={item.caption} className="w-full h-64 object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                    <p className="text-gray-700 font-serif text-sm pb-2 font-medium">{item.caption}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

<footer className="py-6 text-center border-t transition-colors duration-500" style={{ backgroundColor: isBride ? '#fff0f5' : '#121212', borderColor: isBride ? 'rgba(216, 112, 147, 0.2)' : 'rgba(212, 175, 55, 0.2)', color: isBride ? '#501525' : '#ffffff' }}>
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center space-y-6">
          
          {/* أيقونات جمالية متناسقة */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12" style={{ backgroundColor: isBride ? '#d87093' : '#d4af37' }}></span>
            <div className="p-3 rounded-full shadow-md border" style={{ backgroundColor: isBride ? '#ffffff' : '#1a1a1a', borderColor: isBride ? 'rgba(216, 112, 147, 0.3)' : 'rgba(212, 175, 55, 0.3)' }}>
              <Heart className="w-5 h-5 fill-current animate-pulse" style={{ color: isBride ? '#d87093' : '#d4af37' }} />
            </div>
            <span className="h-px w-12" style={{ backgroundColor: isBride ? '#d87093' : '#d4af37' }}></span>
          </div>

          {/* أسماء العروسين بتصميم فاخر */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-2" style={{ color: isBride ? '#501525' : '#ffffff' }}>
              <span style={{ color: isBride ? '#d87093' : '#d4af37' }}>Mohamed</span> & <span style={{ color: isBride ? '#d87093' : '#d4af37' }}>Nada</span>
            </h2>
          </div>

          {/* رسالة ختامية دافئة */}
          <p className="text-sm italic font-light max-w-md mx-auto leading-relaxed opacity-90">
            "We can't wait to share this magical night and create unforgettable memories with the people we love most."
          </p>
        </div>
      </footer>
    </div>
  );
}