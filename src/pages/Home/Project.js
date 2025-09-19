import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import {useSelector} from "react-redux";
import { useTheme } from "../../contexts/ThemeContext";

function Project() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { projects = [] } = portfolioData || {};
    const { isDarkMode } = useTheme();

    const validProjects = Array.isArray(projects) ? projects.filter(project => project && project.title && project.title.trim() !== '') : [];

    if (!Array.isArray(validProjects) || validProjects.length === 0) {
        return (
            <div className="py-20" aria-busy="true" aria-live="polite">
                <SectionTitle title="Projects" />
                <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>No projects available at the moment.</div>
            </div>
        );
    }

    return (
        <div aria-labelledby="projects-title" role="region">
            <SectionTitle title="Projects" id="projects-title" />
            <div className="flex py-10 gap-60 sm:flex-col sm:gap-16 ">
                <div
                    className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/6 sm:flex-row sm:overflow-x-scroll sm:w-full "
                    aria-label="Project list"
                >
                    {validProjects.map((project, index) => (
                        <div
                            key={project._id || index}
                            onClick={() => setSelectedItemIndex(index)}
                            className="cursor-pointer"
                            role="button"
                            tabIndex={0}
                            aria-pressed={selectedItemIndex === index}
                            aria-label={`Select project: ${project.title}`}
                            onKeyPress={(e) => e.key === 'Enter' && setSelectedItemIndex(index)}
                        >
                            <h1
                                className={`text-xl px-5 py-3 w-72 border-l-4 -ml-[3px] ${
                                    selectedItemIndex === index
                                        ? "text-tertiary border-tertiary bg-[#1a7f5a31]"
                                        : `${isDarkMode ? 'text-white' : 'text-gray-800'} border-transparent hover:text-tertiary hover:bg-[#1a7f5a10] hover:border-tertiary/30`
                                }`}
                            >
                                {project.title}
                            </h1>
                        </div>
                    ))}
                </div>

                <div aria-label="Project details">
                    {validProjects[selectedItemIndex] ? (
                        <Card
                            title={validProjects[selectedItemIndex].title}
                            subtitle={validProjects[selectedItemIndex].technologies}
                            description={validProjects[selectedItemIndex].description}
                            image={validProjects[selectedItemIndex].image}
                            link={validProjects[selectedItemIndex].project_link}
                            githubLink={validProjects[selectedItemIndex].github_link}
                        />
                    ) : (
                        <div className="text-gray-400">No details available for this project.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Project;