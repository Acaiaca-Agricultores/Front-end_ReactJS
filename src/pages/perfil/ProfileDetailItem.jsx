import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Icon,
} from "@chakra-ui/react";

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
}) => {
  if (isEditing) {
    return (
      <FormControl id={name}>
        <FormLabel
          display="flex"
          alignItems="center"
          color="gray.300"
          fontSize="sm"
        >
          {icon && <Icon as={icon} mr={2} />} {label}
        </FormLabel>
        <Input
          name={name}
          type={inputType}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder || `Seu ${label.toLowerCase()}`}
          color="black"
          bg="transparent"
          border={"2px solid  #83a11d"}
          _hover={{ border: "2px solid  #83a11d" }}
          _focus={{
            borderColor: "#c0ab8e",
            boxShadow: "0 0 0 1px #e5d1b0",
          }}
        />
      </FormControl>
    );
  }
  return (
    <Box>
      <Text fontSize="sm" color="gray.400" display="flex" alignItems="center">
        {icon && <Icon as={icon} mr={2} />} {label}
      </Text>
      <Text
        fontSize="md"
        p={2}
        borderWidth="1px"
        borderRadius="md"
        minHeight="40px"
        border={"2px solid  #83a11d"}
      >
        {value || "Não informado"}
      </Text>
    </Box>
  );
};

export default ProfileDetailItem;
