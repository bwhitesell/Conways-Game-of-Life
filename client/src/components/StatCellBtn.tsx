import React from "react";
import { Button, Heading } from "@chakra-ui/react";

interface TelemetryStatCellProps {
  desc: string;
  value: string | number;
}

const StatCellBtn: React.FC<TelemetryStatCellProps> = (props) => {
  return (
    <Button display="flex" flexDirection="column" p={8} margin="auto">
      <Heading size="sm">{props.desc}</Heading>
      <Heading>{props.value}</Heading>
    </Button>
  );
};

export default StatCellBtn;
