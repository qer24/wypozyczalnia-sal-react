import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconBrightnessUp, IconMoon } from "@tabler/icons-react";

export function ThemeSwitchButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            title="Toggle color scheme"
            onClick={toggleColorScheme}
            aria-label="Toggle color scheme"
            variant="hover"
            color="gray"
            size="lg">

            {colorScheme === 'dark' ? (
                <IconMoon />
            ) : (
                <IconBrightnessUp />
            )}
        </ActionIcon>
    );
}