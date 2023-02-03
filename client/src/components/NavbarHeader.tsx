import { Group, Header } from "@mantine/core";
import { useRouter } from "next/router";
import { ColorSchemeToggle } from "./ColorSchemeToggle/ColorSchemeToggle";

const NavbarHeader = () => {
  const router = useRouter();
  return (
    <Header height={70}>
      <Group px={20} h="100%" position="apart" align="center">
        <ColorSchemeToggle />
      </Group>
    </Header>
  );
};

export default NavbarHeader;
