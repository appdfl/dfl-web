import styles from './button.module.css';
import dashboardStyles from '/src/dashboard/styles/dashboard.module.css';

import { Report } from '../../../@types/application';
import Link from 'next/link';
import { SvgIconComponent } from '@mui/icons-material';

type Props = {
    title?: string;
    Icon?: SvgIconComponent;
    iconSize?: string;
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    padding?: string;
    color?: string;
    contentColor?: string;
    backgroundColor?: string;
    width?: string;
    fontSize?: string;
    borderWidth?: string;
    selected?: boolean;
}

export default function DashboardButton({ title, onClick, Icon, selected, color, contentColor, borderWidth, backgroundColor, isLoading, disabled, iconSize, width, padding, fontSize }: Props) {
    const iconFontSize = iconSize === "small" ? "1.6rem" : iconSize === "medium" ? "1.8rem" : "2.4rem"
    const backgroundColorStyle = backgroundColor || selected ? `${backgroundColor ? backgroundColor : color}` : "transparent"
    const colorStyle = selected || contentColor ? `${contentColor ? contentColor : "var(--background-01)"}` : `${color ? color : "var(--light-gray)"}`

    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            style={{ width: width && width, padding: padding && padding, fontSize: fontSize }}
            //className={`${styles.button} ${isLoading ? styles.loading : disabled ? styles.blocked : ""} ${isLoading ? styles.buttonLoading : ""}`}
            className={`${styles.button} ${isLoading || disabled ? styles.blocked : ""} ${isLoading ? styles.buttonLoading : ""}`}
        >
            {
                Icon &&
                <Icon style={{ fontSize: iconFontSize }} />
            }
            {title && title}
            <style jsx>{`
            button {
                border: ${borderWidth ? borderWidth : "1px"} solid ${color ? color : `var(--light-gray)`};
                background: ${backgroundColorStyle};
                color: ${colorStyle};
                padding: ${padding ? padding : `0.75rem 1.5rem`};
            }

            ${styles.buttonLoading}::after {
                borderTopColor: ${contentColor ? contentColor : color ? color : `var(--light-gray)`};
            }

            button span {
                color: ${contentColor ? contentColor : color ? color : `var(--light-gray)`}
            }

            button:hover {
                background-color: ${color ? color : `var(--light-gray)`};
                color: var(--background-02);
            }

            `}</style>
        </button>
    );
}