import React, { useState, useEffect } from 'react';
import { FaDownload, FaEye, FaTimes, FaFilePdf, FaCheckCircle, FaStar } from 'react-icons/fa';
import { useAppContext } from '../context/app_context';
import downloadCvContent from '../assets/text_content/download_cv.json';
import logo from '../assets/images/BricklePickleLogo_act2025.png';
import cvFile from '../assets/documents/CV_Antonio_Garcia_2025.pdf';
import './styles/download_cv.css';

const DownloadCV = () => {
    const { setIsLoading } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleDownload = async () => {
        setIsDownloading(true);
        
        // Simular tiempo de descarga
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = cvFile;
            link.download = downloadCvContent.file_info.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setIsDownloading(false);
            setDownloadSuccess(true);
            
            setTimeout(() => setDownloadSuccess(false), 3000);
        }, 1500);
    };

    const handlePreview = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className={`download-cv ${isVisible ? 'visible' : ''}`}>
                <div className="download-cv-container">
                    {/* Header con logo */}
                    <div className="cv-header">
                        <div className="cv-logo">
                            <img src={logo} alt="Brickle Pickle Logo" />
                        </div>
                        <div className="cv-title-section">
                            <h2 className="cv-title">{downloadCvContent.title}</h2>
                            <p className="cv-subtitle">{downloadCvContent.subtitle}</p>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="cv-description">
                        <p>{downloadCvContent.description}</p>
                    </div>

                    {/* Highlights */}
                    <div className="cv-highlights">
                        {downloadCvContent.highlights.map((highlight, index) => (
                            <div key={index} className="highlight-item" style={{ animationDelay: `${index * 0.1}s` }}>
                                <FaStar className="highlight-icon" />
                                <span>{highlight}</span>
                            </div>
                        ))}
                    </div>

                    {/* Información del archivo */}
                    <div className="cv-file-info">
                        <FaFilePdf className="file-icon" />
                        <div className="file-details">
                            <span className="file-name">{downloadCvContent.file_info.name}</span>
                            <span className="file-meta">{downloadCvContent.file_info.size} • {downloadCvContent.file_info.pages}</span>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="cv-actions">
                        <button 
                            className="btn-preview"
                            onClick={handlePreview}
                            disabled={isDownloading}
                        >
                            <FaEye className="btn-icon" />
                            {downloadCvContent.button_preview}
                        </button>
                        
                        <button 
                            className={`btn-download ${isDownloading ? 'downloading' : ''} ${downloadSuccess ? 'success' : ''}`}
                            onClick={handleDownload}
                            disabled={isDownloading}
                        >
                            {downloadSuccess ? (
                                <>
                                    <FaCheckCircle className="btn-icon" />
                                    {downloadCvContent.download_success}
                                </>
                            ) : (
                                <>
                                    <FaDownload className={`btn-icon ${isDownloading ? 'downloading-icon' : ''}`} />
                                    {isDownloading ? 'Descargando...' : downloadCvContent.button_text}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Elementos decorativos */}
                    <div className="cv-decorations">
                        <div className="decoration-circle circle-1"></div>
                        <div className="decoration-circle circle-2"></div>
                        <div className="decoration-circle circle-3"></div>
                    </div>
                </div>
            </div>

            {/* Modal de vista previa */}
            {showModal && (
                <div className="cv-modal-overlay" onClick={closeModal}>
                    <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{downloadCvContent.modal_title}</h3>
                            <button className="modal-close" onClick={closeModal}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-content">
                            <iframe 
                                src={cvFile} 
                                title="CV Preview"
                                width="100%" 
                                height="600px"
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="btn-modal-download" onClick={handleDownload}>
                                <FaDownload className="btn-icon" />
                                {downloadCvContent.button_text}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DownloadCV;