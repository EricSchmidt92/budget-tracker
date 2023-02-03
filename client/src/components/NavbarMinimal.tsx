import authenticatedVar from "@/constants/authenticated";
import useGetMe from "@/hooks/useGetMe";
import { useLogout } from "@/hooks/useLogout";
import { useReactiveVar } from "@apollo/client";
import { Navbar, NavLink, Stack, Text } from "@mantine/core";

import { useRouter } from "next/router";
import { Category, Home2, Login, Logout } from "tabler-icons-react";

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
    icon: authenticated ? (
      <Logout strokeWidth={1.5} />
    ) : (
      <Login strokeWidth={1.5} />
    ),
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
              label="Home"
              icon={<Home2 strokeWidth={1.5} />}
              active={router.pathname === "/"}
            />

            <NavLink
              {...navLinkProps}
              onClick={() => router.push("/category")}
              active={router.pathname === "/category"}
              label="Category"
              icon={<Category strokeWidth={1.5} />}
            />

            <NavLink
              {...navLinkProps}
              onClick={async () => await logout()}
              active={router.pathname === "/login"}
            />
          </Stack>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarMinimal;
