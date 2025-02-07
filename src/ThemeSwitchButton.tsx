﻿import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconBrightnessUp, IconMoon } from "@tabler/icons-react";

export function ThemeSwitchButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            title="Toggle color scheme"
            onClick={toggleColorScheme}
            aria-label="Toggle color scheme">

            {colorScheme === 'dark' ? (
                <IconMoon />
            ) : (
                <IconBrightnessUp />
            )}
        </ActionIcon>
    );
}