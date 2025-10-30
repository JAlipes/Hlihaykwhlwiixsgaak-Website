import { useNavigate } from "react-router-dom";
import { LuArrowLeft} from 'react-icons/lu'
// Import Components
import ResumeSection from "../components/ResumeSections";

// Import Texts
import { 
    resumeProfileText, 
    resumeExecutiveExpText, 
    resumeCommunityInvolvementText, 
    resumeProfessionalDevText, 
    resumePostSecCredsText, 
    resumeAdditionalInfoText, 
    resumeTravelExpText 
} from "../lang/en/englishText";

export default function ResumePage() {
    const navigate = useNavigate();

    const HandleBackClick = () => {
        navigate("/", { state: { scrollTo: "experience" } });    
    };

    return (
        <>  
            {/* Header with Back Arrow */}
            <div className="relative flex items-center justify-center pt-32 pb-8">
                {/* Back button (top-left corner of title area) */}
                <button
                    onClick={HandleBackClick}
                    className="absolute left-6 md:left-12 flex items-center gap-2 text-black hover:text-red-700 transition"
                    aria-label="Go back to Experience"
                >
                    <LuArrowLeft className="w-6 h-6" />
                </button>

                {/* Centered title */}
                <h2 className="text-3xl md:text-4xl text-brandRed text-center">
                    CV Melanie Mark
                </h2>
            </div>

            {/* Resume container for padding and spacing */}
            <div className="px-6 sm:px-12 md:px-24 lg:px-32 py-4 space-y-10">

                <ResumeSection
                    defaultSectionText={resumeProfileText}
                    sectionName="profileSection"
                    sectionId="profile"
                />

                <ResumeSection
                    defaultSectionText={resumeExecutiveExpText}
                    sectionName="executiveExperienceSection"
                    sectionId="executiveExperience"
                />

                <ResumeSection
                    defaultSectionText={resumeCommunityInvolvementText}
                    sectionName="communityInvolvementSection"
                    sectionId="communityInvolvement"
                />

                <ResumeSection
                    defaultSectionText={resumeProfessionalDevText}
                    sectionName="professionalDevelopmentSection"
                    sectionId="professionalDevelopment"
                />

                <ResumeSection
                    defaultSectionText={resumePostSecCredsText}
                    sectionName="postSecondaryCredentialsSection"
                    sectionId="postSecondaryCredentials"
                />

                <ResumeSection
                    defaultSectionText={resumeAdditionalInfoText}
                    sectionName="additionalInformationSection"
                    sectionId="additionalInformation"
                />

                <ResumeSection
                    defaultSectionText={resumeTravelExpText}
                    sectionName="travelExperienceSection"
                    sectionId="travelExperience"
                />

            </div>
        </>
    );
}
