import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const UttamNagarOfficeCTA = () => {
  return (
    <section className="w-full flex justify-center py-10 px-2 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
      <div className="w-full max-w-5xl bg-zinc-900/80 rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-green-700/30">
        {/* Info Section */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-400 mb-3">
            Join Our Office Batch in Uttam Nagar!
          </h2>
          <p className="text-zinc-200 mb-3 text-lg">
            Are you from{" "}
            <span className="font-semibold text-green-300">
              Uttam Nagar, New Delhi, India
            </span>
            ?<br />
            Join our in-person office batch at our branch:
          </p>
          <div className="flex items-start gap-3 bg-zinc-800/80 p-4 rounded-lg border border-green-500/30 mb-4">
            <FaMapMarkerAlt className="text-green-400 text-2xl mt-1" />
            <div>
              <span className="block font-semibold text-white mb-1">
                Address:
              </span>
              <span className="text-green-200 text-base">
                Metro Pillar Number 654, Second floor, B-28, Hari Nagar, B
                Block, JJ Colony, Uttam Nagar, New Delhi, Delhi, 110059
              </span>
            </div>
          </div>
          <p className="text-zinc-400 mb-4 text-base">
            Contact us now to join, or reach out for more details!
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="tel:+919220797499"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPhoneAlt className="text-lg" /> Call Now
            </a>
            <a
              href="https://wa.me/919220797499?text=I%20am%20interested%20in%20joining%20the%20office%20batch%20at%20Uttam%20Nagar"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-lg" /> WhatsApp
            </a>
            <a
              href="mailto:service@monarkfx.com?subject=Office%20Batch%20Uttam%20Nagar%20Enquiry"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope className="text-lg" /> Email
            </a>
          </div>
        </div>
        {/* Map Section */}
        <div className="flex-shrink-0 w-full md:w-[350px] bg-zinc-950 flex items-center justify-center p-4 md:p-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1810840039375!2d77.0610743755005!3d28.62433437566924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d058569e87c21%3A0xf42cb1ff733f175d!2sMonark%20FX%20-%20Stock%20Market%20Institute!5e0!3m2!1sen!2sin!4v1753284393656!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl border border-green-500/20 shadow-md w-full h-[250px] md:w-[320px] md:h-[250px]"
            title="Monark FX Uttam Nagar Map"
          />
        </div>
      </div>
    </section>
  );
};

export default UttamNagarOfficeCTA;
