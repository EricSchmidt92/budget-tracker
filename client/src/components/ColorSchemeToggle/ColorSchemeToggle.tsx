import { ActionIcon, Group, Tooltip, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "tabler-icons-react";

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const labelText = colorScheme === "dark" ? "Light Mode" : "Dark Mode";
  return (
    <Group>
      <Tooltip label={labelText}>
        <ActionIcon
          onClick={() => toggleColorScheme()}
          size="lg"
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.colors.white : theme.colors.blue[6],
          })}
        >
          {colorScheme === "dark" ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
