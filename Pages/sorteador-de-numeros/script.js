const pDrawnNumber = document.getElementById('p-drawn-number');
const btnDrawn = document.getElementById('btn-drawn');
const gifOverlay = document.querySelector('.gif-overlay');  
const inputEntre= document.getElementById('input-entre');
const inputE = document.getElementById('input-e');
const divGoldCircle = document.querySelector('.gold-circle');
const tempoTotal = 5000; // Tempo total da animação em milissegundos
const imgSetaDir = document.querySelector('.img-seta-dir');
const imgSetaEsq = document.querySelector('.img-seta-esq');
const dialogValor = document.getElementById('dialogValor');

imgSetaDir.style.top= divGoldCircle.getBoundingClientRect().top - 100 + 'px';
imgSetaEsq.style.top= divGoldCircle.getBoundingClientRect().top - 100 + 'px';




btnDrawn.addEventListener('click',function(){


    
    if(inputEntre.value < inputE.value){
        let drawnNumber = randomNumber(parseInt(inputEntre.value), parseInt(inputE.value));
        gifOverlay.src = '';  // resolve bug do GIF não reiniciar
        visualRandomNumber(parseInt(inputEntre.value), parseInt(inputE.value), drawnNumber, tempoTotal); 
    }else{
        dialogValor.showModal();
        
    }

    
      
})





function randomNumber(min, max) {
    if(min < max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }else{
        dialogValor.showModal();
    }
}



function visualRandomNumber(min, max, numberDrawn, tempoTotal) {
    let intervalo = 50; // começa rápido
    let tempoPassado = 0;

    const animacao = setInterval(() => {
        const visualRandomNumbers = Math.floor(Math.random() * (max - min + 1)) + min;
        pDrawnNumber.innerHTML = visualRandomNumbers;
        console.log(tempoPassado);
        tempoPassado += intervalo;

        
        intervalo += 15; // Aumenta o intervalo proporcionalmente ao tempo total

        // quando acabar o tempo, para
        if (tempoPassado >= tempoTotal) {
            clearInterval(animacao);
            finishDrawn(numberDrawn);
        }
    }, intervalo);
}





function finishDrawn() {
    divGoldCircle.style.animation = 'pulsar 1.5s ease-in-out infinite alternate';
    gifOverlay.style.display = 'block';
    gifOverlay.src = '';  // resolve bug do GIF não reiniciar
    gifOverlay.src = 'assets/0401.gif';
    imgSetaDir.style.display = 'block';
    imgSetaEsq.style.display = 'block';

    setTimeout(() => {
        gifOverlay.style.display = 'none';
        divGoldCircle.style.animation = ''; // Remove a animação 
        
    }, 12000); // 12 segundos de celebração e o GIF some
    setTimeout(() => {
        pDrawnNumber.innerHTML = "?";
        imgSetaDir.style.display = 'none';
        imgSetaEsq.style.display = 'none';
    }, 20000); // 20 segundos para resetar o número sorteado
}

window.addEventListener('resize', function() {
    imgSetaDir.style.top= divGoldCircle.getBoundingClientRect().top - 100 + 'px';
    imgSetaEsq.style.top= divGoldCircle.getBoundingClientRect().top - 100 + 'px';
});




