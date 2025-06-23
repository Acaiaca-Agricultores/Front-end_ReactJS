import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";

const formatPhone = (value) => {
  if (!value) return value;
  value = value.replace(/\D/g, "");
  if (value.length <= 10) {
    return value
      .replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
      .replace(/-$/, "");
  }
  return value
    .replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
    .replace(/-$/, "");
};

export const useSpeechRecognition = ({ setValue, fieldSetter }) => {
  const [recognition, setRecognition] = useState(null);
  const [recordingField, setRecordingField] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = "pt-BR";
      rec.interimResults = false;
      setRecognition(rec);
    } else {
      toast({
        title: "Navegador incompatível",
        description:
          "Seu navegador não suporta a funcionalidade de gravação de voz.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  const stopRecording = useCallback(() => {
    if (recognition && recordingField) {
      try {
        recognition.stop();
        setRecordingField(null);
      } catch (error) {
        console.log("Error stopping speech recognition:", error);
      }
    }
  }, [recognition, recordingField]);

  const handleToggleRecording = useCallback((fieldName, options = {}) => {
    if (!recognition) {
      toast({
        title: "Funcionalidade não disponível",
        description: "Reconhecimento de voz não está disponível no seu navegador.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (recordingField) {
      if (recordingField === fieldName) {
        recognition.stop();
      }
      return;
    }

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;

      if (options.trim) {
        transcript = transcript.replace(/\s/g, "");
      }
      if (options.toLowerCase) {
        transcript = transcript.toLowerCase();
      }
      if (options.formatPhone) {
        transcript = formatPhone(transcript);
      }

      if (setValue) {
        setValue(fieldName, transcript, { shouldValidate: true });
      } else if (fieldSetter) {
        fieldSetter(transcript);
      } else if (options.setter) {
        options.setter(transcript);
      }

      toast({
        title: "Texto reconhecido!",
        description: `O texto foi inserido no campo ${fieldName}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      toast({
        title: "Erro no reconhecimento de voz",
        description: `Erro: ${event.error}. Verifique as permissões do microfone.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setRecordingField(null);
    };

    recognition.onend = () => {
      setRecordingField(null);
    };

    try {
      recognition.start();
      setRecordingField(fieldName);
      toast({
        title: "Gravando...",
        description: `Fale agora para preencher o campo "${fieldName}"`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      toast({
        title: "Erro ao iniciar gravação",
        description: "Não foi possível iniciar a gravação de voz.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [recognition, recordingField, setValue, fieldSetter, toast]);

  return { handleToggleRecording, recordingField, stopRecording };
}; 