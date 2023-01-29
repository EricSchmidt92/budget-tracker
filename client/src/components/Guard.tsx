import client from "@/constants/apollo-client";
import authenticatedVar from "@/constants/authenticated";
import useGetMe from "@/hooks/useGetMe";
import { useReactiveVar } from "@apollo/client";

import { useRouter } from "next/router";
import { useEffect } from "react";

interface GuardProps {
  children: JSX.Element;
  excludedRoutes?: string[];
}

const Guard = ({ children, excludedRoutes }: GuardProps) => {
  const { data: user, refetch } = useGetMe();
  const authenticated = useReactiveVar(authenticatedVar);
  const router = useRouter();

  useEffect(() => {
    if (!excludedRoutes?.includes(router.pathname)) {
      refetch();
    }
  }, [excludedRoutes, refetch, router.pathname]);

  useEffect(() => {
    if (!authenticated && !excludedRoutes?.includes(router.pathname)) {
      router.push("/login");
      client.resetStore();
    }
  }, [authenticated, excludedRoutes, router]);

  return (
    <>
      {excludedRoutes?.includes(router.pathname) ? (
        children
      ) : (
        <>{user && children}</>
      )}
    </>
  );
};

export default Guard;
