import { render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";

//usando Jest e react
test('quando o input esta vazio, novos participantes não podem ser adicionados', () => {
    render(<Formulario />)
    //encontrar no DOM o input (buscando na tela o texto)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    //encontrar botão (pela responsabilidade do elemento - submeter)
    const botao = screen.getByRole('button')
    //garantir que o input esteja no documento
    expect(input).toBeInTheDocument()
    //garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled()
})