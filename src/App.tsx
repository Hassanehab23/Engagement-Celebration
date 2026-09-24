import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import confetti from 'canvas-confetti';
import img1 from "./assets/Images/4.jpg"
import img2 from "./assets/Images/3.jpeg"
import img3 from "./assets/Images/2.jpeg"
import img4 from "./assets/Images/1.jpeg"
import AutoScroll from './Components/AutoScroll';
import {
  Heart,
  Music,
  VolumeX,
  MapPin,
  Calendar as CalendarIcon,
  Image as ImageIcon,
  Sparkles,
  Send,
  Stars,
  MessageCircleHeart,
  Shirt,
} from 'lucide-react';

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

const autoScrollSectionIds = [
  'hero',
  'countdown',
  'invitation',
  'location',
  'story-timeline',
  'rsvp',
  'wishes-wall',
  'gallery',
  'footer',
];

const HeroSection = styled.div<{ isBride: boolean }>`
  background:
    linear-gradient(
      rgba(45, 10, 25, 0.75),
      rgba(30, 10, 20, 0.8)
    ),
    url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80')
      center / cover no-repeat;

  min-height: 100svh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: white;
  text-align: center;

  padding: 80px 16px 40px;

  position: relative;
  overflow: hidden;

  border-bottom: 6px solid
    ${props => (props.isBride ? '#ffb6c1' : '#2b2b2b')};

  @media (min-width: 640px) {
    padding: 80px 24px 50px;
  }

  @media (min-width: 1024px) {
    padding: 60px 32px;
  }
`;

const BackgroundWatermarkText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  font-size: clamp(70px, 15vw, 220px);
  font-weight: 900;

  font-family: 'Playfair Display', serif;

  color: rgba(255, 255, 255, 0.03);

  white-space: nowrap;
  pointer-events: none;

  z-index: 0;

  text-transform: uppercase;

  letter-spacing: clamp(5px, 2vw, 20px);
`;

const GoldText = styled.span<{ isBride: boolean }>`
  color: ${props => (props.isBride ? '#f3c6df' : '#d4af37')};

  font-weight: 700;

  font-family: 'Playfair Display', serif;

  text-shadow:
    0 2px 10px
      ${props =>
    props.isBride
      ? 'rgba(243, 198, 223, 0.3)'
      : 'rgba(212, 175, 55, 0.4)'};
`;

const GlassCard = styled.div`
  background: rgba(255, 240, 245, 0.08);

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(243, 198, 223, 0.35);

  box-shadow: 0 25px 50px rgba(70, 15, 35, 0.3);
`;

const LuxuryGoldCard = styled.div`
  width: 100%;

  background: white;

  padding: clamp(20px, 4vw, 32px);

  border-radius: 24px;

  position: relative;

  box-shadow:
    0 20px 40px rgba(212, 175, 55, 0.12),
    0 10px 20px rgba(70, 15, 35, 0.08);

  border: 2px solid transparent;

  background-image:
    linear-gradient(white, white),
    linear-gradient(
      135deg,
      #d4af37 0%,
      #fff0f5 50%,
      #d4af37 100%
    );

  background-origin: border-box;
  background-clip: padding-box, border-box;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);

    box-shadow:
      0 25px 50px rgba(212, 175, 55, 0.25),
      0 15px 25px rgba(70, 15, 35, 0.12);
  }
`;

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

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
        case 'up':
          return 'opacity-0 translate-y-16';

        case 'down':
          return 'opacity-0 -translate-y-16';

        case 'left':
          return 'opacity-0 translate-x-16';

        case 'right':
          return 'opacity-0 -translate-x-16';

        case 'scale':
          return 'opacity-0 scale-90';

        default:
          return 'opacity-0 translate-y-16';
      }
    }

    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-1000 transform ${getDirectionClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default function App(): React.JSX.Element {
  // اخليهم يفتحوا على وضع عدم الاختيار إطلاقاً في كل مرة
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [guestSide, setGuestSide] = useState<'groom' | 'bride' | null>(null);
  const [isPlaying, setIsPlaying] =
    useState<boolean>(false);

  const [guestName, setGuestName] =
    useState<string>('');

  const [rsvpStatus, setRsvpStatus] =
    useState<string | null>(null);

  const [wishName, setWishName] =
    useState<string>('');

  const [wishMessage, setWishMessage] =
    useState<string>('');

  const [wishes, setWishes] = useState<Wish[]>(() => {
    const savedWishes = localStorage.getItem(
      'wedding_wishes_mohamed_nada'
    );

    if (savedWishes) {
      try {
        return JSON.parse(savedWishes);
      } catch (e) {
        console.error(
          'Error parsing saved wishes',
          e
        );
      }
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      'wedding_wishes_mohamed_nada',
      JSON.stringify(wishes)
    );
  }, [wishes]);

  const [timeLeft, setTimeLeft] =
    useState<TimeLeft>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const targetDate = new Date(
    '2026-09-30T19:00:00'
  ).getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();

      const difference =
        targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
          ),

          hours: Math.floor(
            (difference /
              (1000 * 60 * 60)) %
            24
          ),

          minutes: Math.floor(
            (difference / 1000 / 60) % 60
          ),

          seconds: Math.floor(
            (difference / 1000) % 60
          ),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isBride = guestSide === 'bride';

  const groomAudioUrl = '/Hollela.mp3';
  const brideAudioUrl = '/El Leila.mp3';

  const theme = isBride
    ? {
      bgMain: '#fff8fa',
      bgSection: '#fff5f8',
      primaryColor: '#d87093',
      accentPink: '#ffb6c1',
      cardBg: '#fff0f5',
      textDark: '#501525',
    }
    : {
      bgMain: '#f9f9fb',
      bgSection: '#f2f2f5',
      primaryColor: '#2b2b2b',
      accentPink: '#d4af37',
      cardBg: '#ffffff',
      textDark: '#1a1a1a',
    };

  const handleSelectSide = (
    side: 'groom' | 'bride'
  ): void => {
    setGuestSide(side);

    setIsOpen(true);

    localStorage.setItem(
      'wedding_guest_side_mohamed_nada',
      side
    );

    localStorage.setItem(
      'wedding_is_open_mohamed_nada',
      'true'
    );

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();

        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err =>
            console.log(
              'Audio autoplay restricted',
              err
            )
          );
      }
    }, 150);

    confetti({
      particleCount: 200,
      spread: 110,
      origin: {
        y: 0.6,
      },
      colors:
        side === 'bride'
          ? [
            '#ffb6c1',
            '#d4af37',
            '#ffffff',
            '#ff69b4',
            '#fff0f5',
          ]
          : [
            '#2b2b2b',
            '#d4af37',
            '#ffffff',
            '#708090',
          ],
    });
  };

  const handleSwitchSide = () => {
    setIsOpen(false);

    setGuestSide(null);

    localStorage.removeItem(
      'wedding_guest_side_mohamed_nada'
    );

    localStorage.setItem(
      'wedding_is_open_mohamed_nada',
      'false'
    );

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
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err =>
            console.log(
              'Audio play error',
              err
            )
          );
      }
    }
  };

  const handleRsvpSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!guestName.trim()) return;

    const groomPhoneNumber =
      '201062287123';

    const bridePhoneNumber =
      '201286993480';

    const targetPhoneNumber = isBride
      ? bridePhoneNumber
      : groomPhoneNumber;

    const sideText = isBride
      ? "Bride's Side"
      : "Groom's Side";

    const message = encodeURIComponent(
      `Hello! I am ${guestName} (${sideText}), and I am delighted to confirm my attendance at Mohamed & Nada's engagement party! 💍✨`
    );

    setRsvpStatus(
      `Thank you, ${guestName}! Redirecting to WhatsApp to confirm your attendance...`
    );

    confetti({
      particleCount: 80,
      spread: 70,
      origin: {
        y: 0.8,
      },
      colors: isBride
        ? ['#ffb6c1', '#d4af37']
        : ['#2b2b2b', '#d4af37'],
    });

    setTimeout(() => {
      window.open(
        `https://wa.me/${targetPhoneNumber}?text=${message}`,
        '_blank'
      );
    }, 1500);
  };

  const handleWishSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !wishName.trim() ||
      !wishMessage.trim()
    )
      return;

    const newWish: Wish = {
      name: wishName,
      message: wishMessage,
      date: 'Just now',
    };

    setWishes([
      newWish,
      ...wishes,
    ]);

    setWishName('');
    setWishMessage('');

    confetti({
      particleCount: 100,
      spread: 90,
      origin: {
        y: 0.7,
      },
      colors: isBride
        ? ['#ff69b4', '#d4af37']
        : ['#2b2b2b', '#d4af37'],
    });
  };

  const googleCalendarUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Mohamed & Nada's Engagement"
    )}&dates=20260930T190000Z/20260930T230000Z&details=${encodeURIComponent(
      "Join us to celebrate the engagement of Mohamed & Nada at Nile Hall, Nile Corniche, Imbaba, Giza."
    )}&location=${encodeURIComponent(
      'Nile Hall, Nile Corniche, Imbaba, Giza'
    )}`;

  const galleryItems = [
    {
      img: img4,
      caption:
        'Where our hearts connected...',
    },
    {
      img: img2,
      caption:
        'Precious Childhood Memories',
    },
    {
      img: img3,
      caption:
        'Growing up together in love',
    },
    {
      img: img1,
      caption:
        'Our Forever Chapter',
    },
  ];

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden font-sans transition-colors duration-500"
      style={{
        backgroundColor: theme.bgMain,
        color: theme.textDark,
      }}
    >
      <audio
        ref={audioRef}
        loop
        src={
          isBride
            ? brideAudioUrl
            : groomAudioUrl
        }
      />

      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-y-auto">
          <GlassCard className="p-5 sm:p-8 md:p-10 rounded-3xl max-w-lg w-full border-[#ffb6c1]/40 animate-fade-in">
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#ffb6c1] mx-auto mb-4 sm:mb-5 animate-bounce" />

            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#ffb6c1] font-semibold block mb-2">
              The Engagement Celebration
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-3">
              Mohamed & Nada
            </h2>

            <p className="text-gray-200 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed italic">
              "Two souls with but a single thought,
              two hearts that beat as one."
            </p>

            <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-pink-200 mb-4 font-medium">
              Which side of the family are you joining us from?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() =>
                  handleSelectSide('groom')
                }
                className="py-4 px-3 sm:px-4 bg-linear-to-r from-gray-800 to-gray-950 text-white font-bold rounded-2xl shadow-xl hover:opacity-95 transition transform sm:hover:scale-105 cursor-pointer text-xs sm:text-sm uppercase border border-amber-500/30 flex flex-col items-center justify-center gap-1 min-h-21.25"
              >
                <span>Groom's Side 🤵</span>

                <span className="text-[10px] text-amber-400 font-normal lowercase tracking-normal">
                  🎵 Classic Melody
                </span>
              </button>

              <button
                onClick={() =>
                  handleSelectSide('bride')
                }
                className="py-4 px-3 sm:px-4 bg-linear-to-r from-pink-300 to-pink-200 text-gray-950 font-bold rounded-2xl shadow-xl hover:opacity-95 transition transform sm:hover:scale-105 cursor-pointer text-xs sm:text-sm uppercase flex flex-col items-center justify-center gap-1 min-h-21.25"
              >
                <span>Bride's Side 👰</span>

                <span className="text-[10px] text-pink-700 font-normal lowercase tracking-normal">
                  🎶 Uplifting Melody
                </span>
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {isOpen && (
        <>
          <AutoScroll
            active={guestSide !== null}
            sectionIds={autoScrollSectionIds}
            delayMs={5000}
            loop
          />

          <button
            onClick={toggleMusic}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-45 p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 border border-white/40"
            style={{
              backgroundColor: isBride
                ? '#ffb6c1'
                : '#2b2b2b',
              color: isBride
                ? '#000'
                : '#d4af37',
            }}
            title={
              isPlaying
                ? 'Pause Music'
                : 'Play Music'
            }
          >
            {isPlaying ? (
              <Music className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
            ) : (
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          <button
            onClick={handleSwitchSide}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-45 px-3 sm:px-4 py-2 rounded-full shadow-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md cursor-pointer border border-white/20 transition hover:opacity-80"
            style={{
              backgroundColor: isBride
                ? 'rgba(216, 112, 147, 0.8)'
                : 'rgba(43, 43, 43, 0.8)',
              color: '#fff',
            }}
          >
            Switch Side
          </button>
        </>
      )}

      {isOpen && (
        <>
          {/* HERO */}

          <HeroSection id="hero" isBride={isBride}>
            <BackgroundWatermarkText>
              FOREVER
            </BackgroundWatermarkText>

            <div className="w-full max-w-4xl mx-auto space-y-5 sm:space-y-6 relative z-10 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white text-[9px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] max-w-full">
                <Stars className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300 shrink-0" />

                <span>
                  Save The Date (
                  {isBride
                    ? "Bride's Invitation"
                    : "Groom's Invitation"}
                  )
                </span>
              </div>

              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-serif tracking-wide text-white leading-tight">
                <GoldText isBride={isBride}>
                  Mohamed
                </GoldText>

                <span className="text-white/60 font-light mx-1 sm:mx-2">
                  &
                </span>

                <GoldText isBride={isBride}>
                  Nada
                </GoldText>
              </h1>

              <p className="text-sm sm:text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed italic px-2">
                "With great joy and love, we invite you to celebrate our engagement."
              </p>

              <div className="pt-2 sm:pt-4">
                <div className="bg-white/10 backdrop-blur-md px-4 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/30 inline-block text-xs sm:text-sm md:text-base text-white shadow-2xl">
                  💍 Wednesday, September 30, 2026 💍
                </div>
              </div>

              {/* CALENDAR */}

              <div className="w-full max-w-xl mx-auto bg-[#1a1412] border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
                <div className="text-center tracking-[0.15em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-sm font-serif text-amber-200 mb-4 sm:mb-5 font-semibold">
                  S E P T E M B E R
                  <span className="hidden sm:inline">
                    &nbsp;&nbsp;&nbsp;
                  </span>
                  2 0 2 6
                </div>

                <div className="grid grid-cols-7 text-center gap-0.5 sm:gap-1">
                  {[
                    {
                      dayName: 'SUN',
                      date: 27,
                    },
                    {
                      dayName: 'MON',
                      date: 28,
                    },
                    {
                      dayName: 'TUE',
                      date: 29,
                    },
                    {
                      dayName: 'WED',
                      date: 30,
                      isHighlight: true,
                    },
                    {
                      dayName: 'THU',
                      date: 1,
                    },
                    {
                      dayName: 'FRI',
                      date: 2,
                    },
                    {
                      dayName: 'SAT',
                      date: 3,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center relative min-w-0"
                    >
                      <span className="text-[8px] sm:text-[10px] md:text-xs tracking-wider text-white/60 mb-1 sm:mb-2 font-medium">
                        {item.dayName}
                      </span>

                      {item.isHighlight ? (
                        <div className="relative flex items-center justify-center my-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-pink-400 flex items-center justify-center bg-pink-500/20 text-white font-bold text-xs sm:text-base md:text-lg shadow-lg animate-pulse">
                            {item.date}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm md:text-base text-white/90 font-light my-2">
                          {item.date}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 pt-3 border-t border-white/10 text-center font-serif italic text-pink-300 text-sm sm:text-lg tracking-wider">
                  Save the Date
                </div>
              </div>
            </div>
          </HeroSection>

          {/* COUNTDOWN */}

          <FadeInSection direction="up">
            <section id="countdown" className="py-12 sm:py-20 bg-white text-center">
              <div className="max-w-4xl mx-auto px-4">
                <FadeInSection direction="down">
                  <span
                    className="uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-bold block mb-2"
                    style={{
                      color: isBride
                        ? '#d87093'
                        : '#d4af37',
                    }}
                  >
                    Counting Down To Forever
                  </span>

                  <h3 className="text-2xl sm:text-4xl font-serif mb-8 sm:mb-12 text-gray-900">
                    The Magic Begins In
                  </h3>
                </FadeInSection>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                  {[
                    'days',
                    'hours',
                    'minutes',
                    'seconds',
                  ].map((unit, idx) => {
                    const val =
                      timeLeft[
                      unit as keyof TimeLeft
                      ];

                    return (
                      <FadeInSection
                        key={idx}
                        direction="scale"
                        delay={idx * 150}
                      >
                        <div
                          className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition border"
                          style={{
                            backgroundColor:
                              theme.cardBg,
                            borderColor:
                              isBride
                                ? 'rgba(255,182,193,0.4)'
                                : 'rgba(212,175,55,0.3)',
                          }}
                        >
                          <span
                            className="text-3xl sm:text-5xl font-serif font-bold block mb-1"
                            style={{
                              color: isBride
                                ? '#d87093'
                                : '#1a1a1a',
                            }}
                          >
                            {val}
                          </span>

                          <span className="text-gray-500 uppercase text-[9px] sm:text-xs tracking-widest font-medium">
                            {unit}
                          </span>
                        </div>
                      </FadeInSection>
                    );
                  })}
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* EVENT DETAILS */}

          <section
            id="invitation"
            className="py-12 sm:py-20 overflow-hidden"
            style={{
              backgroundColor: theme.bgSection,
            }}
          >
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
              {/* EVENT TIME */}

              <FadeInSection
                direction="right"
                delay={100}
              >
                <LuxuryGoldCard id="location" className="flex flex-col justify-between h-full">
                  <div>
                    <div
                      className="flex items-center gap-3 mb-5 sm:mb-6"
                      style={{
                        color: isBride
                          ? '#d87093'
                          : '#d4af37',
                      }}
                    >
                      <CalendarIcon className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />

                      <h4 className="text-xl sm:text-2xl font-serif text-gray-900">
                        Event Time
                      </h4>
                    </div>

                    <div className="space-y-3 mb-6">
                      <p className="text-sm sm:text-base text-gray-700">
                        <span className="font-semibold text-gray-900 block">
                          Day:
                        </span>

                        Wednesday, Sep 30, 2026
                      </p>

                      <p className="text-sm sm:text-base text-gray-700">
                        <span className="font-semibold text-gray-900 block">
                          Time:
                        </span>

                        7:00 PM Onwards
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 text-white font-bold rounded-2xl text-center shadow-md transition block tracking-wide uppercase text-[10px] sm:text-xs"
                      style={{
                        backgroundColor:
                          isBride
                            ? '#d87093'
                            : '#d4af37',
                      }}
                    >
                      📅 Add to Google Calendar
                    </a>

                    <div
                      className="p-3 rounded-2xl text-center text-[10px] sm:text-xs font-semibold border"
                      style={{
                        backgroundColor:
                          theme.cardBg,
                        color: isBride
                          ? '#d87093'
                          : '#d4af37',
                        borderColor: isBride
                          ? 'rgba(255,182,193,0.3)'
                          : 'rgba(212,175,55,0.3)',
                      }}
                    >
                      Your presence completes our happiness.
                    </div>
                  </div>
                </LuxuryGoldCard>
              </FadeInSection>

              {/* CALENDAR CARD */}

              <FadeInSection
                direction="up"
                delay={200}
              >
                <LuxuryGoldCard className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                      <h4 className="text-xl font-serif font-bold text-gray-900">
                        September 2026
                      </h4>

                      <span
                        className="text-[10px] uppercase px-3 py-1 rounded-full font-bold border"
                        style={{
                          backgroundColor:
                            theme.cardBg,
                          color: isBride
                            ? '#d87093'
                            : '#d4af37',
                          borderColor: isBride
                            ? 'rgba(255,182,193,0.3)'
                            : 'rgba(212,175,55,0.3)',
                        }}
                      >
                        Save The Date
                      </span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs text-gray-500 mb-2 font-semibold">
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                      <span>Su</span>
                      <span>Mo</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm items-center">
                      {Array.from(
                        { length: 30 },
                        (_, i) => {
                          const dayNum = i + 1;

                          const isSpecialDay =
                            dayNum === 30;

                          return (
                            <div
                              key={i}
                              className={`py-1.5 sm:py-2 transition flex items-center justify-center ${isSpecialDay
                                ? 'font-bold scale-110'
                                : 'text-gray-700'
                                }`}
                            >
                              {isSpecialDay ? (
                                <div className="relative flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9">
                                  <Heart
                                    className="w-7 h-7 sm:w-9 sm:h-9 fill-current animate-pulse"
                                    style={{
                                      color:
                                        isBride
                                          ? '#d87093'
                                          : '#d4af37',
                                    }}
                                  />

                                  <span className="absolute text-[9px] sm:text-xs text-white font-bold z-10">
                                    {dayNum}
                                  </span>
                                </div>
                              ) : (
                                dayNum
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-4">
                    Mark your calendar for September 30
                  </p>
                </LuxuryGoldCard>
              </FadeInSection>

              {/* VENUE */}

              <FadeInSection
                direction="left"
                delay={300}
              >
                <LuxuryGoldCard className="flex flex-col justify-between h-full">
                  <div>
                    <div
                      className="flex items-center gap-3 mb-5 sm:mb-6"
                      style={{
                        color: isBride
                          ? '#d87093'
                          : '#d4af37',
                      }}
                    >
                      <MapPin className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />

                      <h4 className="text-xl sm:text-2xl font-serif text-gray-900">
                        The Venue
                      </h4>
                    </div>

                    <div className="space-y-2 mb-6">
                      <p className="text-lg sm:text-xl font-serif font-bold text-gray-900">
                        Nile Hall
                      </p>

                      <p className="text-gray-600 text-sm">
                        Nile Corniche, Imbaba, Giza
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/V28MLmxhNtpiEGyb7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 text-white font-bold rounded-2xl text-center shadow-lg transition block tracking-wide uppercase text-[10px] sm:text-xs"
                    style={{
                      backgroundColor: isBride
                        ? '#d87093'
                        : '#2b2b2b',
                    }}
                  >
                    📍 Open Google Maps
                  </a>
                </LuxuryGoldCard>
              </FadeInSection>
            </div>
          </section>

          {/* DRESS CODE */}

          <FadeInSection direction="up">
            <section id="story-timeline" className="py-12 sm:py-20 bg-white text-center">
              <div className="max-w-4xl mx-auto px-4">
                <div
                  className="flex items-center justify-center gap-2 mb-2"
                  style={{
                    color: isBride
                      ? '#d87093'
                      : '#d4af37',
                  }}
                >
                  <Shirt className="w-6 h-6 sm:w-7 sm:h-7" />

                  <h3 className="text-2xl sm:text-3xl font-serif text-gray-900">
                    Dress Code Palette
                  </h3>
                </div>

                <p className="text-gray-500 mb-8 sm:mb-10 text-xs sm:text-sm px-2">
                  We kindly request our guests to dress in harmony with our celebration palette.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
                  <FadeInSection direction="right">
                    <div className="bg-linear-to-b from-gray-900 to-gray-950 text-white p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-md relative overflow-hidden text-center h-full">
                      <div className="absolute top-0 right-0 bg-gray-800 text-gray-200 text-[9px] sm:text-[10px] tracking-widest px-3 sm:px-4 py-1 rounded-bl-xl uppercase font-bold">
                        Gentlemen
                      </div>

                      <h4 className="font-serif font-bold text-xl sm:text-2xl text-gray-100 mb-2">
                        Black Gradient Suite
                      </h4>

                      <p className="text-gray-300 text-xs sm:text-sm mb-6 font-medium">
                        Shades of Black & Charcoal
                      </p>

                      <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4">
                        <div className="text-center">
                          <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black shadow-lg border-2 border-gray-700 block mx-auto mb-1" />

                          <span className="text-[9px] sm:text-[11px] text-gray-400">
                            Black
                          </span>
                        </div>

                        <div className="text-center">
                          <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#222222] shadow-lg border-2 border-gray-700 block mx-auto mb-1" />

                          <span className="text-[9px] sm:text-[11px] text-gray-400">
                            Dark Charcoal
                          </span>
                        </div>

                        <div className="text-center">
                          <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#444444] shadow-lg border-2 border-gray-700 block mx-auto mb-1" />

                          <span className="text-[9px] sm:text-[11px] text-gray-400">
                            Charcoal
                          </span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>

                  <FadeInSection direction="left">
                    <div className="bg-linear-to-b from-[#fff0f5] to-white p-6 sm:p-8 rounded-3xl border border-[#ffb6c1]/50 shadow-md relative overflow-hidden text-center h-full">
                      <div className="absolute top-0 right-0 bg-[#800020] text-white text-[9px] sm:text-[10px] tracking-widest px-3 sm:px-4 py-1 rounded-bl-xl uppercase font-bold">
                        Ladies
                      </div>

                      <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#800020] mb-2">
                        Burgundy Gradient Palette
                      </h4>

                      <p className="text-gray-600 text-xs sm:text-sm mb-6 font-medium">
                        Shades of Burgundy & Deep Rose
                      </p>

                      <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4">
                        <div className="text-center">
                          <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#58111A] shadow-lg border-2 border-white block mx-auto mb-1" />

                          <span className="text-[9px] sm:text-[11px] text-gray-500">
                            Deep Burgundy
                          </span>
                        </div>

                        <div className="text-center">
                          <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#800020] shadow-lg border-2 border-white block mx-auto mb-1" />

                          <span className="text-[9px] sm:text-[11px] text-gray-500">
                            Burgundy
                          </span>
                        </div>

                        <div className="text-center">
                          <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#A52A2A] shadow-lg border-2 border-white block mx-auto mb-1" />

                          <span className="text-[9px] sm:text-[11px] text-gray-500">
                            Rose Wine
                          </span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* RSVP */}

          <FadeInSection direction="up">
            <section
              id="rsvp"
              className="py-12 sm:py-20 text-center"
              style={{
                backgroundColor: theme.bgMain,
              }}
            >
              <div className="max-w-xl mx-auto px-4">
                <span
                  className="uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-bold block mb-2"
                  style={{
                    color: isBride
                      ? '#d87093'
                      : '#d4af37',
                  }}
                >
                  Be Our Guest
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif mb-4 text-gray-900">
                  Confirm Your Attendance
                </h3>

                <div
                  className="inline-block mb-4 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold border max-w-full"
                  style={{
                    backgroundColor:
                      theme.cardBg,
                    color: isBride
                      ? '#d87093'
                      : '#d4af37',
                    borderColor: isBride
                      ? '#ffb6c1'
                      : '#d4af37',
                  }}
                >
                  {isBride
                    ? "The invitation is for: The Bride's side 👰"
                    : "The invitation is for: The Groom's side 🤵"}
                </div>

                <p className="text-gray-500 mb-8 text-xs sm:text-sm">
                  Enter your name and confirm via WhatsApp to notify the correct side directly.
                </p>

<form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!guestName.trim()) {
                      alert('Please enter your full name first!');
                      return;
                    }

                    const phone = isBride ? '201286993480' : '201062287123';
                    const text = encodeURIComponent(
                      `Hello! I am ${guestName} (${isBride ? "Bride's Side" : "Groom's Side"}), and I am delighted to confirm my attendance at Mohamed & Nada's engagement party! 💍✨`
                    );

                    // استخدام رابط الويب المباشر api.whatsapp.com لأنه بيتفتح أسهل بكتير على الآيفون
                    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;

                    setRsvpStatus(`Thank you, ${guestName}! Redirecting to WhatsApp...`);
                    
                    confetti({
                      particleCount: 80,
                      spread: 70,
                      origin: { y: 0.8 },
                      colors: isBride ? ['#ffb6c1', '#d4af37'] : ['#2b2b2b', '#d4af37'],
                    });

                    // الطريقة الأضمن للآيفون والأندرويد معا
                    window.location.href = whatsappUrl;
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl border focus:outline-none text-center text-base sm:text-lg bg-white shadow-sm"
                    style={{
                      borderColor: isBride ? '#ffb6c1' : '#d4af37',
                    }}
                    required
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 bg-[#25D366] text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer uppercase text-[10px] sm:text-xs tracking-widest"
                  >
                    <Send className="w-4 h-4" />
                    Confirm via WhatsApp
                  </button>
                </form>





                {rsvpStatus && (
                  <div
                    className="mt-6 p-4 rounded-2xl border text-xs sm:text-sm font-semibold animate-fade-in"
                    style={{
                      backgroundColor:
                        theme.cardBg,
                      color: isBride
                        ? '#d87093'
                        : '#333',
                    }}
                  >
                    {rsvpStatus}
                  </div>
                )}
              </div>
            </section>
          </FadeInSection>

          {/* WISHES */}

          <FadeInSection direction="up">
            <section
              id="wishes-wall"
              className="py-12 sm:py-20"
              style={{
                backgroundColor:
                  theme.bgSection,
              }}
            >
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8 sm:mb-12">
                  <div
                    className="flex items-center justify-center gap-2 mb-2"
                    style={{
                      color: isBride
                        ? '#d87093'
                        : '#d4af37',
                    }}
                  >
                    <MessageCircleHeart className="w-7 h-7 sm:w-8 sm:h-8" />

                    <h3 className="text-2xl sm:text-3xl font-serif text-gray-900">
                      Send Your Wishes
                    </h3>
                  </div>

                  <p className="text-gray-500 text-xs sm:text-sm px-2">
                    Leave a loving note or a congratulatory message for Mohamed & Nada.
                  </p>
                </div>

                <div
                  className="bg-white p-5 sm:p-8 rounded-3xl shadow-xl border mb-8 sm:mb-10"
                  style={{
                    borderColor: isBride
                      ? 'rgba(255,182,193,0.3)'
                      : 'rgba(212,175,55,0.3)',
                  }}
                >
                  <form
                    onSubmit={handleWishSubmit}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={wishName}
                      onChange={e =>
                        setWishName(
                          e.target.value
                        )
                      }
                      className="w-full px-5 py-3 rounded-2xl border focus:outline-none bg-white text-gray-900 text-sm sm:text-base"
                      style={{
                        borderColor: isBride
                          ? '#ffb6c1'
                          : '#d4af37',
                      }}
                      required
                    />

                    <textarea
                      placeholder="Write your heartfelt wish here..."
                      rows={4}
                      value={wishMessage}
                      onChange={e =>
                        setWishMessage(
                          e.target.value
                        )
                      }
                      className="w-full px-5 py-3 rounded-2xl border focus:outline-none bg-white text-gray-900 text-sm sm:text-base resize-none"
                      style={{
                        borderColor: isBride
                          ? '#ffb6c1'
                          : '#d4af37',
                      }}
                      required
                    />

                    <button
                      type="submit"
                      className="w-full py-3.5 text-white font-bold rounded-2xl shadow-md transition uppercase text-[10px] sm:text-xs tracking-widest cursor-pointer"
                      style={{
                        backgroundColor:
                          isBride
                            ? '#d87093'
                            : '#2b2b2b',
                      }}
                    >
                      Send Wish ✨
                    </button>
                  </form>
                </div>

                <div className="grid gap-4">
                  {wishes.length === 0 ? (
                    <p className="text-center text-gray-400 py-6 text-sm">
                      كن أول من يترك تهنئة للعروسين! ✨
                    </p>
                  ) : (
                    wishes.map(
                      (wish, index) => (
                        <FadeInSection
                          key={index}
                          direction="up"
                          delay={index * 50}
                        >
                          <div
                            className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border"
                            style={{
                              borderColor:
                                isBride
                                  ? 'rgba(255,182,193,0.3)'
                                  : 'rgba(212,175,55,0.3)',
                            }}
                          >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                              <span className="font-serif font-bold text-gray-900 text-base sm:text-lg wrap-break-word">
                                {wish.name}
                              </span>

                              <span className="text-xs text-gray-400">
                                {wish.date}
                              </span>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed wrap-break-word">
                              {wish.message}
                            </p>
                          </div>
                        </FadeInSection>
                      )
                    )
                  )}
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* GALLERY */}
          <FadeInSection direction="up">
            <section id="gallery" className="py-12 sm:py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4 text-center">

                {/* Gallery Title */}
                <div
                  className="flex items-center justify-center gap-2 mb-2"
                  style={{
                    color: isBride ? "#d87093" : "#d4af37",
                  }}
                >
                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />

                  <h3 className="text-2xl sm:text-4xl font-serif text-gray-900">
                    Our Story in Pictures
                  </h3>
                </div>

                {/* Gallery Description */}
                <p className="text-gray-500 mb-8 sm:mb-12 text-xs sm:text-base px-2">
                  Sweet childhood memories and wonderful moments leading to forever.
                </p>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

                  {galleryItems.map((item, index) => (
                    <FadeInSection
                      key={index}
                      direction="scale"
                      delay={index * 100}
                    >
                      {/* Image Card */}
                      <div
                        className="p-3 rounded-3xl shadow-xl border group overflow-hidden h-full flex flex-col justify-between"
                        style={{
                          backgroundColor: theme.cardBg,
                          borderColor: isBride
                            ? "rgba(255,182,193,0.3)"
                            : "rgba(212,175,55,0.3)",
                        }}
                      >

                        {/* Image Container */}
                        <div
                          className={`overflow-hidden rounded-2xl mb-3 ${index === galleryItems.length - 1
                              ? "aspect-3/4"
                              : ""
                            }`}
                        >

                          <img
                            src={item.img}
                            alt={item.caption}
                            loading="lazy"
                            className={`w-full rounded-2xl group-hover:scale-105 transition duration-700 ${index === galleryItems.length - 1
                                ? "h-full object-cover"
                                : "h-auto object-contain"
                              }`}
                          />

                        </div>

                        {/* Image Caption */}
                        <p className="text-gray-700 font-serif text-sm pb-2 font-medium">
                          {item.caption}
                        </p>

                      </div>
                    </FadeInSection>
                  ))}

                </div>
              </div>
            </section>
          </FadeInSection>
          {/* FOOTER */}

          <footer
            id="footer"
            className="py-6 text-center border-t transition-colors duration-500"
            style={{
              backgroundColor: isBride
                ? '#fff0f5'
                : '#121212',

              borderColor: isBride
                ? 'rgba(216, 112, 147, 0.2)'
                : 'rgba(212, 175, 55, 0.2)',

              color: isBride
                ? '#501525'
                : '#ffffff',
            }}
          >
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center space-y-5 sm:space-y-6">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <span
                  className="h-px w-8 sm:w-12"
                  style={{
                    backgroundColor:
                      isBride
                        ? '#d87093'
                        : '#d4af37',
                  }}
                />

                <div
                  className="p-2 sm:p-3 rounded-full shadow-md border"
                  style={{
                    backgroundColor:
                      isBride
                        ? '#ffffff'
                        : '#1a1a1a',

                    borderColor: isBride
                      ? 'rgba(216, 112, 147, 0.3)'
                      : 'rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <Heart
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-pulse"
                    style={{
                      color: isBride
                        ? '#d87093'
                        : '#d4af37',
                    }}
                  />
                </div>

                <span
                  className="h-px w-8 sm:w-12"
                  style={{
                    backgroundColor:
                      isBride
                        ? '#d87093'
                        : '#d4af37',
                  }}
                />
              </div>

              <div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide mb-2"
                  style={{
                    color: isBride
                      ? '#501525'
                      : '#ffffff',
                  }}
                >
                  <span
                    style={{
                      color: isBride
                        ? '#d87093'
                        : '#d4af37',
                    }}
                  >
                    Mohamed
                  </span>

                  {' & '}

                  <span
                    style={{
                      color: isBride
                        ? '#d87093'
                        : '#d4af37',
                    }}
                  >
                    Nada
                  </span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm italic font-light max-w-md mx-auto leading-relaxed opacity-90 px-4">
                "We can't wait to share this magical night and create unforgettable memories with the people we love most."
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
