import styles from './button.module.css';
import dashboardStyles from '/src/dashboard/styles/dashboard.module.css';

import { Report } from '../../../@types/application';
import Link from 'next/link';
import { SvgIconComponent } from '@mui/icons-material';

type Props = {
    title: string;
    Icon: SvgIconComponent;
    onClick: () => void;
    color?: string;
    width?: string;
}

export default function DashboardButton({ title, Icon, onClick, color, width }: Props) {

    return (
        <button style={{ width: width }} className={styles.button}>
            <Icon />
            {title}
            <style jsx>{`
            button {
                border: 1px solid ${color ? color : `var(--light-gray)`};
                background: transparent;
                color: ${color ? color : `var(--light-gray)`};
                padding: ${width ? `0.75rem 0px` : `0.75rem 1.5rem`};
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