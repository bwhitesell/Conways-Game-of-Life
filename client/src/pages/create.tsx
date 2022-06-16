import React from "react";
import CreateGame from "../components/CreateGame";
import { Navbar } from "../components/Navbar";
import {
  SignedInComponent,
  SignedOutComponent,
} from "../components/SignedInProvider";

const create: React.FC = () => {
  return (
    <SignedInComponent>
      <div>
        <Navbar />
        <CreateGame nHorizontalCells={30} nVerticalCells={17} />
      </div>
    </SignedInComponent>
  );
};

export default create;
