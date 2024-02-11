/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

const defaultClasses = 'portal-container';

type PortalProps = PropsWithChildren<{
    className?: string;
    parent?: HTMLElement;
    onClick?: () => void;
}>;

export const DeprecatedPortal: React.FC<PortalProps> = ({
    children,
    parent,
    className,
    onClick,
}) => {
    const el = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        const target = parent ? parent : document.body;
        const classList: string[] = [];

        // Add default classes
        defaultClasses.split(' ').forEach((item) => classList.push(item));

        if (className) {
            className.split(' ').forEach((item) => classList.push(item));
        }

        classList.forEach((item) => el.classList.add(item));

        if (onClick) {
            el.onclick = (e) => {
                if (el === e.target) {
                    onClick();
                }
            };
        }

        target.appendChild(el);

        return () => {
            target.removeChild(el);
        };
    }, [el, parent, className, onClick]);

    return createPortal(children as any, el);
};
