{ label: 'Seconds', value: ** timeLeft.seconds },
                  ].map((item, index) => (
                    <FadeInSection key={index} direction="scale" delay={index * 100}>
                      <div
                        className="p-4 sm:p-6 rounded-2xl shadow-lg border text-center"
                        style={{
                          backgroundColor: theme.cardBg,
                          borderColor: isBride
                            ? 'rgba(255,182,193,0.3)'
                            : 'rgba(212,175,55,0.3)',
                        }}
                      >
                        <span
                          className="block text-3xl sm:text-5xl font-bold font-serif mb-1"
                          style={{ color: isBride ? '#d87093' : '#d4af37' }}
                        >
                          {String(item.value).padStart(2, '0')}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest font-medium">
                          {item.label}
                        </span>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* INVITATION DETAILS */}
          <FadeInSection direction="up">
            <section
              id="invitation"
              className="py-12 sm:py-20 text-center"
              style={{ backgroundColor: theme.bgSection }}
            >
              <div className="max-w-3xl mx-auto px-4">
                <LuxuryGoldCard>
                  <div className="space-y-6">
                    <span
                      className="uppercase text-xs tracking-[0.3em] font-bold block"
                      style={{ color: isBride ? '#d87093' : '#d4af37' }}
                    >
                      You are Cordially Invited
                    </span>

                    <h2 className="text-3xl sm:text-5xl font-serif text-gray-900">
                      Join Our Celebration
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-light italic">
                      "Love fills the moment, and the moment fills a lifetime. We request the pleasure of your company as we exchange our engagement rings."
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center gap-3">
                        <CalendarIcon className="w-6 h-6 text-amber-600" />
                        <div className="text-left">
                          <span className="block text-xs text-gray-400 uppercase font-medium">Date & Time</span>
                          <span className="text-sm font-bold text-gray-800">Sept 30, 2026 @ 7:00 PM</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center gap-3">
                        <Shirt className="w-6 h-6 text-pink-600" />
                        <div className="text-left">
                          <span className="block text-xs text-gray-400 uppercase font-medium">Dress Code</span>
                          <span className="text-sm font-bold text-gray-800">Formal / Evening Wear</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:opacity-90 transition"
                        style={{ backgroundColor: isBride ? '#d87093' : '#2b2b2b' }}
                      >
                        <CalendarIcon className="w-4 h-4" /> Add to Google Calendar
                      </a>
                    </div>
                  </div>
                </LuxuryGoldCard>
              </div>
            </section>
          </FadeInSection>

          {/* LOCATION */}
          <FadeInSection direction="up">
            <section id="location" className="py-12 sm:py-20 bg-white">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <div
                  className="flex items-center justify-center gap-2 mb-2"
                  style={{ color: isBride ? '#d87093' : '#d4af37' }}
                >
                  <MapPin className="w-6 h-6" />
                  <h3 className="text-2xl sm:text-4xl font-serif text-gray-900">
                    The Venue
                  </h3>
                </div>

                <p className="text-gray-500 mb-8 text-sm">
                  Nile Hall, Nile Corniche, Imbaba, Giza
                </p>

                <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                  <iframe
                    title="Nile Hall Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.3664082264635!2d31.2091!3d30.0833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841029140d3a7%3A0x7d013f99d91f1a0!2sNile%20Hall!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                    width="100%"
                    height="380"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* RSVP - تأكيد الحضور */}
          <FadeInSection direction="up">
            <section
              id="rsvp"
              className="py-12 sm:py-20 text-center"
              style={{ backgroundColor: theme.bgMain }}
            >
              <div className="max-w-xl mx-auto px-4">
                <span
                  className="uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-bold block mb-2"
                  style={{ color: isBride ? '#d87093' : '#d4af37' }}
                >
                  Be Our Guest
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif mb-4 text-gray-900">
                  Confirm Your Attendance
                </h3>

                <div
                  className="inline-block mb-4 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold border max-w-full"
                  style={{
                    backgroundColor: theme.cardBg,
                    color: isBride ? '#d87093' : '#d4af37',
                    borderColor: isBride ? '#ffb6c1' : '#d4af37',
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
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!guestName.trim()) {
                      alert('Please enter your full name first!');
                      return;
                    }

                    const phone = isBride ? '201286993480' : '201062287123';
                    const text = `Hello! I am ${guestName} (${isBride ? "Bride's Side" : "Groom's Side"}), and I am delighted to confirm my attendance at Mohamed & Nada's engagement party! 💍✨`;
                    
                    const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;

                    setRsvpStatus(`Thank you, ${guestName}! Opening WhatsApp...`);
                    
                    confetti({
                      particleCount: 80,
                      spread: 70,
                      origin: { y: 0.8 },
                      colors: isBride ? ['#ffb6c1', '#d4af37'] : ['#2b2b2b', '#d4af37'],
                    });

                    const newWindow = window.open(waUrl, '_blank');
                    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                      window.location.href = waUrl;
                    }

                    try {
                      await navigator.clipboard.writeText(text);
                      setTimeout(() => {
                        setRsvpStatus(`Copied message! If WhatsApp didn't open, paste it directly to us.`);
                      }, 1000);
                    } catch (err) {
                      console.log('Clipboard error', err);
                    }
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl border focus:outline-none text-center text-base sm:text-lg bg-white shadow-sm"
                    style={{ borderColor: isBride ? '#ffb6c1' : '#d4af37' }}
                    required
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 bg-[#25D366] text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer uppercase text-[10px] sm:text-xs tracking-widest"
                  >
                    <Send className="w-4 h-4" />
                    Confirm via WhatsApp
                  </button>
                  
                  <p className="text-[10px] text-center text-gray-500 mt-1">
                    💡 iPhone users: If it doesn't open, open the link in Safari or Chrome.
                  </p>
                </form>

                {rsvpStatus && (
                  <div
                    className="mt-6 p-4 rounded-2xl border text-xs sm:text-sm font-semibold animate-fade-in"
                    style={{
                      backgroundColor: theme.cardBg,
                      color: isBride ? '#d87093' : '#333',
                    }}
                  >
                    {rsvpStatus}
                  </div>
                )}
              </div>
            </section>
          </FadeInSection>

          {/* WISHES - حائط التهاني والأمنيات */}
          <FadeInSection direction="up">
            <section
              id="wishes-wall"
              className="py-12 sm:py-20"
              style={{ backgroundColor: theme.bgSection }}
            >
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8 sm:mb-12">
                  <div
                    className="flex items-center justify-center gap-2 mb-2"
                    style={{ color: isBride ? '#d87093' : '#d4af37' }}
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
                  <form onSubmit={handleWishSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={wishName}
                      onChange={e => setWishName(e.target.value)}
                      className="w-full px-5 py-3 rounded-2xl border focus:outline-none bg-white text-gray-900 text-sm sm:text-base"
                      style={{ borderColor: isBride ? '#ffb6c1' : '#d4af37' }}
                      required
                    />

                    <textarea
                      placeholder="Write your heartfelt wish here..."
                      rows={4}
                      value={wishMessage}
                      onChange={e => setWishMessage(e.target.value)}
                      className="w-full px-5 py-3 rounded-2xl border focus:outline-none bg-white text-gray-900 text-sm sm:text-base resize-none"
                      style={{ borderColor: isBride ? '#ffb6c1' : '#d4af37' }}
                      required
                    />

                    <button
                      type="submit"
                      className="w-full py-3.5 text-white font-bold rounded-2xl shadow-md transition uppercase text-[10px] sm:text-xs tracking-widest cursor-pointer"
                      style={{ backgroundColor: isBride ? '#d87093' : '#2b2b2b' }}
                    >
                      Send Wish ✨
                    </button>
                  </form>
                </div>

                {/* عرض قائمة التهاني */}
                <div className="grid gap-4">
                  {wishes.length === 0 ? (
                    <p className="text-center text-gray-400 py-6 text-sm">
                      كن أول من يترك تهنئة للعروسين! ✨
                    </p>
                  ) : (
                    wishes.map((wish, index) => (
                      <FadeInSection key={index} direction="up" delay={index * 50}>
                        <div
                          className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border"
                          style={{
                            borderColor: isBride
                              ? 'rgba(255,182,193,0.3)'
                              : 'rgba(212,175,55,0.3)',
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                            <span className="font-serif font-bold text-gray-900 text-base sm:text-lg wrap-break-word">
                              {wish.name}
                            </span>
                            <span className="text-xs text-gray-400">{wish.date}</span>
                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed wrap-break-word">
                            {wish.message}
                          </p>
                        </div>
                      </FadeInSection>
                    ))
                  )}
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* GALLERY - معرض الصور */}
          <FadeInSection direction="up">
            <section id="gallery" className="py-12 sm:py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <div
                  className="flex items-center justify-center gap-2 mb-2"
                  style={{ color: isBride ? "#d87093" : "#d4af37" }}
                >
                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-2xl sm:text-4xl font-serif text-gray-900">
                    Our Story in Pictures
                  </h3>
                </div>

                <p className="text-gray-500 mb-8 sm:mb-12 text-xs sm:text-base px-2">
                  Sweet childhood memories and wonderful moments leading to forever.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  {galleryItems.map((item, index) => (
                    <FadeInSection key={index} direction="scale" delay={index * 100}>
                      <div
                        className="p-3 rounded-3xl shadow-xl border group overflow-hidden h-full flex flex-col justify-between"
                        style={{
                          backgroundColor: theme.cardBg,
                          borderColor: isBride
                            ? "rgba(255,182,193,0.3)"
                            : "rgba(212,175,55,0.3)",
                        }}
                      >
                        <div
                          className={`overflow-hidden rounded-2xl mb-3 ${
                            index === galleryItems.length - 1 ? "aspect-3/4" : ""
                          }`}
                        >
                          <img
                            src={item.img}
                            alt={item.caption}
                            loading="lazy"
                            className={`w-full rounded-2xl group-hover:scale-105 transition duration-700 ${
                              index === galleryItems.length - 1
                                ? "h-full object-cover"
                                : "h-auto object-contain"
                            }`}
                          />
                        </div>

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

          {/* FOOTER - الفوتر السفلي */}
          <footer
            id="footer"
            className="py-6 text-center border-t transition-colors duration-500"
            style={{
              backgroundColor: isBride ? '#fff0f5' : '#121212',
              borderColor: isBride
                ? 'rgba(216, 112, 147, 0.2)'
                : 'rgba(212, 175, 55, 0.2)',
              color: isBride ? '#501525' : '#ffffff',
            }}
          >
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center space-y-5 sm:space-y-6">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <span
                  className="h-px w-8 sm:w-12"
                  style={{ backgroundColor: isBride ? '#d87093' : '#d4af37' }}
                />

                <div
                  className="p-2 sm:p-3 rounded-full shadow-md border"
                  style={{
                    backgroundColor: isBride ? '#ffffff' : '#1a1a1a',
                    borderColor: isBride
                      ? 'rgba(216, 112, 147, 0.3)'
                      : 'rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <Heart
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-pulse"
                    style={{ color: isBride ? '#d87093' : '#d4af37' }}
                  />
                </div>

                <span
                  className="h-px w-8 sm:w-12"
                  style={{ backgroundColor: isBride ? '#d87093' : '#d4af37' }}
                />
              </div>

              <div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide mb-2"
                  style={{ color: isBride ? '#501525' : '#ffffff' }}
                >
                  <span style={{ color: isBride ? '#d87093' : '#d4af37' }}>
                    Mohamed
                  </span>
                  {' & '}
                  <span style={{ color: isBride ? '#d87093' : '#d4af37' }}>
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
