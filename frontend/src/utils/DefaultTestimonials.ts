import type { TestimonialType } from '../../../shared-types/SectionTypes';

import CMAW from '../assets/CMAW testimonial 1.jpg';
import COV_Logo from '../assets/COV Logo.png';
import YWCA from '../assets/YWCA Workshop.jpg';
import WORTH from '../assets/WORTH_Keynote_2025_Summit.jpg';
import WCCDA from '../assets/WCCDA 2_2_2025.jpg';
import FORA from '../assets/Fora_Workshop_Screenshot_June13_2025 PM.png';
import IPSS from '../assets/Indigenous peoples success pic 3.jpg';
import HopeHealth from '../assets/Hope_Health_MOC_Screen Shot 2025-03-29 at 1.37.08 PM.png';
// import Hollyhock from '../assets/'; // Placeholder for future image import
import BCFS from '../assets/BCFS_Keynote_Podium.jpg';

// Defaults-only presentation helpers (scoped to this file)
const DEFAULT_TEXT_ALIGN_CLASS = 'ql-align-center';
const DEFAULT_TEXT_COLOR_STYLE = 'color:#fff'; // set '' to skip color
// Use a span for color since Quill preserves inline color on spans
const wrapDefault = (html: string) =>
  `<div class="${DEFAULT_TEXT_ALIGN_CLASS}"><span style="${DEFAULT_TEXT_COLOR_STYLE}">${html}</span></div>`;



// Hardcoded fallback testimonials used when the backend fails or returns no data
export const DEFAULT_TESTIMONIALS: TestimonialType[] = [
  {
    image: CMAW,
    text: wrapDefault(`"Melanie, your keynote address was incredible. Your passion, warmth, and energy captivated our delegates. It was a privilege to have you speak at our convention, and your words will continue to inspire."<br/><br/>— Chris Wasilenchuk, President<br/><br/><em>CMAW Canada Convention</em>`),
  },
  {
    image: COV_Logo,
    text: wrapDefault(`"Melanie’s workshop helped us refocus and understand the importance of discipline in our work. Her vulnerability, humor, and real-life examples were powerful. We could have listened to her for hours!"<br/><br/>— City of Vancouver Participant<br/><br/><em>City of Vancouver — Paddling Together Workshop</em>`),
  },
  {
    image: YWCA,
    text: wrapDefault(`"We are deeply appreciative for Melanie's guidance and expertise in helping us develop a thoughtful, community-centered approach to advocacy and government relations for several key YWCA priorities. Melanie brings a deep understanding of the complexities of navigating community and government relationships to help advance positive change. Her courageous and straightforward approach helped us clarify our messaging and focus in on the most strategic opportunities ahead."<br/><br/>— Amy Juschka, Vice President, Communications and Advocacy<br/><br/><em>YWCA Metro Vancouver</em>`),
  },
  {
    image: WORTH,
    text: wrapDefault(`“Melanie Mark's keynote address was the highlight of our WORTH Leadership Summit for women of recreation, tourism and hospitality. I witnessed our delegates move from laughter to tears, captivated by her strength, drive and determination. She inspired our audience with stories about building community and making an impact in politics. What was most impactful was her call to action, encouraging women to think bigger and make their mark. She was entertaining, engaging and inspirational. Our delegates have even asked her to return for next year's event. I highly recommend Melanie for any speaking engagement.”<br/><br/>— Joanna Jagger, Founder and Executive Director, WORTH Association<br/><br/><em>WORTH Leadership Summit</em>`),
  },
  {
    image: WCCDA,
    text: wrapDefault(`"Melanie Mark shared a powerful and deeply personal story that moved and inspired the entire room. She took us on a journey from her childhood all the way to her groundbreaking work in government, where she earned the title of being 'the first' many times over. A true maverick and outlier, she brought dynamo energy, vulnerability, strength, and conviction to the stage. Her message reminded us that even small acts of kindness can make a lasting difference and that we should never give up on ourselves or others, especially the so-called 'troublemakers', because there is often a gem inside, waiting to be seen. Grounded in real-world experience and a passion for hands-on change, her story was empowering and left a lasting impact on those who heard her message."<br/><br/>— Lubica Keighery, Executive Director, Western Canada Career Development Association<br/><br/><em>Western Canada Career Development Symposium</em>`),
  },
  {
    image: FORA,
    text: wrapDefault(`"My first comment when you opened it up was going to be ‘I have no words’. Often when we have these convos, we don’t get to know the person speaking and what brings them to the learning they’re sharing. I appreciate the full transparency given; I’ve never had the opportunity to firsthand sit down and hear this. The stories we’ve been told growing up are usually dehumanizing and removes the human in the experience."<br/><br/>— FORA NETWORK FOR CHANGE participant<br/><br/><em>FORA NETWORK FOR CHANGE — Paddling Together Workshop</em>`),
  },
  {
    image: IPSS,
    text: wrapDefault(`“Melanie Mark brought her signature authenticity and powerful presence as both panelist and emcee, transforming our event into an unforgettable experience. Her ability to seamlessly navigate complex discussions while keeping the Indigenous Partnerships Success Showcase (IPSS) audience deeply engaged was remarkable. Melanie’s candid insights, paired with her vibrant storytelling, inspired attendees and created a memorable dialogue on critical issues. It’s rare to find someone who can balance authority with warmth so naturally. We’re immensely grateful for Melanie’s energy, wisdom, and genuine passion—she elevated our work beyond expectations. I look forward to any opportunity to collaborate again, knowing Melanie will consistently deliver brilliance and inspiration.”<br/><br/>— IPSS Founder<br/><br/><em>Indigenous Peoples Success Showcase</em>`),
  },
  {
    image: HopeHealth,
    text: wrapDefault(`"Melanie has been a powerful force in helping Hope and Health refine our growth strategy and build strategic partnerships aligned with our vision. She brings deep integrity, lived experience, and Indigenous values into everything she does—walking her talk with purpose and action. Her ability to unite people around a shared goal and move strategy into execution is rare and impactful. If you're looking for someone to bring people into the canoe and paddle together toward real change, Melanie is that person.”<br/><br/>— Deana Gill, CEO, Hope and Health<br/><br/><em>Hope and Health</em>`),
  },
  {
    image: '',
    text: wrapDefault(`"Melanie Mark is a powerful, values-driven leader—and a top tier speaker and storyteller. Melanie shared the story of her leadership journey as a True Confessions speaker at Social Venture Institute at Hollyhock. Her talk was raw, courageous, and deeply moving. It was also the highest-rated session of the entire gathering in our participant survey, which speaks volumes about her ability to connect, inspire, and lead with integrity. Melanie is a pleasure to work with - responsive, intelligent, and driven. I’ve learned a lot from working with Melanie, and I’m grateful for her bold heart and steady presence."<br/><br/>— Laurel Dault, Director of Hollyhock Leadership Institute<br/><br/><em>Hollyhock</em>`),
  },
  {
    image: BCFS,
    text: wrapDefault(`“Melanie Mark delivered a powerful and unforgettable keynote at the BC Federation of Students’ 39th Annual Skills Development Symposium. Her speech lit the room with energy, passion, and purpose. She spoke with honesty and conviction, connecting deeply with our student leaders and affirming their roles as change-makers. Her stories resonated strongly with our delegates, leaving them feeling empowered, emboldened, and ready to take action in their communities. Melanie captured the spirit of our event and left a lasting impression. I enthusiastically recommend her as a speaker for any organisation looking to inspire leadership and spark social change.”<br/><br/>— Cole Reinbold, Secretary-Treasurer, British Columbia Federation of Students<br/><br/><em>BC Federation of Students’ 39th Annual Skills Development Symposium</em>`),
  },
];
