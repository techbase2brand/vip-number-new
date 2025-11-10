import React from "react";
import DigitalVisitingCard from "./DigitalVisitingCard";
import Banner from "../../../src/app/digital-visiting-card/Banner";
import BusinessCard from "./BusinessCard";
import Contectless from "./Contectless";
import Ready from "./Ready";
import Sharingcard from "./Sharingcard";
import { DigitalCardPlanProvider } from "./PlanContext";

const Page = () => {
  return (
    <DigitalCardPlanProvider>
      <Banner />
      <BusinessCard />
      <DigitalVisitingCard />
      <Contectless />
      <Sharingcard />
      <Ready />
    </DigitalCardPlanProvider>
  );
};

export default Page;
