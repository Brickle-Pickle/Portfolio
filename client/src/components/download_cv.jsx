import React, { useState, useEffect } from 'react';
import { FaDownload, FaEye, FaTimes, FaFilePdf, FaCheckCircle, FaStar, FaLock, FaUnlock } from 'react-icons/fa';
import { useAppContext } from '../context/app_context';
import downloadCvContent from '../assets/text_content/download_cv.json';
import logo from '../assets/images/BricklePickleLogo_act2025.png';
import cvFile from '../assets/documents/CV_Antonio_Garcia_2025.pdf';
import './styles/download_cv.css';

const DownloadCV = () => {
    const { setIsLoading } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pendingAction, setPendingAction] = useState(null); // 'download' or 'preview'
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Verify password with backend
    const verifyPassword = async (inputPassword) => {
        try {
            setIsVerifying(true);
            const response = await fetch(`http://localhost:5000/api/cv?password=${encodeURIComponent(inputPassword)}`);
            
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error verifying password:', error);
            return false;
        } finally {
            setIsVerifying(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if (!password.trim()) {
            setPasswordError('Por favor ingresa la contraseña');
            return;
        }

        const isValid = await verifyPassword(password);
        
        if (isValid) {
            setIsAuthenticated(true);
            setShowPasswordModal(false);
            setPassword('');
            
            // Execute pending action
            if (pendingAction === 'download') {
                executeDownload();
            } else if (pendingAction === 'preview') {
                executePreview();
            }
            setPendingAction(null);
        } else {
            setPasswordError('Contraseña incorrecta');
            setPassword('');
        }
    };

    const handleDownload = () => {
        if (isAuthenticated) {
            executeDownload();
        } else {
            setPendingAction('download');
            setShowPasswordModal(true);
        }
    };

    const executeDownload = async () => {
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
        if (isAuthenticated) {
            executePreview();
        } else {
            setPendingAction('preview');
            setShowPasswordModal(true);
        }
    };

    const executePreview = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closePasswordModal = () => {
        setShowPasswordModal(false);
        setPassword('');
        setPasswordError('');
        setPendingAction(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) {
            setPasswordError('');
        }
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
                        {/* Authentication status indicator */}
                        <div className="auth-status">
                            {isAuthenticated ? (
                                <FaUnlock className="auth-icon authenticated" title="Acceso autorizado" />
                            ) : (
                                <FaLock className="auth-icon locked" title="Requiere contraseña" />
                            )}
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
                            {!isAuthenticated && <FaLock className="btn-lock-icon" />}
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
                                    {!isAuthenticated && <FaLock className="btn-lock-icon" />}
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

            {/* Modal de contraseña */}
            {showPasswordModal && (
                <div className="password-modal-overlay" onClick={closePasswordModal}>
                    <div className="password-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="password-modal-header">
                            <div className="password-modal-title">
                                <FaLock className="password-modal-icon" />
                                <h3>Acceso Restringido</h3>
                            </div>
                            <button className="password-modal-close" onClick={closePasswordModal}>
                                <FaTimes />
                            </button>
                        </div>
                        
                        <div className="password-modal-content">
                            <p className="password-modal-description">
                                Este CV contiene información confidencial. 
                                Por favor, ingresa la contraseña para {pendingAction === 'download' ? 'descargar' : 'ver la vista previa'}.
                            </p>
                            
                            <form onSubmit={handlePasswordSubmit} className="password-form">
                                <div className="password-input-group">
                                    <FaLock className="password-input-icon" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        placeholder="Ingresa la contraseña"
                                        className={`password-input ${passwordError ? 'error' : ''}`}
                                        disabled={isVerifying}
                                        autoFocus
                                    />
                                </div>
                                
                                {passwordError && (
                                    <div className="password-error">
                                        {passwordError}
                                    </div>
                                )}
                                
                                <div className="password-modal-actions">
                                    <button 
                                        type="button" 
                                        className="btn-password-cancel"
                                        onClick={closePasswordModal}
                                        disabled={isVerifying}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit" 
                                        className={`btn-password-submit ${isVerifying ? 'verifying' : ''}`}
                                        disabled={isVerifying || !password.trim()}
                                    >
                                        {isVerifying ? (
                                            <>
                                                <div className="spinner"></div>
                                                Verificando...
                                            </>
                                        ) : (
                                            <>
                                                <FaUnlock className="btn-icon" />
                                                Acceder
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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