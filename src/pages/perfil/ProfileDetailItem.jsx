import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Icon,
  IconButton,
  Tooltip,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMic, FiMicOff } from "react-icons/fi";

const ProfileDetailItem = ({
  icon,
  label,
  value,
  isEditing,
  name,
  formData,
  handleInputChange,
  placeholder,
  inputType = "text",
  onVoiceRecording,
  isRecording,
}) => {
  const textColor = useColorModeValue("gray.700", "gray.200");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("#83a11d", "#a4cc24");
  const accentColor = "#52601A";

  if (isEditing) {
    return (
      <FormControl id={name}>
        <FormLabel
          display="flex"
          alignItems="center"
          color={labelColor}
          fontSize="sm"
          fontWeight="medium"
        >
          {icon && <Icon as={icon} mr={2} />} {label}
        </FormLabel>
        <HStack spacing={2}>
          <Input
            name={name}
            type={inputType}
            value={formData[name] || ""}
            onChange={handleInputChange}
            placeholder={placeholder || `Seu ${label.toLowerCase()}`}
            color={textColor}
            bg="transparent"
            border={`2px solid ${borderColor}`}
            _hover={{ border: `2px solid ${borderColor}` }}
            _focus={{
              borderColor: accentColor,
              boxShadow: `0 0 0 1px ${accentColor}`,
            }}
            _placeholder={{ color: "gray.400" }}
          />
          {onVoiceRecording && (
            <Tooltip 
              label={isRecording ? "Parar gravação" : "Gravar com voz"}
              placement="top"
            >
              <IconButton
                icon={isRecording ? <FiMicOff /> : <FiMic />}
                aria-label={isRecording ? "Parar gravação" : "Gravar com voz"}
                size="sm"
                colorScheme={isRecording ? "red" : "green"}
                onClick={() => onVoiceRecording(name)}
                variant={isRecording ? "solid" : "outline"}
              />
            </Tooltip>
          )}
        </HStack>
      </FormControl>
    );
  }
  
  return (
    <Box>
      <Text fontSize="sm" color={labelColor} display="flex" alignItems="center" mb={2}>
        {icon && <Icon as={icon} mr={2} />} {label}
      </Text>
      <Text
        fontSize="md"
        p={3}
        borderWidth="1px"
        borderRadius="md"
        minHeight="40px"
        border={`2px solid ${borderColor}`}
        color={textColor}
        bg="transparent"
        display="flex"
        alignItems="center"
      >
        {value || "Não informado"}
      </Text>
    </Box>
  );
};

export default ProfileDetailItem;
