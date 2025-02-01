import { modals } from "@mantine/modals";
import {Button} from "@mantine/core";
import {ReactNode} from "react";

interface ShowModalButtonProps {
    modalTitle?: string;
    modalChildren: ReactNode;
    buttonIcon?: ReactNode;
    buttonText: string;
}

export function ShowModalButton({ modalTitle, modalChildren, buttonIcon, buttonText }: ShowModalButtonProps) {
    const openPropsModal = () => modals.open({
        title: <strong>{modalTitle}</strong>,
        children: modalChildren,
        size: 'lg'
    });

    return (
        <Button rightSection={buttonIcon} onClick={openPropsModal}>{buttonText}</Button>
    )
}