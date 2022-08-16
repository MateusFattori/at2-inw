import { useState,useEffect} from 'react'
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs, orderBy, query, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const alimentos = collection(database,'alimentos')

const descartados = collection(database,'descartados')

export default function Read() {
  
  const [alimentosLista, setLista] = useState([])
  const read = ()=>{
  getDocs(query(alimentos,orderBy("validade")))
    .then((data)=>{
      setLista(data.docs.map((item)=>{
        return{...item.data(), id:item.id}
      }))
    })
  }

  useEffect(()=>{
    read()
  },[])

  // Função do botão excluir
  const deleteBtn = (id)=>{
    const documento = doc(database,"alimentos",id)
    deleteDoc(documento)
    .then(()=>{
    read()
    })
  }

// Rotina de Update início

// Mostrar o contato selecionado
const [ID, setID]=useState(null)
const [contatoUnico,setContatoUnico]=useState({})
const [mostrar,setMostrar] = useState(false)
const [nome,setNome] = useState("")
const [validade,setValidade] = useState("")

const show = async(id)=>{
  setID(id)
  if(ID!=null){
    const contatoSimples = doc(database,"alimentos",ID)
    const resultado = await getDoc(contatoSimples)
    setContatoUnico({...resultado.data(),id:resultado.id})
    setNome(contatoUnico.nome)
    setValidade(contatoUnico.validade)
    //setMostrar(true)
  }
}

useEffect(()=>{
  show()
},[ID])

const bt_cancelar = ()=>{
  setMostrar(false)
  setNome("")
  setValidade("")
  setID(null)
}

const bt_alterar = (id)=>{
  const alimentosShow = doc(database,"alimentos",id)
  updateDoc(alimentosShow,{
    nome: nome, validade:validade
  }).then(()=>{
    setNome("")
    setValidade("")
    setID(null)
    read()
    setMostrar(false)
  })
}

const descarte = ()=>{
  addDoc(descartados,
    { nome:nome,
      validade:validade
    }
    ).then(()=>{
      setNome('')
      setValidade('')
      window.location.reload()
    })
}

// Rotina de Update fim

  return (
    <>
    {mostrar ?(
      <div>
        <h3 className="text-center">ALTERAR</h3>
        <input type="text" name="nome" placeholder='Nome' className='form-control' id="" required onChange={event=>setNome(event.target.value)} value={nome} />
        <input type="date" name="validade" id="" required onChange={event=>setValidade(event.target.value)} value={validade} />
        <input type="button" value="CANCELAR" className="form-control btn btn-outline-danger" onClick={bt_cancelar} />
        <input type="submit" value="SALVAR" className='form-control btn btn-outline-dark' onClick={()=>bt_alterar(contatoUnico.id)} />
      </div>
    ):(
      <></>
    )}
        <h3 className='text-center'>GRAVADOS</h3>
        {alimentosLista.map((lista)=>{
          return(
            <div className='card'>
              <div className="card-header bg-dark text-light">{lista.nome}</div>
              <div className='card-body'>
              <p className='card-subtitle'>{lista.validade}</p>
              </div>
              <div className='card-footer text-center'>
              <div className="input-group">
              <input type="button" className='btn-outline-warning form-control' value="Alterar" onClick={()=>show(lista.id)} />
              <input type="button" className='btn-outline-danger form-control' value="Excluir" onClick={()=>deleteBtn(lista.id)} />
              <input type="submit" value="DESCARTAR" onClick={descarte} className='form-control btn btn-outline-dark' />
              
              </div>
              </div>
            </div>
          )
        })}
    </>
  )
}
