import Head from 'next/head'
import Create from '../components/create'
import Read from '../components/read'

export default function Home() {
  return (
    <>
    <body class="background"> 
       <Head>
          <title>Crud Simples com Firestore</title>
       </Head>

       <h1 class="titulo">Cadastre abaixo seus alimentos</h1>

       <main className="container">
        <div className="row">

        <a href="/descarte"><button className='descatados'>Ver Descartados</button></a>
          
          <div className="col-lg">
            <Create/>
        </div>
        <div className="col-lg">
          <Read/>
        </div>
        </div>
      </main>
    </body>
    </>
  )
}
