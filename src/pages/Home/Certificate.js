import React from "react";
import SectionTitle from "../../components/SectionTitle";
import {useSelector} from "react-redux";
import { useTheme } from "../../contexts/ThemeContext";

function Certificate() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { certificates = [] } = portfolioData || {};
    const { isDarkMode } = useTheme();

    if (!Array.isArray(certificates) || certificates.length === 0) {
        return (
            <div className="py-20" aria-busy="true" aria-live="polite">
                <SectionTitle title="Certificates" />
                <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>No certificate information available.</div>
            </div>
        );
    }
    return (
        <div aria-labelledby="certificate-title" role="region">
            <SectionTitle title="Certificate" id="certificate-title" />
            <div className="flex py-10 gap-60 sm:flex-col sm:gap-16">
                <div
                    className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/4 sm:flex-row sm:overflow-x-scroll sm:w-full"
                    aria-label="Certificate list"
                >
                    {certificates.map((certificate, index) => (
                        <div
                            key={certificate._id || index}
                            onClick={() => setSelectedItemIndex(index)}
                            className="cursor-pointer"
                            role="button"
                            tabIndex={0}
                            aria-pressed={selectedItemIndex === index}
                            aria-label={`Select certificate: ${certificate.title}`}
                            onKeyPress={(e) => e.key === 'Enter' && setSelectedItemIndex(index)}
                        >
                            <h1
                                className={`text-xl px-5 py-3 transition-all duration-500 ease-in-out w-72 border-l-4 -ml-[3px] ${
                                    selectedItemIndex === index
                                        ? "text-tertiary border-tertiary bg-[#1a7f5a31]"
                                        : `${isDarkMode ? 'text-white' : 'text-gray-800'} border-transparent hover:text-tertiary hover:bg-[#1a7f5a10] hover:border-tertiary/30`
                                }`}
                            >
                                {certificate.organization || certificate.issuer}
                            </h1>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-10 sm:flex-col transition-all duration-500 ease-in-out" aria-label="Certificate details">
                    {certificates[selectedItemIndex] ? (
                        <>
                            <div className="flex flex-col gap-5">
                                <h1 className="text-secondary text-xl">
                                    Certificate Name : {certificates[selectedItemIndex].title}
                                </h1>
                                <h1 className="text-white text-xl">
                                    IssueDate : {certificates[selectedItemIndex].issueDate}
                                </h1>
                                <p className="text-tertiary">
                                    Description : {certificates[selectedItemIndex].description}
                                </p>
                            </div>
                            {certificates[selectedItemIndex].image && (
                                <img
                                    src={certificates[selectedItemIndex].image && certificates[selectedItemIndex].image.startsWith('/uploads/') ? require('../../apiBaseUrl').default + certificates[selectedItemIndex].image : certificates[selectedItemIndex].image}
                                    alt={certificates[selectedItemIndex].title}
                                    className="h-96 w-auto sm:h-auto sm:w-96"
                                />
                            )}
                        </>
                    ) : (
                        <div className="text-gray-400">No details available for this certificate.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Certificate;