import { useEffect, useState } from "react";
import { FormControl, FormLabel, Select, Spinner } from "@chakra-ui/react";

const API_URL_ESTADOS =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

export default function SelectEstadoCidade({
  selectedEstado,
  setSelectedEstado,
  selectedCidade,
  setSelectedCidade,
  labelEstado = "Estado",
  labelCidade = "Cidade",
  isRequired = true,
  errorEstados,
  errorCidades,
  toast,
  ...props
}) {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingCidades, setLoadingCidades] = useState(false);

  useEffect(() => {
    setLoadingEstados(true);
    setEstados([]);
    fetch(API_URL_ESTADOS)
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .catch(() => {
        if (toast) {
          toast({
            title: "Erro ao carregar estados",
            description: "Não foi possível carregar os estados.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .finally(() => setLoadingEstados(false));
  }, []);

  useEffect(() => {
    if (selectedEstado) {
      setLoadingCidades(true);
      setCidades([]);
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstado}/municipios?orderBy=nome`
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCidades(data);
          } else {
            setCidades([]);
          }
        })
        .catch(() => {
          setCidades([]);
          if (toast) {
            toast({
              title: "Erro ao carregar cidades",
              description: "Não foi possível carregar as cidades.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .finally(() => setLoadingCidades(false));
    } else {
      setCidades([]);
      setSelectedCidade("");
    }
    // eslint-disable-next-line
  }, [selectedEstado]);

  return (
    <>
      <FormControl mb={4} isRequired={isRequired} isInvalid={!!errorEstados}>
        <FormLabel>{labelEstado}</FormLabel>
        {loadingEstados && <Spinner size="sm" mr={2} />}
        <Select
          border={"2px solid  #83a11d"}
          _focus={{
            borderColor: "#c0ab8e",
            boxShadow: "0 0 0 1px #e5d1b0",
          }}
          placeholder="Selecione um estado"
          value={selectedEstado}
          onChange={(e) => setSelectedEstado(e.target.value)}
          isDisabled={loadingEstados || !!errorEstados}
          {...props}
        >
          {estados.map((estado) => (
            <option key={estado.id} value={estado.sigla} style={{ color: '#000' }}>
              {estado.nome}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired={isRequired} isInvalid={!!errorCidades}>
        <FormLabel>{labelCidade}</FormLabel>
        {loadingCidades && <Spinner size="sm" mr={2} />}
        <Select
          placeholder={
            selectedEstado
              ? "Selecione uma cidade"
              : "Selecione um estado primeiro"
          }
          value={selectedCidade}
          onChange={(e) => setSelectedCidade(e.target.value)}
          isDisabled={
            loadingCidades ||
            !selectedEstado ||
            !Array.isArray(cidades) ||
            cidades.length === 0 ||
            !!errorCidades
          }
          {...props}
        >
          {Array.isArray(cidades) && cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.nome} style={{ color: '#000' }}>
              {cidade.nome}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
