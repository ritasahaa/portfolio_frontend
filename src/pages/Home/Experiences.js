import React from "react";
import SectionTitle from "../../components/SectionTitle";
import Card from "../../components/Card";
import {useSelector} from "react-redux";

function Experiences() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences = [] } = portfolioData || {};

    if (!Array.isArray(experiences) || experiences.length === 0) {
        return (
            <div className="py-20" aria-busy="true" aria-live="polite">
                <SectionTitle title="Experience" />
                <div className="text-center text-gray-400">No experience data available.</div>
            </div>
        );
    }

    return (
        <div aria-labelledby="experience-title" role="region">
            <SectionTitle title="Experience" id="experience-title" />
            <div className="flex py-10 gap-20 lg:flex-row sm:flex-col">
                <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:w-full" aria-label="Experience periods">
                    {experiences.map((experience, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedItemIndex(index)}
                            className="cursor-pointer"
                            role="button"
                            tabIndex={0}
                            aria-pressed={selectedItemIndex === index}
                            aria-label={`Select experience period: ${experience.period}`}
                            onKeyPress={(e) => e.key === 'Enter' && setSelectedItemIndex(index)}
                        >
                            <h1
                                className={`text-xl px-5 ${
                                    selectedItemIndex === index
                                        ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                                        : "text-white"
                                }`}
                            >
                                {experience.period}
                            </h1>
                        </div>
                    ))}
                </div>

                <div className="transition-all duration-500 ease-in-out" aria-label="Experience details">
                    {experiences[selectedItemIndex] ? (
                        <Card
                            title={`Position: ${experiences[selectedItemIndex].title}`}
                            subtitle={`Company: ${experiences[selectedItemIndex].company} | Period: ${experiences[selectedItemIndex].period}`}
                            description={experiences[selectedItemIndex].description}
                        />
                    ) : (
                        <div className="text-gray-400">No details available for this experience.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Experiences;