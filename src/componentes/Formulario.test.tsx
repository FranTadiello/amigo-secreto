import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";
import { RecoilRoot } from 'recoil';

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

test('adicionar um participante caso exista um nome preenchido', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    //encontrar no DOM o input (buscando na tela o texto)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    //encontrar botão (pela responsabilidade do elemento - submeter)
    const botao = screen.getByRole('button')
    //Inserir valor no input (usuário digitando)
    fireEvent.change(input,{
        target: {
            value: 'Ana Catarina'
        }
    })
    //Clicar no botão de submeter
    fireEvent.click(botao)
    //Garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus()
    //Garantir que o input não tenha um valor (limpar após submeter)
    expect(input).toHaveValue('')
})