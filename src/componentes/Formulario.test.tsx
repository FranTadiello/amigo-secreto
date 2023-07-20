import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";
import { RecoilRoot } from 'recoil';

//usando Jest e react
describe('o comportamento do Formulario.tsx', () => {
    test('quando o input esta vazio, novos participantes não podem ser adicionados', () => {
        render(<RecoilRoot><Formulario /></RecoilRoot>)
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
        
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
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
    
    test('nomes duplicados não podem ser adicionados na lista', () => {
        render(<RecoilRoot><Formulario /></RecoilRoot>)
        
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')   
        fireEvent.change(input,{
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
        fireEvent.change(input,{
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
        const mensagemDeErro = screen.getByRole('alert')
        expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos')
    })
    
    test('a mensagem de erro deve sumir após os timers', () => {
        jest.useFakeTimers()
        render(<RecoilRoot><Formulario /></RecoilRoot>)   
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')   
        fireEvent.change(input,{
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
        fireEvent.change(input,{
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
        let mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeInTheDocument()
        //esperar N segundos
        act(() => {
            jest.runAllTimers()
        });
        mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeNull()
    })
})