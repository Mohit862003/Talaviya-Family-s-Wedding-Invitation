import React, { useEffect, useState, useRef } from "react";
import {
  Flower2,
  Heart,
  ChevronDown,
  Sprout,
  Leaf,
  Music,
  Flame,
  Car,
  HeartHandshake,
  Utensils,
  Disc,
  Bus,
  Quote,
  MapPin,
  Home,
  Phone,
  Map,
  Volume2,
  VolumeX,
  Share2,
  Instagram,
} from "lucide-react";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Hide welcome screen automatically after 3.5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);

    // Dynamically loading AOS (Animate On Scroll) for React
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
    script.onload = () => {
      window.AOS.init({
        once: true,
        offset: 50,
      });
    };
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleFirstClick = () => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio play error:", err);
      });
    }

    setIsPlaying(!isPlaying);
  };

  const handleShare = async () => {
    const shareData = {
      title: "શિવાંગી & હિતેન | નિખિલ & મનાલી - શુભવિવાહ",
      text: "અમારા લગ્ન પ્રસંગ નું આમંત્રણ સ્વીકારશોજી.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const customImages = {
    redPetal: "assets/petal1.png",
    goldPetal: "assets/petal.png",
    flower: "assets/flower.png",
    centerImage: "assets/couple.png",
    cornerFlower: "assets/cornerflower.png", // <-- અહી કોર્નર ફૂલની લિંક મૂકો
    coupleDivider: "assets/hand.png", // <-- નામો વચ્ચેની ઈમેજ (Rings/Heart) અહી મૂકો
    shubhVivahImage: "assets/shubhvivah.png",
    shreeGaneshayNamahImage: "assets/shreeganesh.png", // <-- શ્રી ગણેશાય નમઃ ઈમેજ લિંક
  };

  return (
    // Outer Container: Full screen on mobile, gray background with padding on desktop
    <div className="min-h-screen bg-[#e8e6e1] flex justify-center py-0 sm:py-6 md:py-10 font-gujarati antialiased selection:bg-[#d4af37] selection:text-[#8b0000]">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      {/* Welcome Splash Screen (Mobile Responsive) */}
      <div
        onClick={() => setShowWelcome(false)}
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fdfbf7] cursor-pointer transition-all duration-1000 ease-in-out ${showWelcome ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"}`}>
        {/* Adjusted borders for mobile so they don't touch the very edges of small screens */}
        <div className="absolute inset-2 sm:inset-4 md:inset-6 border-[1.2px] sm:border-[1.5px] border-[#d4af37] rounded-xl sm:rounded-2xl pointer-events-none opacity-60"></div>
        <div className="absolute inset-3 sm:inset-5 md:inset-7 border border-[#8b0000] rounded-lg sm:rounded-xl pointer-events-none opacity-30"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 w-full">
          <div className="w-20 h-20 sm:w-28 sm:h-28 mb-5 sm:mb-8 bg-white rounded-full p-3 sm:p-4 shadow-[0_0_25px_rgba(212,175,55,0.3)] border border-[#d4af37] flex items-center justify-center relative">
            <div className="absolute inset-[-3px] sm:inset-[-4px] rounded-full border-[2px] sm:border-[3px] border-transparent border-t-[#8b0000] border-b-[#d4af37] animate-spin pointer-events-none"></div>
            <img
              src="assets/ganesha.png"
              alt="Ganesha"
              className="w-12 sm:w-16 opacity-80"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="flex justify-center w-full px-4 mb-2">
            <img
              src={customImages.shreeGaneshayNamahImage}
              alt="શ્રી ગણેશાય નમઃ"
              className="w-full max-w-[200px] sm:max-w-[250px] h-auto object-contain drop-shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML =
                  '<h2 class="text-lg sm:text-xl font-bold text-[#8b0000] mb-2 tracking-wider">॥ શ્રી ગણેશાય નમઃ ॥</h2>';
              }}
            />
          </div>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-2 sm:my-3"></div>
          {/* Responsive Font Sizing for Title */}
          <h1 className="text-2xl sm:text-4xl font-bold text-[#8b0000] tracking-widest sm:tracking-wider font-elegant mt-2 px-2 leading-tight">
            તળાવીયા પરિવાર આપનું હાર્દિક સ્વાગત કરે છે
          </h1>

          <p className="mt-8 sm:mt-10 text-[9px] sm:text-xs text-gray-500 tracking-widest animate-pulse font-sans">
            OPENING INVITATION...
          </p>
        </div>
      </div>

      {/* Embedded Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@300;400;500;600;700&family=Great+Vibes&family=Rasa:wght@500;600;700&display=swap');
        
        body { margin: 0; background-color: #e8e6e1; }
        
        .card-bg {
            background-color: #fdfbf7;
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            font-family: 'Hind Vadodara', sans-serif;
            color: #3e2723;
            animation: moveBg 40s linear infinite;
        }

        @keyframes moveBg {
            0% { background-position: 0 0; }
            100% { background-position: 60px 60px; }
        }
        .font-cursive { font-family: 'Great Vibes', cursive; }
        .gold-gradient-text {
            background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .red-title-text {
            color: #b30000;
            text-shadow: 1px 1px 0px #fcf6ba, 2px 2px 0px #d4af37, 0px 4px 10px rgba(0,0,0,0.15);
        }
        
        /* New Premium Card Styles */
        .font-elegant { font-family: 'Rasa', serif; }
        
        .glass-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-top: 1px solid rgba(255, 255, 255, 0.9);
            border-left: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 10px 30px 0 rgba(139, 0, 0, 0.1);
        }
        
        .name-gradient {
            background: linear-gradient(to right, #8b0000 0%, #d4af37 50%, #8b0000 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shine 3s linear infinite;
        }
        
        @keyframes shine {
            to { background-position: 200% center; }
        }
        
        .float-card-1 { animation: float-card 6s ease-in-out infinite; }
        .float-card-2 { animation: float-card 6s ease-in-out infinite 3s; }
        
        @keyframes float-card {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
        }

        .decorative-line {
            height: 3px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
            margin: 1.5rem auto;
        }
        .floating-flower { animation: float 6s ease-in-out infinite; }
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .btn-gold {
            background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728);
            color: #8b0000;
            transition: all 0.3s ease;
        }
        .btn-gold:hover {
            background: linear-gradient(135deg, #b38728, #fcf6ba, #bf953f);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }
        .mandala-bg { position: relative; }
        .mandala-bg::before {
            content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 100%; height: 100%;
            background-image: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
            z-index: -1;
        }
        .falling-item {
            position: absolute;
            top: -10%; z-index: 0; pointer-events: none;
            background-size: contain; background-repeat: no-repeat; background-position: center;
            animation: fall-down linear infinite, sway-left-right 3s ease-in-out infinite alternate;
        }
        .petal-red { width: 14px; height: 14px; opacity: 0.85; filter: drop-shadow(0px 2px 3px rgba(167, 24, 24, 0.4)); }
        .petal-gold { width: 12px; height: 12px; opacity: 0.85; filter: drop-shadow(0px 2px 3px rgba(212, 175, 55, 0.4)); }
        .flower-gold { width: 20px; height: 20px; opacity: 0.95; filter: drop-shadow(0px 3px 4px rgba(212, 175, 55, 0.5)); }

        @media (min-width: 640px) {
            .petal-red { width: 18px; height: 18px; }
            .petal-gold { width: 14px; height: 14px; }
            .flower-gold { width: 24px; height: 24px; }
        }

        @keyframes fall-down {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            85% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
        @keyframes sway-left-right {
            0% { transform: translateX(-20px) rotate(0deg); }
            100% { transform: translateX(20px) rotate(360deg); }
        }
        @media (min-width: 640px) {
             @keyframes sway-left-right {
                0% { transform: translateX(-30px) rotate(0deg); }
                100% { transform: translateX(30px) rotate(360deg); }
            }
        }
      `,
        }}
      />

      {/* --- THE MAIN CENTERED CARD --- */}
      {/* On mobile: full width & height (no rounded corners). On desktop: max-w 480px, rounded corners, shadow */}
      <div className="w-full sm:max-w-[480px] card-bg relative sm:shadow-2xl flex flex-col sm:border border-[#d4af37]/30 sm:rounded-2xl bg-white min-h-screen sm:min-h-0">
        {/* Continuous Inner Double Border (Responsive padding) */}
        <div className="absolute top-2 bottom-2 left-2 right-2 sm:top-3 sm:bottom-3 sm:left-3 sm:right-3 z-30 pointer-events-none rounded-lg sm:rounded-xl border-[1.2px] sm:border-[1.5px] border-[#d4af37]">
          <div className="absolute inset-[2px] sm:inset-[3px] rounded-md sm:rounded-lg border border-[#8b0000]/80"></div>
        </div>

        <img
          src={customImages.cornerFlower}
          alt="Corner Floral"
          className="absolute top-0 left-0 sm:top-1 sm:left-1 w-28 sm:w-32 md:w-40 z-40 pointer-events-none opacity-95 drop-shadow-sm"
        />

        <img
          src={customImages.cornerFlower}
          alt="Corner Floral"
          className="absolute top-0 right-0 sm:top-1 sm:right-1 w-28 sm:w-32 md:w-40 z-40 pointer-events-none opacity-95 drop-shadow-sm transform scale-x-[-1]"
        />

        <img
          src={customImages.cornerFlower}
          alt="Corner Floral"
          className="absolute bottom-0 left-0 sm:bottom-1 sm:left-1 w-28 sm:w-32 md:w-40 z-40 pointer-events-none opacity-95 drop-shadow-sm transform scale-y-[-1]"
        />

        <img
          src={customImages.cornerFlower}
          alt="Corner Floral"
          className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 w-28 sm:w-32 md:w-40 z-40 pointer-events-none opacity-95 drop-shadow-sm transform scale-x-[-1] scale-y-[-1]"
        />

        {/* Animated Falling Petals (Sticky inside card to clip properly) */}
        <div className="absolute top-0 bottom-0 left-0 w-full pointer-events-none z-0">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {[...Array(18)].map((_, i) => {
              let elementClass = "petal-red";
              let bgImage = customImages.redPetal;

              if (i % 3 === 1) {
                elementClass = "flower-gold";
                bgImage = customImages.flower;
              }
              if (i % 3 === 2) {
                elementClass = "petal-gold";
                bgImage = customImages.goldPetal;
              }

              return (
                <div
                  key={i}
                  className={`falling-item ${elementClass}`}
                  style={{
                    left: `${(i * 5.5) % 100}%`,
                    backgroundImage: `url(${bgImage})`,
                    animationDuration: `${12 + (i % 8)}s, ${3 + (i % 4)}s`,
                    animationDelay: `${i % 12}s, ${i % 3}s`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-12 sm:pt-16 pb-8 sm:pb-10 px-4 sm:px-6 relative z-10">
          <div
            className="text-center z-10 w-full"
            data-aos="fade-up"
            data-aos-duration="1500">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-white rounded-full p-2 shadow-md border border-[#d4af37] flex items-center justify-center">
              <img
                src="assets/ganesha.png"
                alt="Ganesha"
                className="w-12 sm:w-16 opacity-80"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="flex justify-center w-full px-4 mb-2">
              <img
                src={customImages.shreeGaneshayNamahImage}
                alt="શ્રી ગણેશાય નમઃ"
                className="w-full max-w-[200px] sm:max-w-[250px] h-auto object-contain drop-shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML =
                    '<h2 class="text-lg sm:text-xl font-bold text-[#8b0000] mb-2 tracking-wider">॥ શ્રી ગણેશાય નમઃ ॥</h2>';
                }}
              />
            </div>

            {/* <h1 className="text-5xl sm:text-6xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-3 red-title-text tracking-wider font-cursive pt-4 sm:pt-6 pb-2 sm:pb-4 leading-relaxed">
              શુભવિવાહ
            </h1> */}
            <div className="flex justify-center w-full px-4 py-2 sm:py-4">
              <img
                src={customImages.shubhVivahImage}
                alt="શુભવિવાહ"
                className="w-full max-w-[280px] sm:max-w-[350px] h-auto object-contain drop-shadow-lg"
                onError={(e) => {
                  // Fallback to text if image fails
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML =
                    '<h1 class="text-5xl sm:text-6xl font-bold red-title-text tracking-wider font-cursive pt-4 pb-4">શુભવિવાહ</h1>';
                }}
              />
            </div>

            <p className="text-[10px] sm:text-xs font-semibold text-[#3e2723] mb-6 sm:mb-8 leading-relaxed px-2 sm:px-4">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ: |<br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ||
            </p>

            <div className="decorative-line w-3/4 mx-auto"></div>

            {/* Couples (Glassmorphism & Floating Cards) */}
            <div className="flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-8 w-full relative z-20 px-1 sm:px-2">
              {/* Background Glow for Glass Effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-[#d4af37]/30 rounded-full blur-3xl -z-10 animate-pulse"></div>

              {/* Couple 1 */}
              <div
                className="w-full glass-card float-card-1 p-5 sm:p-6 rounded-2xl relative overflow-hidden group"
                data-aos="fade-up">
                <div className="flex flex-row items-center justify-center w-full relative z-10 gap-3 sm:gap-4">
                  <span className="font-elegant text-3xl sm:text-4xl name-gradient font-bold drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                    ચિ. શિવાંગી
                  </span>
                  <span className="flex-shrink-0 animate-pulse">
                    <img
                      src={customImages.coupleDivider}
                      alt="&"
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </span>
                  <span className="font-elegant text-3xl sm:text-4xl name-gradient font-bold drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                    ચિ. હિતેન
                  </span>
                </div>

                <div className="mt-5 flex justify-center relative z-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b0000] to-[#a30000] text-white px-5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold shadow-md border border-[#d4af37]/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
                    શુક્રવાર તા. ૦૧-૦૫-૨૦૨૬
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
                  </div>
                </div>
              </div>

              {/* Center Divider Image */}
              <div className="flex justify-center my-1" data-aos="zoom-in">
                <img
                  src={customImages.centerImage}
                  alt="Center Decor"
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain filter drop-shadow-md hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Couple 2 */}
              <div
                className="w-full glass-card float-card-2 p-5 sm:p-6 rounded-2xl relative overflow-hidden group"
                data-aos="fade-up">
                <div className="flex flex-row items-center justify-center w-full relative z-10 gap-3 sm:gap-4">
                  <span className="font-elegant text-3xl sm:text-4xl name-gradient font-bold drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                    ચિ. નિખિલ
                  </span>
                  <span className="flex-shrink-0 animate-pulse">
                    <img
                      src={customImages.coupleDivider}
                      alt="&"
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </span>
                  <span className="font-elegant text-3xl sm:text-4xl name-gradient font-bold drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                    ચિ. મનાલી
                  </span>
                </div>

                <div className="mt-5 flex justify-center relative z-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b0000] to-[#a30000] text-white px-5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold shadow-md border border-[#d4af37]/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
                    રવિવાર તા. ૦૩-૦૫-૨૦૨૬
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 animate-bounce text-[#d4af37] flex justify-center">
              <ChevronDown size={24} className="sm:w-7 sm:h-7" />
            </div>
          </div>
        </section>

        {/* Mangal Parinay */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 bg-white/60 relative z-10">
          <div className="mandala-bg" data-aos="fade-up">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#8b0000] mb-2">
                મંગલ પરિણય
              </h2>
              <div className="decorative-line w-24 sm:w-32 mx-auto"></div>
            </div>

            <div className="bg-[#fdfbf7]/95 p-5 sm:p-6 rounded-2xl shadow-md text-center border border-[#d4af37]/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#8b0000]"></div>

              <p className="text-xs sm:text-sm font-medium leading-loose mb-5 sm:mb-6 text-gray-800">
                <span className="text-base sm:text-lg text-[#8b0000] font-bold">
                  સ્નેહી શ્રી,
                </span>
                <br />
                સહર્ષ ખુશાલી સાથ જણાવવાનું કે અમારા કુળદેવી શ્રી ખોડીયાર
                માતાજીની અસીમ કૃપાથી ગામ પાંચિયાવાદર નિવાસી
                <br />
                <strong className="text-[#8b0000] text-sm sm:text-base">
                  અ. સૌ. નિતાબેન તથા શ્રી અશોકભાઈ વલ્લભભાઈ તળાવીયા ના સુપુત્રી
                  તથા સુપુત્ર
                </strong>
              </p>

              <div className="flex flex-col gap-6 sm:gap-8 mt-5 sm:mt-6">
                <div className="border-t border-[#d4af37]/50 pt-5 sm:pt-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#fdfbf7] px-2 text-[#d4af37]">
                    <Sprout size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#8b0000] mb-2">
                    ચિ. શિવાંગી{" "}
                    <span className="text-xs sm:text-sm text-gray-500 mx-1">
                      સાથે
                    </span>{" "}
                    ચિ. હિતેન
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-700 mb-2 sm:mb-3 font-medium">
                    શિવરાજગઢ નિવાસી
                    <br />
                    અ. સૌ. વૈશાલીબેન તથા વિઠ્ઠલભાઈ કાનજીભાઈ વોરા ના સુપુત્ર
                  </p>
                  <div className="bg-red-50 text-[#8b0000] p-2 sm:p-3 rounded-lg text-[10px] sm:text-xs font-semibold border border-red-100">
                    સાથે સવંત ૨૦૮૨ ના વૈશાખ સુદ પૂનમ ને શુક્રવાર તા. ૦૧-૦૫-૨૦૨૬
                    ની મંગલમય ઘડીએ શુભ લગ્ન નિર્ધારિલ છે
                  </div>
                </div>

                <div className="border-t border-[#d4af37]/50 pt-5 sm:pt-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#fdfbf7] px-2 text-[#d4af37]">
                    <Sprout size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#8b0000] mb-2">
                    ચિ. નિખિલ{" "}
                    <span className="text-xs sm:text-sm text-gray-500 mx-1">
                      સાથે
                    </span>{" "}
                    ચિ. મનાલી
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-700 mb-2 sm:mb-3 font-medium">
                    કેશવાળા નિવાસી
                    <br />
                    અ. સૌ. નયનાબેન તથા બીપીનભાઈ ધીરુભાઈ વાડોદરિયા ની સુપુત્રી
                  </p>
                  <div className="bg-red-50 text-[#8b0000] p-2 sm:p-3 rounded-lg text-[10px] sm:text-xs font-semibold border border-red-100">
                    સાથે સવંત ૨૦૮૨ ના વૈશાખ વદ-૨ ને રવિવાર તા. ૦૩-૦૫-૨૦૨૬ ની
                    મંગલમય ઘડીએ શુભ લગ્ન નિર્ધારિલ છે
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-[11px] sm:text-xs text-gray-800 font-medium italic px-2">
                  "તો આપ સ્નેહીજનોની ઉષ્માપૂર્ણ ઉપસ્થિતિ અમારા જીવન સંભારણાની
                  અવિસ્મરણીય ગૌરવગાથા બની રહે તેવી અપેક્ષા સહ અમારા પ્રસંગની
                  શોભામાં અભિવૃદ્ધિ કરવા પધારશોજી"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Suvarna Avasaro (Events) */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 bg-[#fdfbf7]/70 relative z-10">
          <div className="text-center mb-8 sm:mb-10" data-aos="fade-down">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#8b0000] mb-2">
              સુવર્ણ અવસરો
            </h2>
            <div className="decorative-line w-24 sm:w-32 mx-auto"></div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <EventCard
              icon={<Music size={20} className="sm:w-6 sm:h-6" />}
              title="॥ ગીત ગુંજન ॥"
              date="તા. ૩૦-૦૪-૨૦૨૬"
              time="ગુરુવાર, સાંજે ૭:૦૦ કલાકે"
              location="(અમારા નિવાસ સ્થાને)"
              delay="100"
            />

            <div
              className="mt-3 sm:mt-4 mb-1 sm:mb-2 text-center"
              data-aos="fade-up">
              <h3 className="text-base sm:text-lg font-bold text-[#8b0000] inline-block border-b-2 border-[#d4af37] pb-1 px-4 bg-white/60 rounded-full shadow-sm">
                🌸 ચિ. શિવાંગી ના પ્રસંગો 🌸
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <EventCard
                icon={<Flame size={20} className="sm:w-6 sm:h-6" />}
                title="॥ મંડપ મુહુર્ત ॥"
                date="તા. ૦૧-૦૫-૨૦૨૬"
                time="શુક્રવાર, સવારે ૭:૦૦ કલાકે"
                location="(રાધેશ્યામ વાડી ગોંડલ)"
                delay="100"
              />
              <EventCard
                icon={<Car size={20} className="sm:w-6 sm:h-6" />}
                title="॥ જાન આગમન ॥"
                date="તા. ૦૧-૦૫-૨૦૨૬"
                time="શુક્રવાર, સાંજે ૫:૦૦ કલાકે"
                location="(રાધેશ્યામ વાડી ગોંડલ)"
                delay="100"
              />
              <EventCard
                icon={<HeartHandshake size={20} className="sm:w-6 sm:h-6" />}
                title="॥ હસ્ત મેળાપ ॥"
                date="તા. ૦૧-૦૫-૨૦૨૬"
                time="શુક્રવાર, સાંજે ૭:૦૦ કલાકે"
                location="(રાધેશ્યામ વાડી ગોંડલ)"
                delay="100"
              />
              <EventCard
                icon={<Utensils size={20} className="sm:w-6 sm:h-6" />}
                title="॥ ભોજન સમારંભ ॥"
                date="તા. ૦૧-૦૫-૨૦૨૬"
                time="શુક્રવાર, સાંજે ૭:૦૦ કલાકે"
                location="(રાધેશ્યામ વાડી ગોંડલ)"
                delay="100"
              />
            </div>

            <div
              className="mt-6 sm:mt-8 mb-1 sm:mb-2 text-center"
              data-aos="fade-up">
              <h3 className="text-base sm:text-lg font-bold text-[#8b0000] inline-block border-b-2 border-[#d4af37] pb-1 px-4 bg-white/60 rounded-full shadow-sm">
                🌸 ચિ. નિખિલ ના પ્રસંગો 🌸
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <EventCard
                icon={<Flame size={20} className="sm:w-6 sm:h-6" />}
                title="॥ મંડપ મુહુર્ત ॥"
                date="તા. ૦૨-૦૫-૨૦૨૬"
                time="શનિવાર, બપોરે ૩:૦૦ કલાકે"
                location="(અમારા નિવાસ સ્થાને)"
                delay="100"
              />
              <EventCard
                icon={<Disc size={20} className="sm:w-6 sm:h-6" />}
                title="॥ રાસની રમઝટ ॥"
                date="તા. ૦૨-૦૫-૨૦૨૬"
                time="શનિવાર, સાંજે ૯:૦૦ કલાકે"
                location="(ખોડિયાર મંદિર પાંચિયાવાદર)"
                delay="100"
              />
              <EventCard
                icon={<Bus size={20} className="sm:w-6 sm:h-6" />}
                title="॥ જાન પ્રસ્થાન ॥"
                date="તા. ૦૩-૦૫-૨૦૨૬"
                time="રવિવાર, બપોરે ૩:૩૦ કલાકે"
                location="(પટેલ સમાજ કેશવાળા)"
                delay="100"
              />
              <EventCard
                icon={<HeartHandshake size={20} className="sm:w-6 sm:h-6" />}
                title="॥ હસ્ત મેળાપ ॥"
                date="તા. ૦૩-૦૫-૨૦૨૬"
                time="રવિવાર, સાંજે ૭:૩૦ કલાકે"
                location="(પટેલ સમાજ કેશવાળા)"
                delay="100"
              />
            </div>
          </div>
        </section>

        {/* Family Details */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 bg-white/60 relative z-10">
          <div className="mb-10 sm:mb-12" data-aos="fade-up">
            <div className="text-center mb-5 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#8b0000] mb-2">
                !! વહાલ વરસાવતા વડીલો !!
              </h2>
              <div className="decorative-line w-20 sm:w-24 mx-auto"></div>
            </div>

            <div className="bg-red-50/90 p-4 sm:p-5 rounded-2xl border border-red-100 shadow-sm text-center text-xs sm:text-sm font-medium text-gray-800 cursor-default">
              {/* Changed layout to grid-cols-2 so husband and wife are always forced in the same row and left aligned */}
              <div className="grid grid-cols-2 gap-x-2 sm:gap-x-6 gap-y-3 sm:gap-y-2 items-center">
                <p className="text-left">સ્વ. વલ્લભભાઈ મોહનભાઈ તળાવીયા</p>
                <p className="text-left">શ્રી રળીયાતબેન વલ્લભભાઈ તળાવીયા</p>

                <p className="text-left">શ્રી વિરજીભાઈ મોહનભાઈ તળાવીયા</p>
                <p className="text-left">શ્રી કાંતાબેન વિરજીભાઈ તળાવીયા</p>

                <p className="text-left">શ્રી ધીરુભાઈ મોહનભાઈ તળાવીયા</p>
                <p className="text-left">શ્રી દુર્ગાબેન ધીરુભાઈ તળાવીયા</p>

                <p className="text-left">શ્રી અશોકભાઈ વલ્લભભાઈ તળાવીયા</p>
                <p className="text-left">શ્રી નિતાબેન અશોકભાઈ તળાવીયા</p>

                <p className="text-left">શ્રી અનિલભાઈ વલ્લભભાઈ તળાવીયા</p>
                <p className="text-left">શ્રી દક્ષાબેન અનિલભાઈ તળાવીયા</p>

                <p className="text-left">શ્રી નીતિનભાઈ વલ્લભભાઈ તળાવીયા</p>
                <p className="text-left">શ્રી શિલ્પાબેન નીતિનભાઈ તળાવીયા</p>

                <p className="text-left">શ્રી ધર્મેશભાઈ વિરજીભાઈ તળાવીયા</p>
                <p className="text-left">શ્રી કિરણબેન ધર્મેશભાઈ તળાવીયા</p>

                <p className="text-left">શ્રી કમલેશભાઈ ધીરુભાઈ તળાવીયા</p>
                <p className="text-left">શ્રી રિંકલબેન કમલેશભાઈ તળાવીયા</p>

                <p className="text-left">શ્રી પ્રકાશભાઈ ધીરુભાઈ તળાવીયા</p>
              </div>
            </div>
          </div>

          <div className="mb-10 sm:mb-12" data-aos="fade-up">
            <div className="text-center mb-5 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#8b0000] mb-2">
                !! દર્શનાભિલાષી !!
              </h2>
              <div className="decorative-line w-16 sm:w-20 mx-auto"></div>
            </div>
            <div className="flex flex-col items-center space-y-1.5 text-xs sm:text-sm font-bold text-gray-700">
              <p>શ્રી ક્રિશ અનિલભાઈ તળાવીયા</p>
              <p>શ્રી મોહિત નીતિનભાઈ તળાવીયા</p>
              <p>શ્રી ધ્રુવ નીતિનભાઈ તળાવીયા</p>
              <p>શ્રી શ્યામ ધર્મેશભાઈ તળાવીયા</p>
              <p>શ્રી જિયાન કમલેશભાઈ તળાવીયા</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div
              className="w-full sm:w-1/2 bg-[#fdfbf7]/95 p-4 sm:p-5 rounded-2xl shadow-sm border border-[#d4af37]/20 text-center"
              data-aos="fade-up">
              <h3 className="text-lg sm:text-xl font-bold text-[#8b0000] mb-2 sm:mb-3">
                !! મોસાળ પક્ષ !!
              </h3>
              <div className="space-y-1.5 text-gray-800 text-[11px] sm:text-xs font-medium">
                <p>શ્રી ભરતભાઈ છગનભાઈ વઘાસીયા (સુલતાનપુર)</p>
                <p>શ્રી ધર્મેશભાઈ છગનભાઈ વઘાસીયા (સુલતાનપુર)</p>
                <p>શ્રી લક્ષિતભાઈ ભરતભાઈ વઘાસીયા</p>
                <p>શ્રી ઋત્વિકભાઈ ભરતભાઈ વઘાસીયા</p>
                <p>શ્રી જશ ધર્મેશભાઈ વઘાસીયા</p>
              </div>
            </div>

            <div
              className="w-full sm:w-1/2 bg-[#fdfbf7]/95 p-4 sm:p-5 rounded-2xl shadow-sm border border-[#d4af37]/20 text-center flex flex-col justify-center"
              data-aos="fade-up">
              <h3 className="text-lg sm:text-xl font-bold text-[#8b0000] mb-2 sm:mb-3">
                !! ભાણેજ પક્ષ !!
              </h3>
              <p className="text-sm sm:text-base font-bold text-gray-800">
                શ્રી વિરાજ દિનેશભાઈ ગજેરા
              </p>
            </div>
          </div>
        </section>

        {/* Quotes Section */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 bg-[#f9f5ed]/70 relative z-10">
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="text-center" data-aos="zoom-in">
              <h2 className="text-xl sm:text-2xl font-bold text-[#8b0000] mb-3 sm:mb-4">
                !! કલરવ !!
              </h2>
              <div className="relative inline-block px-4 sm:px-6 py-3 sm:py-4">
                <Quote
                  size={20}
                  className="absolute top-0 left-0 text-[#d4af37] opacity-50 transform -scale-x-100 sm:w-6 sm:h-6"
                />
                <p className="text-[11px] sm:text-sm text-gray-700 italic leading-relaxed font-medium">
                  કૃષ્ણ વિના વૃંદાવન સૂનુ, ખળખળતા નીર વગર નદી સુની,
                  <br />
                  કોયલના ટહુકાર વગર વનરાઈ સુની, મોરના ટહુકાર વગર
                  <br />
                  મેઘગર્જના સુની, આપના આગમન વગર
                  <br />
                  અમારો અવસર સુનો,
                </p>
                <Quote
                  size={20}
                  className="absolute bottom-0 right-0 text-[#d4af37] opacity-50 sm:w-6 sm:h-6"
                />
              </div>
              <p className="mt-3 sm:mt-4 text-[11px] sm:text-sm font-bold text-[#8b0000]">
                દ્રષ્ટિ, નિયતિ, રૂતાંશી, વિહા, મીરાલી, કાવ્યા, જીયા, ધાની,
                ગ્રીવા
              </p>
            </div>

            <div className="decorative-line w-full opacity-30 my-0"></div>

            <div className="text-center" data-aos="zoom-in">
              <h2 className="text-xl sm:text-2xl font-bold text-[#8b0000] mb-3 sm:mb-4">
                !! વહાલી પુત્રવધુ !!
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-700 italic leading-relaxed font-medium mb-3 sm:mb-4">
                બાબુલના ઘરથી વિદાય લઈ સાસરીયુ શોભાવવા આવજે..
                <br />
                માતા પિતાના સંસ્કાર લઈ સૌને રીઝવવા આવજે....
                <br />
                વહુ તો સહુ બને પણ તું અમારી દિકરી બનીને આવજે...
                <br />
                હૈયું ભરાશે તારુ પણ ગૌરવ અમારું વધી જશે..
              </p>
              <div className="font-bold text-[11px] sm:text-sm text-gray-800 space-y-1">
                <p>અ.સૌ. નિતાબેન અશોકભાઈ તળાવીયા.</p>
                <p>શ્રી અશોકભાઈ વલ્લભભાઈ તળાવીયા.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Venues Section */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 bg-white/60 relative z-10 pb-14 sm:pb-16">
          <div className="text-center mb-6 sm:mb-8" data-aos="fade-down">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#8b0000] mb-2">
              લગ્ન સ્થળ
            </h2>
            <div className="decorative-line w-24 sm:w-32 mx-auto"></div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            <LocationCard
              icon={<MapPin size={20} className="sm:w-6 sm:h-6" />}
              title="!! મુખ્ય લગ્ન સ્થળ !!"
              host="શ્રી અશોકભાઈ વલ્લભભાઈ તળાવીયા"
              name="રાધેશ્યામ લેઉવા પટેલ વાડી"
              address="કોલેજ ચોક, યોગીનગર, ગોંડલ."
              link="https://maps.app.goo.gl/QFxPbnvhbPruHX4c7"
            />
            <LocationCard
              icon={<Home size={20} className="sm:w-6 sm:h-6" />}
              title="!! મહેકતું આંગણું !!"
              host="શ્રી અશોકભાઈ વલ્લભભાઈ તળાવીયા"
              name="મું. પાંચિયાવાદર તા. ગોંડલ"
              phone="૯૯૭૮૨ ૯૦૪૭૧"
              link="https://maps.app.goo.gl/YCTAiqjLYcmdP9tp6"
            />
            <LocationCard
              icon={<MapPin size={20} className="sm:w-6 sm:h-6" />}
              title="!! શુભ લગ્ન સ્થળ !!"
              host="શ્રી બીપીનભાઈ ધીરુભાઈ વાડોદરિયા"
              name="મું. કેશવાળા તા ગોંડલ"
              phone="૬૩૫૨૪ ૨૧૩૭૬"
              link="https://maps.app.goo.gl/8uJD3AjgRWMjrAVC8"
            />
          </div>
        </section>

        {/* Footer */}
        {/* Added extra padding bottom (pb-24) to prevent Share/Audio buttons from blocking text on mobile */}
        <footer className="bg-[#3e2723] text-[#fdfbf7] pt-8 pb-24 sm:pt-10 sm:pb-10 px-4 sm:px-6 border-t-4 border-[#d4af37] relative z-20 text-center sm:rounded-b-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-4 sm:mb-5 tracking-widest">
            :: નિમંત્રક ::
          </h2>

          <div className="space-y-1 sm:space-y-1.5 text-sm sm:text-base font-medium mb-5 sm:mb-6">
            <p>શ્રી અશોકભાઈ વલ્લભભાઈ તળાવીયા</p>
            <p>શ્રી અનિલભાઈ વલ્લભભાઈ તળાવીયા</p>
            <p>શ્રી નિતિનભાઈ વલ્લભભાઈ તળાવીયા</p>
          </div>

          <p className="text-[11px] sm:text-sm text-gray-300 mb-2">
            મું. પાંચિયાવાદર તા. ગોંડલ જી. રાજકોટ
          </p>
          <p className="text-base sm:text-lg text-[#d4af37] font-bold mb-5 sm:mb-6">
            મો. ૯૯૭૮૨ ૯૦૪૭૧
          </p>

          <div className="w-full h-px bg-gray-600 mb-5 sm:mb-6"></div>

          <p className="text-[10px] sm:text-xs text-gray-400 font-sans">
            Made with{" "}
            <Heart
              size={10}
              className="inline text-red-500 mx-1 sm:w-3 sm:h-3"
              fill="currentColor"
            />{" "}
            for the Talaviya Family
          </p>
          <br />
          <p className="text-[10px] sm:text-xs text-gray-400 font-sans flex items-center justify-center gap-2">
            By
            <span className="text-[#d4af37] font-semibold">Dezin Valley</span>
            <a
              href="https://instagram.com/dezin_valley"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition">
              <Instagram size={20} />
            </a>
          </p>
        </footer>
      </div>

      {/* Floating Action Buttons (Share & Audio) - Adjusted for mobile visibility */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:right-10 flex flex-col gap-3 sm:gap-4 z-50">
        <button
          onClick={handleShare}
          className="bg-[#8b0000] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-xl flex items-center justify-center hover:bg-red-800 transition-all border-2 border-[#d4af37] hover:scale-110">
          <Share2 size={16} className="sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={toggleAudio}
          className={`bg-[#8b0000] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-xl flex items-center justify-center hover:bg-red-800 transition-colors border-2 border-[#d4af37] hover:scale-110 ${isPlaying ? "" : "animate-pulse"}`}>
          {isPlaying ? (
            <Volume2 size={16} className="sm:w-5 sm:h-5" />
          ) : (
            <Music size={16} className="sm:w-5 sm:h-5" />
          )}
        </button>
      </div>

      {/* Toast Message for Copy Link */}
      {showToast && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full z-50 text-xs sm:text-sm backdrop-blur-sm border border-gray-600 shadow-lg animate-bounce whitespace-nowrap">
          લિંક કોપી થઈ ગઈ છે!
        </div>
      )}
    </div>
  );
}

// Reusable Components
function EventCard({ icon, title, date, time, location, delay }) {
  return (
    <div
      className="group bg-white/95 rounded-xl p-4 sm:p-5 shadow-sm border-b-2 border-[#d4af37] text-center"
      data-aos="fade-up"
      data-aos-delay={delay}>
      <div className="text-[#8b0000] flex justify-center mb-2">{icon}</div>
      <h3 className="text-base sm:text-lg font-bold text-[#8b0000] mb-1">
        {title}
      </h3>
      <p className="font-bold text-xs sm:text-sm text-gray-800">{date}</p>
      <p className="text-[11px] sm:text-xs text-gray-600 font-medium mb-1.5 sm:mb-2">
        {time}
      </p>
      <p className="text-[9px] sm:text-[10px] text-gray-500 bg-gray-50 py-0.5 px-2 rounded-full inline-block">
        {location}
      </p>
    </div>
  );
}

function LocationCard({ icon, title, host, name, address, phone, link }) {
  return (
    <div
      className="bg-[#fdfbf7]/95 p-4 sm:p-5 rounded-xl shadow-sm border-t-2 border-[#8b0000] text-center"
      data-aos="fade-up">
      <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-2 sm:mb-3 text-[#8b0000]">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[#8b0000] mb-1">
        {title}
      </h3>
      <p className="font-bold text-xs sm:text-sm text-gray-800 mb-1">{host}</p>
      {address ? (
        <>
          <p className="text-[11px] sm:text-sm text-[#d4af37] font-bold">
            {name}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 mb-3 sm:mb-4">
            {address}
          </p>
        </>
      ) : (
        <>
          <p className="text-[11px] sm:text-sm text-[#d4af37] font-bold">
            {name}
          </p>
          <p className="inline-flex items-center justify-center mt-3 mb-3 border border-[#d4af37] text-[#d4af37] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold shadow-sm w-full gap-1.5 sm:gap-2 hover:bg-[#d4af37] hover:text-white transition">
            {" "}
            <Phone size={12} className="sm:w-3.5 sm:h-3.5" />
            <a href={`tel:${phone}`} className="hover:underline">
              {phone}
            </a>
          </p>
        </>
      )}
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center btn-gold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold shadow-md w-full gap-1.5 sm:gap-2">
        <Map size={14} className="sm:w-4 sm:h-4" /> લોકેશન જુઓ
      </a>
    </div>
  );
}
