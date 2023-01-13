/* IMPORTS */
import React from "react";
import ProtectedLayout from "../components/ProtectedLayout";

/* TYPES */
interface PropsType {}

const Profile = (props: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <ProtectedLayout title="User profile">
      <>
        <p>You have privilaged access</p>
      </>
    </ProtectedLayout>
  );
};

/* EXPORTS */
export default Profile;
