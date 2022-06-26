import {evaluate} from 'mathjs'
import  "./index.css"
import {useState} from  "react"
import { type } from '@testing-library/user-event/dist/type';
let sum="";
function App() {
 let subResult=0;
    const checkExpression=(res)=>{
        if(res.at(-1)==="+"||res.at(-1)==="-"||res.at(-1)==="/"||res.at(-1)==="%"||res.at(-1)==="*"){
            res=res.slice(0,-1);
            return checkExpression(res);
        }

        else{
            return res
        }

    }
 const [result, setresult] = useState("")
    let a;
 const clearResultHandler=()=>{
        setresult("");
        sum="";
    }
  const writeHandler=(e)=>{
    a=e.target.innerText;
    const operator=e.target.value;
    if(result===""){
        if(a==="0"||a==="/"||a==="%"||a==="X"){
            sum="";
            return;
        }
    sum=sum+""+a;

    }
    if(result!==""){
        if((result.at(-1)==="/"||result.at(-1)==="%"||result.at(-1)==="+"||result.at(-1)==="-"||result.at(-1)==="X")&&(a==="/"||a==="%"||
        a==="+"||a==="-"||a==="X")){
            return;
            
        }
        else{
            sum=sum+""+a;

        }
    }


    setresult(sum)

        if(result==="Error"){
            setresult("");
            sum="";
            return;
        }
        
        if(result.length>=10){
            setresult("Error");
            return;
        }        
  }
  const backSpace=()=>{
    let value=result;
    value=value.slice(0,-1);
    setresult(value);
    sum=value;
  }
  const ResultHandler=()=>{
  if(result){
    let res=result.replaceAll("X","*");
  res= checkExpression(res);
  const ans=evaluate(res)  ;
  setresult(ans.toFixed(1));
  sum=ans.toFixed(1) ;
  }

  }
  
  
    return (  
<div className="container" >
<div className="output"><div>{result}</div></div>
<div className="">
<button className="btn operater" onClick={clearResultHandler}>Clr</button>
<button className="btn operater" onClick={backSpace}>-></button>
<button className="btn operater" onClick={writeHandler} value="operator">%</button>
<button className="btn operater" onClick={writeHandler} value="operator">/</button>
</div>
<div>
<button className="btn" onClick={writeHandler} >7</button>
<button className="btn" onClick={writeHandler} >8</button>
<button className="btn" onClick={writeHandler} >9</button>
<button className="btn operater"  onClick={writeHandler} value="operator">X</button>
</div><div>
<button className="btn" onClick={writeHandler} >4</button>
<button className="btn" onClick={writeHandler} >5</button>
<button className="btn" onClick={writeHandler} >6</button>
<button className="btn operater" onClick={writeHandler} value="operator">-</button>
</div><div>
<button  className="btn" onClick={writeHandler}>1</button>
<button className="btn" onClick={writeHandler} >2</button>
<button className="btn" onClick={writeHandler} >3</button>
<button className="btn operater" onClick={writeHandler} value="operator">+</button>
</div><div>
<button className="btn0 btn" onClick={writeHandler} >0</button>
<button className="btn"  onClick={writeHandler} >.</button>
<button className="btn operater" onClick={ResultHandler}>=</button>
</div>
</div>
    );
}


export default App;
