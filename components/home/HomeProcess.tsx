import {
  useTranslation,
  H1,
  Box,
  Span,
  Paragraph,
  useBreakpoint,
} from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useEffect, Fragment } from "react";
import { keyframes } from "@emotion/core";

const esAr = {
  step1: "Nuevos inversores",
  step2: "Acceden al crowdfunding inmobiliario de Renta Fija",
  step3: "Realizan el aporte a Latam Investing Club",
  step4: "Latam Investing Club adquiere el inmueble",
  step5: "Latam Investing Club le brinda un contrato legal en USA",
  step6: "El inmueble se pone en alquiler",
  step7: "Distribución de la renta de alquileres a inversores",
};

const enUs = {};

const totalTime = 2500;
const breath = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

export const HomeProcess = () => {
  const { t, i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);
  const [ref, inView] = useInView({ threshold: 0.2 });

  const [growing, setGrowing] = useState(true);
  const [step, setStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const { isMediumSmall, isMedium, isMediumLarge, isLarge } = useBreakpoint();

  const [scale, setScale] = useState(1.5);
  useEffect(() => {
    setScale(
      isLarge
        ? 2
        : isMediumLarge
        ? 1.75
        : isMedium
        ? 1.5
        : isMediumSmall
        ? 1.25
        : 1
    );
  }, [isMediumSmall, isMedium, isMediumLarge, isLarge]);

  const steps = [
    { text: t("index.step1"), color: "#c48875" },
    { text: t("index.step2"), color: "#ee9564" },
    { text: t("index.step3"), color: "#ec8483" },
    { text: t("index.step4"), color: "#677482" },
    { text: t("index.step5"), color: "#7ac0b9" },
    { text: t("index.step6"), color: "#b07ba2" },
    { text: t("index.step7"), color: "#b1ba71" },
  ];

  useEffect(() => {
    const breathing = () => {
      setGrowing(false);
      setTimeout(() => {
        setGrowing(true);
      }, holdTime + breath);
      setStep((s) => s + 1);
    };

    breathing();
    const interval = setInterval(() => {
      breathing();
    }, totalTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const currentStep = step % steps.length;
  const nextStep = (step + 1) % steps.length;

  return (
    <>
      <StyledSection
        ref={ref}
        px="5"
        py="6"
        display="flex"
        flexDirection="column"
        flex="1 auto"
      >
        <Box
          as="h1"
          fontSize={[3, 4, 5, 6]}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(-30px)",
            transition: "transform 1s, opacity 1s",
            textTransform: "uppercase",
          }}
          pt={[3, 6, 7]}
        >
          Proceso de inversión
        </Box>
        <Box m="auto">
          <Box style={{ transform: `scale(${scale})` }}>
            <Container ref={containerRef} growing={growing}>
              <Circle background={steps[currentStep].color} />
              <Box
                ref={textRef}
                display="grid"
                gridTemplateRows="45% 55%"
                height="100%"
              >
                <Steps mt="7" as="h1">
                  {currentStep + 1}
                </Steps>
                <Text fontSize={[2, 3]} mt="1">
                  {steps[currentStep].text}
                </Text>
              </Box>
              <PointerContainer>
                <Pointer background={steps[nextStep].color} />
              </PointerContainer>
            </Container>
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="20px 1fr"
          gridTemplateRows={`repeat(auto-fit, minmax(20px, auto))`}
          gridGap={[1, 2, 3]}
          mb="2"
          px={["0", "2", "4", "6"]}
        >
          {steps.map((step, i) => (
            <Fragment key={i}>
              <Box
                alignSelf="center"
                style={{ transition: "width 0.25s ease" }}
                width={i === currentStep ? "20px" : "10px"}
                height="5px"
                borderRadius={4}
                bg={step.color}
              />
              <StepText
                fontSize={[0, 1, 2, 3]}
                px="1"
                fontWeight={i === currentStep ? "bold" : undefined}
              >
                {step.text}
              </StepText>
            </Fragment>
          ))}
        </Box>
      </StyledSection>
    </>
  );
};
const grow = keyframes`
  from {
    transform: scale(0.71);
  }
  to {
    transform: scale(0.7);
  }
`;

const shrink = keyframes`
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(0.71);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled(Box)<{ growing: boolean }>(({ growing }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: "250px",
  width: "250px",
  position: "relative",
  transform: "scale(0.5)",
  animation: `${growing ? grow : shrink} 1s ease forwards`,
}));

const Steps = styled(Box)(({ theme: { fontSizes } }) => ({
  fontSize: fontSizes[6],
  fontWeight: "bold",
  color: "#000",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  flexDirection: "column",
}));

const StepText = styled(Box)(() => ({
  alignSelf: "center",
  display: "flex",
  justifyContent: "flex-start",
  alignContent: "left",
  flexDirection: "column",
  textAlign: "left",
}));

const Circle = styled(Box)(() => ({
  height: "100%",
  width: "100%",
  borderRadius: "50%",
  position: "absolute",
  top: 0,
  left: 0,
  zOndex: -1,
}));
const Text = styled(Paragraph)(({ theme: { space } }) => ({
  color: "#000",
  padding: space[3],
}));
const PointerContainer = styled(Box)(() => ({
  position: "absolute",
  top: "-25px",
  left: "115px",
  width: "20px",
  height: "150px",
  animation: `${rotate} 17.5s linear forwards infinite`,
  transformOrigin: "bottom center",
}));
const Pointer = styled(Span)(() => ({
  borderRadius: "50%",
  height: "20px",
  width: "20px",
  display: "block",
  transition: "background 2.5s ease",
}));

const StyledSection = styled(Section)(({ theme: { colors } }) => ({
  textAlign: "center",
  color: colors.neutral.dark,
  position: "relative",
  backgroundColor: "#eaeef2",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2000' height='1000' viewBox='0 0 160 80'%3E%3Cg fill='%23cfd2d6' fill-opacity='0.18'%3E%3Cpolygon points='0 10 0 0 10 0'/%3E%3Cpolygon points='0 40 0 30 10 30'/%3E%3Cpolygon points='0 30 0 20 10 20'/%3E%3Cpolygon points='0 70 0 60 10 60'/%3E%3Cpolygon points='0 80 0 70 10 70'/%3E%3Cpolygon points='50 80 50 70 60 70'/%3E%3Cpolygon points='10 20 10 10 20 10'/%3E%3Cpolygon points='10 40 10 30 20 30'/%3E%3Cpolygon points='20 10 20 0 30 0'/%3E%3Cpolygon points='10 10 10 0 20 0'/%3E%3Cpolygon points='30 20 30 10 40 10'/%3E%3Cpolygon points='20 20 20 40 40 20'/%3E%3Cpolygon points='40 10 40 0 50 0'/%3E%3Cpolygon points='40 20 40 10 50 10'/%3E%3Cpolygon points='40 40 40 30 50 30'/%3E%3Cpolygon points='30 40 30 30 40 30'/%3E%3Cpolygon points='40 60 40 50 50 50'/%3E%3Cpolygon points='50 30 50 20 60 20'/%3E%3Cpolygon points='40 60 40 80 60 60'/%3E%3Cpolygon points='50 40 50 60 70 40'/%3E%3Cpolygon points='60 0 60 20 80 0'/%3E%3Cpolygon points='70 30 70 20 80 20'/%3E%3Cpolygon points='70 40 70 30 80 30'/%3E%3Cpolygon points='60 60 60 80 80 60'/%3E%3Cpolygon points='80 10 80 0 90 0'/%3E%3Cpolygon points='70 40 70 60 90 40'/%3E%3Cpolygon points='80 60 80 50 90 50'/%3E%3Cpolygon points='60 30 60 20 70 20'/%3E%3Cpolygon points='80 70 80 80 90 80 100 70'/%3E%3Cpolygon points='80 10 80 40 110 10'/%3E%3Cpolygon points='110 40 110 30 120 30'/%3E%3Cpolygon points='90 40 90 70 120 40'/%3E%3Cpolygon points='10 50 10 80 40 50'/%3E%3Cpolygon points='110 60 110 50 120 50'/%3E%3Cpolygon points='100 60 100 80 120 60'/%3E%3Cpolygon points='110 0 110 20 130 0'/%3E%3Cpolygon points='120 30 120 20 130 20'/%3E%3Cpolygon points='130 10 130 0 140 0'/%3E%3Cpolygon points='130 30 130 20 140 20'/%3E%3Cpolygon points='120 40 120 30 130 30'/%3E%3Cpolygon points='130 50 130 40 140 40'/%3E%3Cpolygon points='120 50 120 70 140 50'/%3E%3Cpolygon points='110 70 110 80 130 80 140 70'/%3E%3Cpolygon points='140 10 140 0 150 0'/%3E%3Cpolygon points='140 20 140 10 150 10'/%3E%3Cpolygon points='140 40 140 30 150 30'/%3E%3Cpolygon points='140 50 140 40 150 40'/%3E%3Cpolygon points='140 70 140 60 150 60'/%3E%3Cpolygon points='150 20 150 40 160 30 160 20'/%3E%3Cpolygon points='150 60 150 50 160 50'/%3E%3Cpolygon points='140 70 140 80 150 80 160 70'/%3E%3C/g%3E%3C/svg%3E")`,
}));