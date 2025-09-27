import headshot from '../assets/MJM_FINAL_HEADSHOT_2024_BLUE_WHITE.jpg';

export default function ExperienceSection() {
  return (
    <section className="bg-gray-100 text-gray-800 h-screen flex flex-col py-12 px-6 md:px-20 lg:px-32">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-red-600 mt-12">
          Experience
        </h2>
        <div className="w-48 h-[2px] bg-black mt-3 mx-auto" />
      </div>

      {/* Content: Image left, Text right */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 gap-12">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={headshot}
            alt="Melanie Mark"
            className="w-full max-w-[500px] h-[500px] object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="text-2xl font-light text-red-600 mb-6 text-center">
            Profile Summary
          </h3>
          <ul className="list-disc list-outside space-y-4 text-lg leading-relaxed">
            <li>
              A results-oriented, charismatic, determined, knowledgeable, and
              experienced First Nation’s matriarch with reMARKable leadership,
              strategic thinking, advocacy, public speaking, communication,
              facilitation, and interpersonal skills.
            </li>
            <li>
              A pragmatic visionary leader, with a strong acumen navigating
              complex systems and public relations, supported by a solid track
              record of advancing public policy, programs, and provincial
              legislation.
            </li>
            <li>
              An Elder-in-training, with a deep understanding of colonialism and
              the devastating impacts of the Indian residential schools; actively
              cultivating personal/Indigenous people’s history, cultural
              practices, protocols, customs, and traditions through family,
              community, post-secondary education, and professional teachings.
            </li>
            <li>
              Spent three decades building respectful and meaningful
              relationships with local xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh
              (Squamish), and səlilwətaɬ (Tsleil-Waututh) Nations and
              elected/hereditary First Nation leaders across B.C. based on the
              principles of Rights, Recognition, and Respect.
            </li>
          </ul>

          {/* Button */}
          <div className="mt-8 flex justify-center">
            <button className="bg-red-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-700 transition">
              Explore more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
