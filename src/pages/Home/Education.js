import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import {useSelector} from "react-redux";
import { useTheme } from "../../contexts/ThemeContext";

function Education() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const [freshEducationData] = React.useState(null);
    const { portfolioData } = useSelector((state) => state.root);
    const { educations = [] } = portfolioData || {};
    const { isDarkMode } = useTheme();

    const displayEducations = Array.isArray(freshEducationData) && freshEducationData.length > 0 ? freshEducationData : educations;


    if (!Array.isArray(displayEducations) || displayEducations.length === 0) {
        return (
            <div className="py-20" aria-busy="true" aria-live="polite">
                <SectionTitle title="Education" />
                <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>No education information available. Please add education data in the admin panel.</div>
            </div>
        );
    }

    return (
        <div aria-labelledby="education-title" role="region">
            <SectionTitle title="Education" id="education-title" />
            <div className="flex py-10 gap-60 sm:flex-col sm:gap-16">
                <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-96 sm:flex-row sm:overflow-x-scroll sm:w-full" aria-label="Education list">
                    {displayEducations.map((edu, index) => (
                        <div
                            key={edu._id || index}
                            onClick={() => setSelectedItemIndex(index)}
                            className="cursor-pointer"
                            role="button"
                            tabIndex={0}
                            aria-pressed={selectedItemIndex === index}
                            aria-label={`Select education: ${edu.institution || edu.title}`}
                            onKeyPress={(e) => e.key === 'Enter' && setSelectedItemIndex(index)}
                        >
                            <h1
                                className={`text-xl px-5 py-3 transition-all duration-500 ease-in-out w-72 border-l-4 -ml-[3px] ${
                                    selectedItemIndex === index
                                        ? "text-tertiary border-tertiary bg-[#1a7f5a31]"
                                        : `${isDarkMode ? 'text-white' : 'text-gray-800'} border-transparent hover:text-tertiary hover:bg-[#1a7f5a10] hover:border-tertiary/30`
                                }`}
                            >
                                {edu.institution || edu.title}
                            </h1>
                        </div>
                    ))}
                </div>

                <div className="transition-all duration-500 ease-in-out" aria-label="Education details">
                    {displayEducations[selectedItemIndex] ? (
                        <Card
                            title={`Institution: ${displayEducations[selectedItemIndex]?.institution || 'N/A'}`}
                            subtitle={`${displayEducations[selectedItemIndex]?.degree || displayEducations[selectedItemIndex]?.title || 'N/A'}`}
                            description={`Period: ${displayEducations[selectedItemIndex]?.period || 'N/A'} | ${displayEducations[selectedItemIndex]?.description || 'No description available'}${displayEducations[selectedItemIndex]?.grade ? ` | Grade: ${displayEducations[selectedItemIndex].grade}` : ''}`}
                        />
                    ) : (
                        <div className="text-gray-400">No details available for this education.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Education;