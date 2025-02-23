import React, { useState } from "react";
import styled from "styled-components";
import { FAQs } from "../../entities/inquiry/FAQs";
import { Container, Title, FAQItem, Question, Answer } from "./styles";

export const InquiryFnQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <Title>FAQ</Title>
      {FAQs.map((faq, index) => (
        <FAQItem key={index}>
          <Question onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </Question>
          <Answer $isOpen={openIndex === index}>{faq.answer}</Answer>
        </FAQItem>
      ))}
    </Container>
  );
};
