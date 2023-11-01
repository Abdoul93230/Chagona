import React from "react";
import InviteFriends from "../components/Invite_Friends/Invite_Friends";
import CustomerSuport from "../components/Customer_suport/Customer_suport";
import MakeSuggestion from "../components/Make_suggestion/MakeSuggestion";
import EditProfile from "../components/EditProfile/EditProfile";
import { useParams } from "react-router-dom";

function ProfileComponets() {
  const op = useParams().op;

  return (
    <>
      {op === "Invite_Friends" ? (
        <InviteFriends />
      ) : op === "customer_suport" ? (
        <CustomerSuport />
      ) : op === "make_suggestion" ? (
        <MakeSuggestion />
      ) : op === "EditProfile" ? (
        <EditProfile />
      ) : (
        <></>
      )}
    </>
  );
}

export default ProfileComponets;
