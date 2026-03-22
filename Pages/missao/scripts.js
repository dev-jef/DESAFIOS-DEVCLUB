


let botao = document.querySelector(".botao-gerar")
let blocoCodigo = document.querySelector(".bloco-codigo")
let resultadoCodigo = document.querySelector(".resultado-codigo")
let resultados = document.querySelector(".resultados")

//resultados.style.display="none";


const na ="Z3NrXzEyMzQ1Ng=="
const endereco = "https://api.groq.com/openai/v1/chat/completions";

async function gerarCodigo(){

    let txtValue = document.querySelector(".prompt").value
    let resposta = await fetch(endereco,{
        method:"POST",
        headers:{
            "Authorization": `Bearer ${atob(na)}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ 
            
                role: "system", 
                content: "Voçê é um gerador de codigo CSS. respostas apenas em uma div  " 
            },
            { 
                role: "user", 
                content: txtValue
            }]
        })
    })
    
    //resultados.style.display="flex";

    let dados = await resposta.json(resposta)
    let resultados = dados.choices[0].message.content

    blocoCodigo.textContent = resultados
    resultadoCodigo.srcdoc = resultados
    console.log(dados)
}
botao.addEventListener("click",gerarCodigo)