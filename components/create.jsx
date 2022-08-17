import { useState,useEffect} from 'react'
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs } from 'firebase/firestore';


const alimentos = collection(database,'alimentos')

export default function Create() {

    const [nome, setNome] = useState('')
    const [validade, setValidade] = useState('')
  
    const cadastrar = ()=>{
      addDoc(alimentos,
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
        <div class="cadOut">
          <div class="cadIn">
            <h3 className='text-center cadTitle'>CADASTRAR</h3>
              <input type="text" name="nome" placeholder='Produto' className='form-control' id="" required onChange={event=>setNome(event.target.value)} value={nome} />
             <input type="date" name="validade" id="" class="cadDate" required onChange={event=>setValidade(event.target.value)} value={validade} />
            <input type="submit" value="SALVAR" onClick={cadastrar} className='form-control btn btn-outline-dark' />
          </div>  
        </div>  
      </>
    )
  }