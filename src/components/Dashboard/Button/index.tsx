import styles from './button.module.css';
import dashboardStyles from '/src/dashboard/styles/dashboard.module.css';

import { Report } from '../../../@types/application';
import Link from 'next/link';
import { SvgIconComponent } from '@mui/icons-material';

type Props = {
    title?: string;
    Icon?: SvgIconComponent;
    iconSize?: 'small' | 'medium' | 'large';
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

    const style = width ? { padding: padding && padding, fontSize: fontSize, width: width } : { padding: padding && padding, fontSize: fontSize }

    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            style={style}
            //className={`${styles.button} ${isLoading ? styles.loading : disabled ? styles.blocked : ""} ${isLoading ? styles.buttonLoading : ""}`}
            className={`${styles.button} ${isLoading || disabled ? styles.blocked : ""} ${isLoading ? "spinner" : ""}`}
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

            button .spinner::after {
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
            {/* <style global jsx>{`
                .spinner::after {
                    border-top-color: ${`var(--color-1)`};
                }
            `}</style> */}
        </button>
    );
}