import styles from './button.module.css';
import dashboardStyles from '/src/dashboard/styles/dashboard.module.css';

import { Report } from '../../../@types/application';
import Link from 'next/link';
import { SvgIconComponent } from '@mui/icons-material';

type Props = {
    title: string;
    Icon?: SvgIconComponent;
    iconSize?: string;
    onClick?: () => void;
    padding?: string;
    color?: string;
    width?: string;
    fontSize?: string;
}

export default function DashboardButton({ title, onClick, Icon, color, iconSize, width, padding, fontSize }: Props) {
    const iconFontSize = iconSize === "small" ? "1.6rem" : iconSize === "medium" ? "1.8rem" : "2.4rem"
    return (
        <button onClick={onClick} style={{ width: width && width, padding: padding && padding, fontSize: fontSize }} className={styles.button}>
            {
                Icon &&
                <Icon style={{ fontSize: iconFontSize }} />
            }
            {title}
            <style jsx>{`
            button {
                border: 1px solid ${color ? color : `var(--light-gray)`};
                background: transparent;
                color: ${color ? color : `var(--light-gray)`};
                padding: ${padding ? padding : `0.75rem 1.5rem`};
            }

            button span {
                color: ${color ? color : `var(--light-gray)`}
            }

            button:hover {
                background-color: ${color ? color : `var(--light-gray)`};
                color: white;
            }
            `}</style>
        </button>
    );
}