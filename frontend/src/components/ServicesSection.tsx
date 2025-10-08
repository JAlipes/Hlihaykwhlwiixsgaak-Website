// Import Assets
import groupImage from '../assets/BCFS_Keynote_Group.jpg'
import headshot from "../assets/MJM_FINAL_HEADSHOT_2024_BLUE_WHITE.jpg"
import workshopImage from '../assets/Fora_Workshop_Screenshot_June13_2025 PM.png';
import publicSpeakingImage from '../assets/WORTH_Keynote_2025_Summit.jpg';

import ServiceImageLeftSection from "./ServiceImageLeftSection";
import ServiceImageRightSection from "./ServiceImageRightSection";

export default function ServicesSection() {
    return (
        <section className="relative w-full bg-gradient-to-b from-white to-gray-50 pb-16">
            {/* Header */}
            <div className="relative">
                <img
                    src={groupImage}
                    alt="Group of people together"
                    className="w-full h-auto rounded-b-[100px] shadow-2xl shadow-black/50"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-lg w-[90%] max-w-4xl border border-gray-200">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-[#C32148] tracking-wide">
                        Let’s Navigate Your Journey Together
                    </h2>
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-5xl mx-auto mt-20 text-center px-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-[#8B0000] mb-6">
                    Hli Haykwhl Ẃii Xsgaak Services
                </h2>
                <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
                    Reconciliation isn’t a Destination–it's a Journey. Who’s in your canoe? Are you paddling together?
                    What are the conditions? What direction do you want to go? Let me know how I can be a part of your journey.
                </p>
            </div>

            {/* Editable Service Sections */}
            <ServiceImageLeftSection
    sectionName="advisory"
    defaultTitle="Advisory & Public Relations"
    defaultImage={headshot}
    defaultContent={`
<b class='block font-bold text-xl mb-2'>Governmental and Non-Partisan Political Relations</b>
<ul class='list-disc list-inside space-y-2 text-lg'>
  <li>I’ll offer high-level strategic advice to guide you through complex systems and successfully implement change.</li>
  <li>I’ll direct you to the right organization, decision makers, government body, business, public institution, or First Nation to advance your ideas.</li>
  <li>I’ll support you in narrowing your 30 big ideas into 3 attainable outcomes.</li>
  <li>I’ll review your draft documents and provide advice on how to prepare, approach, and engage with the B.C. public service, B.C. MLAs, Official Opposition, Cabinet Ministers, First Nations Leadership, and other stakeholders.</li>
  <li>I’ll keep your approach focused and efficient, ensuring your time is used wisely.</li>
</ul>`}
    imagePosition="left"
/>

<ServiceImageRightSection
    sectionName="services-leadership"
    defaultTitle="Leadership Development & Workshops"
    defaultImage={workshopImage}
    defaultContent={`
<b class='block font-bold text-xl mb-2'>Building Capacity & Empowerment</b>
<ul class='list-disc list-inside space-y-2 text-lg'>
  <li>Customized training for leadership and reconciliation goals.</li>
  <li>Hands-on workshops to strengthen organizational collaboration.</li>
  <li>Focused discussions on building equity and understanding across teams.</li>
</ul>`}
/>

<ServiceImageLeftSection
    sectionName="services-community"
    defaultTitle="Community Engagement"
    defaultImage={publicSpeakingImage}
    defaultContent={`
<b class='block font-bold text-xl mb-2'>Strengthening Relationships</b>
<ul class='list-disc list-inside space-y-2 text-lg'>
  <li>Facilitating meaningful dialogue between diverse communities.</li>
  <li>Encouraging shared action toward sustainable reconciliation.</li>
  <li>Supporting inclusive initiatives that celebrate Indigenous culture and leadership.</li>
</ul>`}
    imagePosition="left"
/>

            {/* Added Embeded Video Section */}
        </section>
    );
}
