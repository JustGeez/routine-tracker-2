/* IMPORTS */
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

/* TYPES */
interface PropsType {
  redirectUrl: string;
}

export async function getServerSideProps(context: CtxOrReq) {
  // Check if user already exists in record database
  const session = await getSession(context);

  if (!session) return console.error("Invalid session object!");
  if (!session.user)
    return console.error("No user present in current session!");

  let apiBaseUrl;

  if (process.env.VERCEL == "1") {
    apiBaseUrl = `https://${process.env.VERCEL_URL}`;
  } else {
    apiBaseUrl = process.env.LOCAL_URL;
  }

  // Get their database Id from the users database
  let res = await fetch(`${apiBaseUrl}/api/user/findUserId`, {
    method: "POST",
    body: JSON.stringify({ email: session.user.email }),
  });

  const { data } = await res.json();

  const { userDbId } = data;

  if (userDbId == undefined)
    return console.error("No valid userDbId retrieved from database");

  // Add new userDbId to record database if they don't exist
  res = await fetch(`${apiBaseUrl}/api/user/addNewUserRecord`, {
    method: "POST",
    body: JSON.stringify({
      userDbId,
    }),
  });

  // redirect to user dashboard

  return {
    props: {
      redirectUrl: "/user",
    },
  };
}

const CheckIfNewUser = (props: PropsType) => {
  /* STATE */

  /* HOOKS */
  const router = useRouter();

  useEffect(() => {
    if (props.redirectUrl == undefined) return;

    router.push(props.redirectUrl);
  }, [router, props.redirectUrl]);

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return <div></div>;
};

/* EXPORTS */
export default CheckIfNewUser;
