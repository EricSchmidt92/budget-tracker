import authenticatedVar from "@/constants/authenticated";
import useGetMe from "@/hooks/useGetMe";
import { useLogout } from "@/hooks/useLogout";
import { useReactiveVar } from "@apollo/client";
import { Navbar, NavLink, Stack, Text } from "@mantine/core";

import { useRouter } from "next/router";
import { Category, CirclePlus, Login, Logout, ReportMoney } from "tabler-icons-react";

interface NavProps {
  variant: "filled";
  label: string;
  icon: JSX.Element;
}

const NavbarMinimal = () => {
  const authenticated = useReactiveVar(authenticatedVar);
  const { data: user } = useGetMe();
  const router = useRouter();
  const { logout } = useLogout();

  const navLinkProps: NavProps = {
    variant: "filled",
    label: authenticated ? "Logout" : "Login",
    icon: authenticated ? <Logout strokeWidth={1.5} /> : <Login strokeWidth={1.5} />,
  };

  return (
    <Navbar height="100%" width={{ base: 150 }}>
      <Navbar.Section grow w="100%" mt={50}>
        <Stack justify="space-between">
          <Stack justify="center" spacing={5}>
            {user && <Text align="center">{user.me.email}</Text>}
            <NavLink
              {...navLinkProps}
              onClick={() => router.push("/")}
              label="Budgets"
              icon={<ReportMoney strokeWidth={1.5} />}
              active={
                router.pathname === "/" ||
                (router.pathname.startsWith("/budget") && !router.pathname.endsWith("create"))
              }
            />

            <NavLink
              {...navLinkProps}
              onClick={() => router.push("/")}
              label="Categories"
              description="Not active, needs work or removal"
              icon={<Category strokeWidth={1.5} />}
            />

            <NavLink {...navLinkProps} onClick={async () => await logout()} active={router.pathname === "/login"} />
          </Stack>
          <NavLink
            mt="xl"
            {...navLinkProps}
            icon={<CirclePlus strokeWidth={1.5} />}
            label="New Budget"
            onClick={() => router.push("/budget/create")}
            active={router.pathname === "/budget/create"}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarMinimal;
