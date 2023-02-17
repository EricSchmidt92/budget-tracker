import authenticatedVar from "@/constants/authenticated";
import useGetMe from "@/hooks/useGetMe";
import { useLogout } from "@/hooks/useLogout";
import { useReactiveVar } from "@apollo/client";
import { Button, Group, Header, Text, Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
import { CirclePlus, Login, Logout, ReportMoney } from "tabler-icons-react";
import { ColorSchemeToggle } from "./ColorSchemeToggle/ColorSchemeToggle";

const NavbarHeader = () => {
  const authenticated = useReactiveVar(authenticatedVar);
  const router = useRouter();
  const { data: user } = useGetMe();
  const { logout } = useLogout();
  const authIcon = authenticated ? <Logout strokeWidth={1.5} /> : <Login strokeWidth={1.5} />;

  const handleAuthButtonClick = async () => (user ? await logout() : null);

  return (
    <Header height={70}>
      <Group px={20} h="100%" position="apart" align="center">
        <Group>
          <Text
            size="xl"
            weight="bolder"
            variant="gradient"
            gradient={{ from: "violet", to: "pink", deg: 45 }}
            component="a"
            href="#"
            onClick={() => router.push("/")}
          >
            Budget App
          </Text>
          {user && <Text>{user.me.email}</Text>}
        </Group>

        <Group spacing="xs">
          <ColorSchemeToggle />

          <Button
            color="primary"
            variant="light"
            leftIcon={<ReportMoney strokeWidth={1.5} />}
            onClick={() => router.push("/")}
          >
            Budgets
          </Button>

          <Button
            color="primary"
            variant="light"
            leftIcon={<CirclePlus strokeWidth={1.5} />}
            onClick={() => router.push("/budget/create")}
          >
            Add Budget
          </Button>

          <Button variant="light" leftIcon={authIcon} onClick={handleAuthButtonClick}>
            Logout
          </Button>
        </Group>
      </Group>
    </Header>
  );
};

export default NavbarHeader;
