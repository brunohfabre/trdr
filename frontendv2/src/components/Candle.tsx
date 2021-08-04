import { Flex, Text } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { format } from "date-fns";

import { ICandleWithResult } from "./Asset";

interface ICandleProps {
  candle: ICandleWithResult;
}

export function Candle({ candle }: ICandleProps): JSX.Element {
  return (
    <Flex
      m="1"
      bg={
        candle.status === "win"
          ? "green.400"
          : candle.status === "loss"
          ? "red.400"
          : "gray.200"
      }
      boxShadow="sm"
      borderRadius="8"
      p="2"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex>
        {candle.position === "mg1" && <SmallAddIcon />}
        {candle.position === "mg2" && (
          <>
            <SmallAddIcon />
            <SmallAddIcon />
          </>
        )}
      </Flex>

      <Text fontSize="10">{format(candle.candle.date, "HH:mm")}</Text>
    </Flex>
  );
}
