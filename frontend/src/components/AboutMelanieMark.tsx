export default function AboutMelanieMark() {
    return (
        <section className="bg-gray-100 text-gray-800 py-16 px-6 md:px-20 lg:px-32">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text (left) */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center">
                        About Melanie Mark
                    </h2>
                    <div className="w-48 h-[2px] bg-black mt-3 mb-8 mx-auto" />

                    <p className="text-lg leading-relaxed mb-4">
                        I’m Melanie Mark, a proud mother of two daughters and decendent of
                        the Nisga’a, Gitxsan, Cree, and Ojibway First Nations. Born and
                        raised in East Vancouver, I’ve lived and worked throughout B.C. and
                        Canada, cultivating meaningful relationships in various sectors. My
                        late grandparents are from Laxalxap, Gitanmaax and Peguis
                        First Nations and attended St. Michael’s, Elkhorn and Brandon Indian
                        Residential Schools.
                    </p>

                    <p className="text-lg leading-relaxed mb-4">
                        Over the past three decades, I’ve served as an advocate, public
                        servant, elected official, and now entrepreneur in the cleantech
                        space. My journey has been guided by a commitment to justice,
                        empowerment, and systemic change.
                    </p>


                    <p className="text-lg leading-relaxed mb-4">
                        As the first First Nations woman elected to the B.C. Legislature and
                        appointed to Cabinet, I’ve had the privilege of working with diverse
                        communities, from grassroots organizations to executive leadership.
                        Now, as the founder of Hli Haykwhl Ẃii Xsgaak Consulting, I’m sharing
                        my knowledge and experiences to help others achieve their goals
                        through the power of culture, sport, education and industry.
                    </p>

                    <p className="text-lg font-semibold mt-6 text-right">
                        CEO, Melanie Mark,
                        <br /> Hli Haykwhl Ẃii Xsgaak Consulting
                    </p>
                </div>

                {/* Image (right) */}
                <div className="flex justify-center md:justify-end">
                    <img
                        src="../src/assets/MJM_FINAL_HEADSHOT_2024_BLUE_WHITE.jpg"
                        alt="Melanie Mark standing with Canadian and Indigenous flags"
                        className="w-full max-w-[500px] rounded-lg shadow-lg object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
