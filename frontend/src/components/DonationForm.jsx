import { Box, Button, Input, VStack, Select } from "@chakra-ui/react";
import { useState } from "react";

const DonationForm = ({ onDonate }) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const handleDonate = () => {
    onDonate(amount, paymentMethod);
  };

  return (
    <Box borderWidth={"1px"} borderRadius={"lg"} p={4}>
      <VStack spacing={4}>
        <Input
          placeholder="Donation amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value={"credit_card"}>Credit Card</option>
          <option value={"true_money"}>TrueMoney Wallet</option>
        </Select>
        <Button onClick={handleDonate}>Donate</Button>
      </VStack>
    </Box>
  );
};

export default DonationForm;
