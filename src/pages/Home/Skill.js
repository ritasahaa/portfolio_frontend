import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { useTheme } from "../../contexts/ThemeContext";

function Skill() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { skills = [] } = portfolioData || {};
    const selectedSkillCategory = Array.isArray(skills) && skills[selectedItemIndex] ? skills[selectedItemIndex] : { skills: [] };
    const { isDarkMode } = useTheme();

    if (!Array.isArray(skills) || skills.length === 0) {
        return (
            <div className="py-20" aria-busy="true" aria-live="polite">
                <SectionTitle title="Skills" />
                <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Loading skills information...</div>
            </div>
        );
    }

    return (
        <div aria-labelledby="skill-title" role="region">
            <SectionTitle title="Skill" id="skill-title" />
            <div className="flex py-10 gap-60 sm:flex-col sm:gap-8">
                <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/6 sm:flex-row sm:overflow-x-scroll sm:w-full" aria-label="Skill categories">
                    {skills.map((skillCategory, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedItemIndex(index)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={selectedItemIndex === index}
                            aria-label={`Select skill category: ${skillCategory.title}`}
                            onKeyPress={(e) => e.key === 'Enter' && setSelectedItemIndex(index)}
                            className="cursor-pointer"
                        >
                            <h1
                                className={`text-xl px-5 py-3 transition-all duration-500 ease-in-out w-72 border-l-4 -ml-[3px] ${
                                    selectedItemIndex === index
                                        ? "text-tertiary border-tertiary bg-[#1a7f5a31]"
                                        : `${isDarkMode ? 'text-white' : 'text-gray-800'} border-transparent hover:text-tertiary hover:bg-[#1a7f5a10] hover:border-tertiary/30`
                                }`}
                            >
                                {skillCategory.title}
                            </h1>
                        </div>
                    ))}
                </div>

                <div className="py-8 transition-all duration-500 ease-in-out" aria-label="Skills list">
                    <div className="flex flex-wrap gap-8 mt-5">
                        {(Array.isArray(selectedSkillCategory.skills) ? selectedSkillCategory.skills : []).filter(skill => skill.name && skill.name.trim() !== '').length === 0 ? (
                            <div className="text-gray-400">No skills listed in this category.</div>
                        ) : (
                            (Array.isArray(selectedSkillCategory.skills) ? selectedSkillCategory.skills : []).filter(skill => skill.name && skill.name.trim() !== '').map((skill, index) => (
                                <div
                                    key={index}
                                    className={`border-2 border-tertiary/30 py-6 px-8 rounded-xl shadow-lg ${
                                        isDarkMode 
                                            ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/60' 
                                            : 'bg-gradient-to-br from-white/90 to-gray-50/90'
                                    }`}
                                    tabIndex={0}
                                    aria-label={`Skill: ${skill.name}, Level: ${skill.level}`}
                                >
                                    <h1 className={`text-center text-xl font-bold whitespace-nowrap ${
                                        isDarkMode ? 'text-secondary' : 'text-secondary'
                                    }`}>
                                        {skill.name}
                                    </h1>
                                    {/* Skill level */}
                                    <p className={`text-center font-semibold mt-4 ${
                                        isDarkMode ? 'text-tertiary' : 'text-tertiary'
                                    }`}>
                                        {skill.level}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skill;
