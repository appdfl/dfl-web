import styles from "/src/styles/dashboard/statistics.module.css";

type Props = {
    children: React.ReactNode;
    backgroundGradient?: string;
    titleSize?: 'small' | 'medium' | 'large';
    minWidth?: string;
}

export default function StatFrame({ children, backgroundGradient, minWidth, titleSize }: Props) {
    //const titleFontSize = titleSize === "small" ? "1.6rem" : titleSize === "medium" ? "1.8rem" : "2.4rem"
    return (
        <>
            <div style={{ minWidth: minWidth }} className={styles.userFrame}>
                {children}
            </div>
            <style jsx>{`
                div {
                    background: ${backgroundGradient ? backgroundGradient : "linear-gradient(90deg, var(--secondary-color-01) 0%, var(--primary-color-01) 100%)"};
                }
            `}</style>
        </>
    );
}