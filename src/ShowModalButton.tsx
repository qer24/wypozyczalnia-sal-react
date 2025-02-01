import { modals } from "@mantine/modals";
import {Button} from "@mantine/core";
import {ReactNode} from "react";

interface ShowModalButtonProps {
    modalTitle?: string;
    modalChildren: ReactNode;
    buttonIcon?: ReactNode;
    buttonText: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ShowModalButton({ modalTitle, modalChildren, buttonIcon, buttonText, size }: ShowModalButtonProps) {
    const openPropsModal = () => {
        modals.open({
            title: <strong>{modalTitle}</strong>,
            children: modalChildren,
            size: size,
        });
    };

    return (
        <Button rightSection={buttonIcon} onClick={openPropsModal}>{buttonText}</Button>
    )
}