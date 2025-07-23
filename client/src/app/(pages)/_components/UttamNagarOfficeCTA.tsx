const UttamNagarOfficeCTA = () => {
  return (
    <div className=" p-8  bg-gradient-to-tr from-zinc-900/95 to-black/95  flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-2">
          Join Our Office Batch in Uttam Nagar!
        </h2>
        <p className="text-zinc-200 mb-2">
          If you are from{" "}
          <span className="font-semibold text-green-300">
            Uttam Nagar, New Delhi, India
          </span>
          , you can join our in-person office batch at our branch:
        </p>
        <div className="bg-zinc-900/80 p-4 rounded-lg border border-green-500/20 mb-3">
          <span className="block font-semibold text-white">Address:</span>
          <span className="text-green-300">
            Metro Pillar Number 654, Second floor, B-28, Hari Nagar, B Block, JJ
            Colony, Uttam Nagar, New Delhi, Delhi, 110059
          </span>
        </div>
        <p className="text-zinc-400 mb-2">
          Contact us now to join, or reach out for more details!
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="tel:+919220797499"
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-2 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            📞 Call Now
          </a>
          <a
            href="https://wa.me/919220797499?text=I%20am%20interested%20in%20joining%20the%20office%20batch%20at%20Uttam%20Nagar"
            className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center gap-2 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 WhatsApp
          </a>
          <a
            href="mailto:service@monarkfx.com?subject=Office%20Batch%20Uttam%20Nagar%20Enquiry"
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            ✉️ Email
          </a>
        </div>
      </div>
      <div className="flex-shrink-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1810840039375!2d77.0610743755005!3d28.62433437566924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d058569e87c21%3A0xf42cb1ff733f175d!2sMonark%20FX%20-%20Stock%20Market%20Institute!5e0!3m2!1sen!2sin!4v1753284393656!5m2!1sen!2sin"
          width="300"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg border border-green-500/20 shadow-md"
        />
      </div>
    </div>
  );
};

export default UttamNagarOfficeCTA;
