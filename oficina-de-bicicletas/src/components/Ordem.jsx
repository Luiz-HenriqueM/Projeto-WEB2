import { useState } from "react";

function Ordem() {
    const [ordemList, setOrdemList] = useState([
        { idOrdem: crypto.randomUUID(), dsCliente: "Luiz Henrique", dsServico: "Consertar a roda", nuValor: 60, fgConcluida: false },
        { idOrdem: crypto.randomUUID(), dsCliente: "Gustavo Guanabara", dsServico: "Arrumar o guidão", nuValor: 65, fgConcluida: true },
        { idOrdem: crypto.randomUUID(), dsCliente: "Eduardo", dsServico: "Trocar a corrente", nuValor: 30, fgConcluida: false }
    ]);

    const [dsCliente, setDsCliente] = useState("");
    const [dsServico, setDsServico] = useState("");
    const [nuValor, setNuValor] = useState("");
    const [idEmEdicao, setIdEmEdicao] = useState(null);

    const adicionarNaTela = (e) => {
        e.preventDefault();

        if (idEmEdicao !== null) {
            const novoServico = ordemList.map((pedido) =>
                pedido.idOrdem === idEmEdicao
                    ? { ...pedido, dsCliente, dsServico, nuValor }
                    : pedido
            );

            setOrdemList(novoServico);
            setIdEmEdicao(null);
        } else {
            const novoServico = {
                idOrdem: crypto.randomUUID(),
                dsCliente: dsCliente || "Novo Cliente",
                dsServico: dsServico || "Novo Serviço",
                nuValor: nuValor || "Preço desejado",
                fgConcluida: false
            };

            setOrdemList([...ordemList, novoServico]);
        }

        setDsCliente("");
        setDsServico("");
        setNuValor("");
    };

    const remove = (id) => {
        if (!confirm("Quer realmente tirar o pedido da lista?")) return;

        setOrdemList(ordemList.filter(
            (pedido) => pedido.idOrdem !== id
        ));
    };

    const finish = (id) => {
        setOrdemList(ordemList.map((pedido) =>
            pedido.idOrdem === id
                ? { ...pedido, fgConcluida: !pedido.fgConcluida }
                : pedido
        ));
    };

    const edit = (id) => {
        const pedido = ordemList.find(
            (pedido) => pedido.idOrdem === id
        );

        if (!pedido) return;

        setDsCliente(pedido.dsCliente);
        setDsServico(pedido.dsServico);
        setNuValor(pedido.nuValor);
        setIdEmEdicao(id);
    };

    return (
        <div>
            <h1>Lista de ordens de serviço</h1>

            <form onSubmit={adicionarNaTela}>
                <input
                    type="text"
                    placeholder="Digite um cliente"
                    value={dsCliente}
                    onChange={(e) => setDsCliente(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Digite o serviço"
                    value={dsServico}
                    onChange={(e) => setDsServico(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Digite o preço"
                    value={nuValor}
                    onChange={(e) => setNuValor(e.target.value)}
                />

                <button type="submit">
                    {idEmEdicao !== null
                        ? "Salvar alterações"
                        : "Adicionar serviço"}
                </button>
            </form>

            {idEmEdicao !== null && (
                <button onClick={() => {
                    setDsCliente("");
                    setDsServico("");
                    setNuValor("");
                    setIdEmEdicao(null);
                }}>
                    Cancelar
                </button>
            )}

            {ordemList.length === 0 && (
                <p>Nenhuma ordem de serviço cadastrada.</p>
            )}

            {ordemList.map((pedido) => (
                <div
                    key={pedido.idOrdem}
                    className={
                        pedido.idOrdem === idEmEdicao ? "editando" : ""
                    }
                >
                    <p style={{
                        textDecoration: pedido.fgConcluida
                            ? "line-through"
                            : "none"
                    }}>
                        Cliente: {pedido.dsCliente}
                        <br />
                        Serviço: {pedido.dsServico}
                        <br />
                        Valor: R$ {pedido.nuValor}
                        <br />
                        Status: {pedido.fgConcluida
                            ? "Concluído"
                            : "Pendente"}
                    </p>

                    <div className="botoes">
                        <button onClick={() => finish(pedido.idOrdem)}>
                            {pedido.fgConcluida
                                ? "Desfazer"
                                : "Concluir"}
                        </button>

                        <button
                            onClick={() => remove(pedido.idOrdem)}
                            disabled={pedido.idOrdem === idEmEdicao}
                        >
                            Remover
                        </button>

                        <button onClick={() => edit(pedido.idOrdem)}>
                            Editar
                        </button>
                    </div>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Ordem;