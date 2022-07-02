import Footer from "../components/Footer";
import Header from "../components/Header";

import styles from "/src/styles/perguntas-frequentes.module.css"

export default function PerguntasFrequentes() {
    return (
        <div>
            <Header />

            <section className={"header"}>
                <div className="wrapper">
                    <header>
                        <h4>Perguntas Frequentes</h4>
                        <h1>Perdido? Estamos aqui pra te ajudar.</h1>
                        <p>
                            Tire suas dúvidas e fique por dentro de tudo relacionado ao aplicativo.
                        </p>
                    </header>
                </div>
            </section>

            <section className={styles.questions}>
                <div className="wrapper">
                    <div className={styles.content}>
                        <div className={styles.pergunta} id="por-que-o-aplicativo-nao-esta-disponivel-para-dispositivos-ios">
                            <header>
                                <h4>Pergunta 1</h4>
                                <h2>Por que o aplicativo não está disponível para dispositivos iOS?</h2>
                            </header>
                            <p>
                                O desenvolvimento de aplicações para múltiplas plataformas não é algo tão simples quanto
                                parece para times pequenos <small>(principalmente quando o time é composto por uma
                                    pessoa 🙂)</small>
                                <br /> <br />
                                Como o aplicativo foi desenvolvido e testado desde o início em dispositivos Android,
                                mais acessíveis e simples de desenvolver (em linhas gerais), o desenvolvimento do app
                                para dispositivos iOS demandaria, no mínimo, diversos meses de trabalho duro. <br /> <br />
                                Além das limitações logísticas, em dispositivos iOS, desenvolvidos e mantidos pela
                                Apple®, a produção de um aplicativo torna-se mais complicada. <br /> <br />
                                Para podermos sermos
                                capazes de publicar (e testar versões internas antes do lançamento ao público) uma taxa
                                de $99/ano é aplicada. Esse valor, infelizmente, está fora de nossa realidade. <br /> <br />
                                Em adição à taxa, o desenvolvimento de aplicações iOS está limitado para computadores da
                                marca Apple®, também inacessíveis para nós.
                                Mediante esse texto, esperamos que a situação tenha sido esclarecida.
                            </p>
                        </div>
                        <div className={styles.pergunta} id="por-que-o-aplicativo-nao-esta-disponivel-na-playstore">
                            <header>
                                <h4>Pergunta 2</h4>
                                <h2>Por que o aplicativo não está disponível na PlayStore?</h2>
                            </header>
                            <p>
                                Mesmo possuindo menos limitações que o sistema operacional iOS, o Android, desenvolvido e
                                mantido pela Google®, possui taxa ($25) para publicação de aplicativos na loja principal do
                                sistema (PlayStore). <br /> <br />
                                Entretanto, diferentemente do iOS, que não permite a execução de aplicativos externos, não
                                fornecidos pela AppStore, o Android permite a instalação e execução de aplicativos obtidos
                                por fontes externas, como, por exemplo, NÓS! <br /> <br />
                                Mediante esse texto, esperamos ter o esclarecido o motivo do aplicativo só estar disponível
                                para dispositivos Android.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}