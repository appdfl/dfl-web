import React, { useEffect, useRef, useState } from 'react';
import styles from './modal.module.css';

type Props = {
    title?: string;
    content: React.ReactNode;
    footerContent?: React.ReactNode;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
}

export default function Modal({ title, content, modalOpen, setModalOpen, footerContent }: Props) {
    const modal = useRef(null);

    function closeModal() {
        modal.current?.classList.toggle("fadeOut")
        setTimeout(() => {
            modal.current?.classList.toggle("fadeOut")
            modal.current.style.display = "none";
            setModalOpen(false)
        }, 400);
    }

    function openModal() {
        modal.current.style.display = "block";
    }

    const handleScreenClick = (event) => {
        if (event.target == modal.current) {
            closeModal()
        }
    }

    useEffect(() => {
        if (modalOpen === true) {
            console.log("Modal abriu.")
            openModal()
            window.addEventListener('click', handleScreenClick);
        } else {
            closeModal()
            window.removeEventListener('click', handleScreenClick);
        }
    }, [modalOpen])

    return (
        <div ref={modal} className={styles["modal-backdrop"]}>
            <div className={styles.modal}>
                {
                    title &&
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>{title}</h2>
                        <span onClick={closeModal} className={styles.close}>&times;</span>
                    </div>
                }
                <div className={styles.modalContent}>
                    {content}
                </div>
                {
                    footerContent &&
                    <div className={styles.modalFooter}>
                        {footerContent}
                    </div>
                }
            </div>
        </div>
    );
}