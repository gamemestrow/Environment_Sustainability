import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-100">
      <Navbar />
      
      {/* HERO */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-green-500 mb-6">
          Clean Cities Start With You
        </h1>
        <p className="max-w-2xl text-zinc-400 text-lg mb-8">
          Report garbage issues in your city with just a photo and location.
          Help authorities act faster and make neighborhoods cleaner.
        </p>
        <button className="bg-green-600 hover:bg-green-500 text-black font-semibold px-8 py-3 rounded-lg transition">
          Report Waste
        </button>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-400 mb-6">
          About the Platform
        </h2>
        <p className="text-zinc-400 leading-relaxed max-w-3xl">
          Garbage problems often go unnoticed or unreported, leading to unhealthy
          living conditions. Our Waste Management Reporting System bridges the gap
          between citizens and authorities by providing a simple way to report
          waste issues and track their resolution status.
        </p>
      </section>

      {/* HOW TO REPORT */}
      <section className="py-20 bg-zinc-900 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-400 mb-12">
            How to Report Waste
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-500 mb-3">
                1. Capture the Issue
              </h3>
              <p className="text-zinc-400">
                Take a photo of the garbage or waste problem using your phone.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-500 mb-3">
                2. Add Location
              </h3>
              <p className="text-zinc-400">
                Share the exact location so authorities know where to act.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-500 mb-3">
                3. Track Status
              </h3>
              <p className="text-zinc-400">
                Follow the progress from <span className="text-yellow-400">Pending</span> to{" "}
                <span className="text-green-400">Resolved</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-400 mb-12">
          What People Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <p className="text-zinc-300 mb-4">
              “This platform made it easy to report garbage near my home.
              The issue was resolved within days.”
            </p>
            <span className="text-green-500 font-semibold">
              — Local Resident
            </span>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <p className="text-zinc-300 mb-4">
              “A powerful civic-tech solution that improves transparency
              and accountability.”
            </p>
            <span className="text-green-500 font-semibold">
              — NGO Volunteer
            </span>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <p className="text-zinc-300 mb-4">
              “Tracking complaint status helped build trust between citizens
              and authorities.”
            </p>
            <span className="text-green-500 font-semibold">
              — City Official
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
