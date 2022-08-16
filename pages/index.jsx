import Head from 'next/head'
import Create from '../components/create'
import Read from '../components/read'

export default function Home() {
  return (
    <>
      <Head>
        <title>Crud Simples com Firestore</title>
      </Head>
      <main className="container">
      <div className="row">
        <div className="col-lg">
          <Create/>
      </div>
      <div className="col-lg">
        <Read/>
      </div>
      </div>
    </main>
    </>
  )
}
