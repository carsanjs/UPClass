import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "./use/useAuth";

export const Authenticated = (props) => {
  const { children } = props;
  const auth = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.replace("/");
    } else {
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, router]);
  return isVerified ? <>{children}</> : null;
};
