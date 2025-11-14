import React from "react";
import DigitalVisitingCard from "./DigitalVisitingCard";
import Banner from "../../../src/app/digital-visiting-card/Banner";
import BusinessCard from "./BusinessCard";
import Contectless from "./Contectless";
import Ready from "./Ready";
import Sharingcard from "./Sharingcard";
import { DigitalCardPlanProvider } from "./PlanContext";
import BusinessRow from "./BusinessRow";
import FAQs from "../Shared/FAQs/FAQs";

const Page = () => {
  return (
    <DigitalCardPlanProvider>
      <Banner />
      <BusinessRow/>
      <DigitalVisitingCard />
      <BusinessCard />
      <Contectless />
      <Sharingcard />
      <Ready />
      <FAQs pageName="smart_card" />
    </DigitalCardPlanProvider>
  );
};

export default Page;
