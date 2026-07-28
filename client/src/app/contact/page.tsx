import { FaInstagram } from "react-icons/fa";
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-12">
          Contact Us
        </h1>

        {/* Contact Information */}

        <div className="bg-[#111] border border-yellow-500/20 rounded-3xl p-8">

          <h2 className="text-3xl font-bold text-white mb-8">
            Contact Information
          </h2>

          <div className="space-y-8">

            {/* Phone */}

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
                📞
              </div>

              <div>

                <h3 className="text-lg font-semibold text-white">
                  Phone
                </h3>

                <a
                  href="tel:+917317316464"
                  className="text-gray-400 hover:text-yellow-500 transition"
                >
                  +91 73173 16464
                </a>

              </div>

            </div>

            {/* WhatsApp */}

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                💬
              </div>

              <div>

                <h3 className="text-lg font-semibold text-white">
                  WhatsApp
                </h3>

                <a
                  href="https://wa.me/918447777225"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition"
                >
                  +91 84477 77225
                </a>

              </div>

            </div>

            {/* Address */}

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black">
                📍
              </div>

              <div>

                <h3 className="text-lg font-semibold text-white">
                  Showroom Address
                </h3>

                <p className="text-gray-400 leading-7">
                  Y-11, Loha Mandi,<br />
                  Block Y,<br />
                  Naraina Industrial Area Phase 1,<br />
                  Naraina, Delhi – 110028
                </p>

              </div>

            </div>

            {/* Business Hours */}

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black">
                🕒
              </div>

              <div>

                <h3 className="text-lg font-semibold text-white">
                  Business Hours
                </h3>

                <div className="text-gray-400 space-y-1">

                  <p>Monday : Closed</p>
                  <p>Tuesday : 9:00 AM – 7:00 PM</p>
                  <p>Wednesday : 9:00 AM – 7:00 PM</p>
                  <p>Thursday : 9:00 AM – 7:00 PM</p>
                  <p>Friday : 9:00 AM – 7:00 PM</p>
                  <p>Saturday : 9:00 AM – 7:00 PM</p>
                  <p>Sunday : 9:00 AM – 7:00 PM</p>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <a
              href="https://maps.app.goo.gl/1KWjLPCUt53USYXu9?g_st=iw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-yellow-500 text-black py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
            >
              Open in Google Maps
            </a>

            <a
  href="https://www.instagram.com/roaring_machines__?igsh=MTJhaGN3bGVqeWg1eQ=="
  target="_blank"
  rel="noopener noreferrer"
  className="border border-yellow-500 text-yellow-500 py-4 rounded-full hover:bg-yellow-500 hover:text-black transition flex items-center justify-center gap-2"
>
  <FaInstagram size={18} />
  <span>Visit Instagram</span>
</a>

          </div>

        </div>

      </div>
    </main>
  );
}