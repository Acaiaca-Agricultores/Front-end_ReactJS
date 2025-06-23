import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps as useChakraSteps,
} from "@chakra-ui/react";

export const steps = [
  { title: "Etapa 1", description: "Dados Pessoais" },
  { title: "Etapa 2", description: "Endereço da Propriedade" },
  { title: "Etapa 3", description: "Tipo de Usuário" },
];

export const useAppStepperControls = () => {
  const stepperControls = useChakraSteps({
    index: 0,
    count: steps.length,
  });
  return stepperControls;
};

const AppStepper = ({ steps: stepsProp, activeStep }) => {
  return (
    <Stepper
      index={activeStep}
      orientation={"vertical"}
      color="#ffffff"
      size="lg"
      height="auto"
      gap="0"
      display={{ base: "none", md: "flex" }}
      role="navigation"
      aria-label="Progresso do cadastro"
    >
      {stepsProp.map((step, index) => (
        <Step key={index}>
          <StepIndicator
            sx={{
              "&[data-status='active']": {
                background: "#83a11d",
                borderColor: "#83a11d",
                color: "white",
              },
              "&[data-status='complete']": {
                background: "#83a11d",
                borderColor: "#83a11d",
                color: "white",
              },
            }}
            aria-label={`${step.title}: ${step.description} - ${index <= activeStep ? 'Concluída' : index === activeStep ? 'Atual' : 'Pendente'}`}
          >
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
              sx={{
                "&[data-status='active']": {
                  background: "#83a11d",
                  borderColor: "#83a11d",
                  color: "white",
                },
                "&[data-status='complete']": {
                  background: "#83a11d",
                  borderColor: "#83a11d",
                  color: "white",
                },
              }}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle tabIndex={0}>{step.title}</StepTitle>
            <StepDescription color={"#ffffff"} tabIndex={0}>{step.description}</StepDescription>
          </Box>

          <StepSeparator
            sx={{
              "&[data-status='active']": {
                background: "#83a11d",
                borderColor: "#83a11d",
                color: "white",
              },
              "&[data-status='complete']": {
                background: "#83a11d",
                borderColor: "#83a11d",
                color: "white",
              },
            }}
          />
        </Step>
      ))}
    </Stepper>
  );
};

export default AppStepper;
