import { listaParticipantesState } from "../atom";
import { useSetRecoilState } from "recoil";

export const useAdicionarParticipante = () => {
    const setLista = useSetRecoilState(listaParticipantesState)
    return (nomeDoParticipante: string) => {
        return setLista(listaAtual => [...listaAtual, nomeDoParticipante])
    }
}