
//Funções
function formataMoeda(valor){
    valor = parseFloat(valor);
    return valor.toLocaleString('pt-AO',{
        minimumFractionDigits:2,
        style:'currency',
        currency:'AKZ'
    });
}
function incrementaItensCarrinho(){
    var numeroItensCarrinho = document.getElementById('carrinho-total-items');
    if(numeroItensCarrinho){
        var numIntensActual = parseInt(numeroItensCarrinho.innerText);
        numeroItensCarrinho.innerText =numIntensActual +1; 
    }
}
function calcularTotal(){
    if(document.getElementById('div-total')){
        var precosLista = document.getElementsByClassName('col-preco-total');
        var total = 0;
        for (let div of precosLista){
            let aux = div.innerHTML.replace(/[^0-9,]/g,'');
            aux = aux.replace(',','.');
            total += parseFloat(aux);
        }
        document.getElementById('div-total').innerHTML = "<p class='text-end me-2'>Total: <strong>"+formataMoeda(total)+"</strong></p>";
    }
}


// Add itm carro
var buttonsAddCarrinho =document.querySelectorAll('button');
var idsCarrosCarrinho = [];
if(buttonsAddCarrinho){
    buttonsAddCarrinho.forEach(function(button){
        button.addEventListener('click',function(){
            var btnAddCarrinhoIdIniciais = button.id.substring(0,9);
            if("carro-add" == btnAddCarrinhoIdIniciais){
                if(document.getElementById('div-total')){
                    document.getElementById('div-total').remove();
                }
                var carroId = button.id.substring(19);                 
                const dropdownMenu = document.getElementById('dropdown-menu');              
                var carroNome = document.getElementById("carro-nome-"+carroId).innerText;
                var carroImg = document.getElementById("carro-img-"+carroId).src;
                var carroPreco = document.getElementById("carro-preco-"+carroId).innerText;
                carroPreco = carroPreco.replace(/[^0-9,]/g,'');
                const row = document.createElement('div');
                row.classList.add('row');

                const colNome = document.createElement('div');
                colNome.classList.add('col-3');
                colNome.innerText = carroNome;
                
                const colImg = document.createElement('div');
                colImg.classList.add('col-3');
                const img = document.createElement('img');
                img.setAttribute('src',carroImg);
                img.style.width = "80px";
                img.classList.add("img-fluid");
                colImg.appendChild(img);
                console.log('carro preço:',carroPreco)
                const colPreco = document.createElement('div');
                colPreco.classList.add('col-preco');
                colPreco.classList.add('col-2');
                colPreco.setAttribute('id','preco-'+carroId);
                colPreco.innerText = formataMoeda(carroPreco);
                
                const numDias = document.createElement('div');
                numDias.classList.add('col-2');
                const input = document.createElement('input');
                input.classList.add('form-control');
                input.value= 1;
                input.setAttribute('type','number');
                input.setAttribute('id','input-'+carroId);
                numDias.appendChild(input);
                
                const precoTotal = document.createElement('div');
                precoTotal.classList.add('col-preco-total');
                precoTotal.classList.add('col-2');
                precoTotal.setAttribute('id','preco-total-'+carroId);
                precoTotal.innerText = formataMoeda(carroPreco);

                row.appendChild(colNome);
                row.appendChild(colImg);
                row.appendChild(colPreco);
                row.appendChild(numDias);
                row.appendChild(precoTotal);
                
                const divDivider = document.createElement('div');
                divDivider.classList.add('border');
                divDivider.classList.add('my-2');
                
                var precosLista = document.getElementsByClassName('col-preco');
                var total = parseFloat(carroPreco);
                for (let div of precosLista){
                    let aux = div.innerHTML.replace(/[^0-9,]/g,'');
                    aux = aux.replace(',','.');
                    total += parseFloat(aux);
                }
            
                const divTotal = document.createElement('div');
                divTotal.setAttribute('id','div-total');
                divTotal.innerHTML = "<p class='text-end me-2'>Total: <strong>"+formataMoeda(total)+"</strong></p>"

                dropdownMenu.appendChild(row);
                dropdownMenu.appendChild(divDivider);
                dropdownMenu.appendChild(divTotal);
                incrementaItensCarrinho();
                //idsCarrosCarrinho.push(carroId);
                button.setAttribute('disabled','true');
                //Talvez nã seja necessário, testar depois
                calcularTotal();
                input.addEventListener('input',function(){
                    if(this.value <1){
                        this.value = 1;
                    }
                    let carroId = this.id.substring(6);
                    let preco = document.getElementById('preco-'+carroId).innerHTML;
                    preco = preco.replace(/[^0-9,]/g,'');
                    preco = preco.replace(',','.');
                    console.log('preço parcial:', preco);
                    let qtd = this.value;
                    let resultado = parseFloat(preco)*parseInt(qtd);
                    document.getElementById('preco-total-'+carroId).innerText = formataMoeda(resultado);
                    console.log('preço total:', resultado);
                    calcularTotal();
                    
                })
            }

        });
    });
}
document.addEventListener("DOMContentLoaded",function(){
    document.querySelectorAll("#menu a").forEach(function(a){
        let urlActual = document.URL.slice(22);
        if(a.getAttribute("href") == urlActual){
            a.classList.add("active");
        }
    });
});