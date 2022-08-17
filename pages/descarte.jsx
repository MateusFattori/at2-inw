import Read from "../components/read";
import Descartar from "../components/descartados";

export default function Descarte() {
        return(
            <>
                <main className="container">
                
                    <div className="row">
                    
                        <a href="/"><button className='descatados'>Cadastrar produto</button></a>

                
                    <div className="borda">
                    <h3 className="text-start">Exibir</h3>

                        <div className="cova">

                            <div>

                                <h5 className="text-start">Descarte</h5>
                                <Descartar/>

                            </div>

                        </div>

                    </div>

                    </div>
                </main>
            </>
        )
}