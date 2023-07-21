import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"

const ListaParticipantes = () => {
    const participantes: string[] = useListaDeParticipantes()

    return(
        //li não precisa de role por ja estar com as tags semânticas
        <ul>    
            {participantes.map(participante => <li key={participante}>{participante}</li> )}
        </ul>
    )
}

export default ListaParticipantes