import { useState,useEffect} from 'react'
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs, orderBy, query, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const descartados = collection(database,'descartados')


export default function Descarta(){


    const [DescartadosLista, setLista] = useState([])

    const ler = ()=>{
        getDocs(query(descartados,orderBy("validade")))
          .then((data)=>{
            setLista(data.docs.map((item)=>{
              return{...item.data(), id:item.id}
            }))
          })
        }
    
        useEffect(()=>{
      ler()
    },[])

    
    const [descarteUnico,setDescarteUnico]=useState({})
    const [ID, setID]=useState(null)
    const [mostrar,setMostrar] = useState(false)
    const [nome,setNome] = useState("")
    const [validade,setValidade] = useState("")

    const mostre = async(id)=>{
        setID(id)
        if(ID!=null){
          const descarteSimples = doc(database,"descartados",ID)
          const resultado = await getDoc(descarteSimples)
          setDescarteUnico({...resultado.data(),id:resultado.id})
          setNome(descarteUnico.nome)
          setValidade(descarteUnico.validade)
          //setMostrar(true)
        }
      }
      
      useEffect(()=>{
        mostre()
      },[ID])

const btn_descartar = ()=>{
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

    return (
        <>
        {mostrar ?(
          <div>
            <h3 className="text-center"></h3>
            <input type="text" name="nome" placeholder='Nome' className='form-control' id="" required onChange={event=>setNome(event.target.value)} value={nome} />
            <input type="date" name="validade" id="" required onChange={event=>setValidade(event.target.value)} value={validade} />
          </div>
        ):(
          <></>
        )}
          <div class="gravOut">
            <div class="gravIn">
              <h3 className='text-center gravTitle'>GRAVADOS</h3>
              {DescartadosLista.map((lista)=>{
                return(
                  <div className='card'>
                    <div className="card-header bg-dark text-light">{lista.nome}</div>
                    <div className='card-body gravBody'>
                    <p className='card-subtitle gravBody'>{lista.validade}</p>
                    </div>
                    <div className='card-footer text-center gravButao'>
                    <div className="input-group">
                  </div>
                  </div>
                </div>
              )
            })}
            </div>
          </div>   
        </>
      )
}

