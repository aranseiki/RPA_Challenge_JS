const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
const xlsx = require('xlsx');

var workbook = xlsx.readFile('challenge.xlsx');
var navegador = webdriver;
var nome_da_primeira_planilha = workbook.SheetNames[0];
let nova_posicao_da_linhas = [], celula, novo_valor_da_celula = [], valor_da_celula;

let posicao_da_linhas = [['A1','A2','A3','A4','A5','A6','A7','A8','A9','A10','A11'],
                        ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11'], 
                        ['C1','C2','C3','C4','C5','C6','C7','C8','C9','C10','C11'],
                        ['D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11'], 
                        ['E1','E2','E3','E4','E5','E6','E7','E8','E9','E10','E11'],
                        ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11'], 
                        ['G1','G2','G3','G4','G5','G6','G7','G8','G9','G10','G11']]

let linhas = [['A2','B2','C2','D2','E2','F2','G2'],['A3','B3','C3','D3','E3','F3','G3'],
                 ['A4','B4','C4','D4','E4','F4','G4'],['A5','B5','C5','D5','E5','F5','G5'],
                 ['A6','B6','C6','D6','E6','F6','G6'],['A7','B7','C7','D7','E7','F7','G7'],
                 ['A8','B8','C8','D8','E8','F8','G8']];


for (celula of posicao_da_linhas) {

    let worksheet = workbook.Sheets[nome_da_primeira_planilha];
    let coleta_de_celula = [];
    coleta_de_celula = worksheet;
    nova_posicao_da_linhas.concat = coleta_de_celula;
}

    for (var linha of linhas) {
        for (var novo_item of linha) {
            novo_valor_da_celula = nova_posicao_da_linhas.concat[novo_item.toString()]
            valor_da_celula += "," + novo_valor_da_celula.v;
            novo_valor_da_celula = valor_da_celula;
        }
        
    }

async function abrir_navegador() {
    navegador = await new navegador.Builder().forBrowser('firefox').build();
}

async function pegar_url() {
    await navegador.get('http://rpachallenge.com/');
}

async function iniciar_script() {
    await navegador.sleep(3000).then(() => {
        var botao_start = navegador.findElement(By.css('button'));
        botao_start.click();
        }
    )
}

async function executar_script() {
    let contagem=0;
    while (contagem < 10){

        await navegador.sleep(1000).then(() =>{
            let campos_formulario = [
                "labelFirstName", "labelLastName", "labelCompanyName", 
                "labelRole", "labelAddress", "labelEmail", "labelPhone"];
                
            let elemento, dado_tratado, dado_enviado = [] ;
            let valor_tratado = [novo_valor_da_celula.split(',')];
            valor_tratado[0].shift(0)
            
            dado_tratado = (valor_tratado);
            dado_enviado = dado_tratado[0].splice(0);
            
                for (var id of campos_formulario) {
                    elemento = navegador.findElement(By.css(`input[ng-reflect-name="${id}"]`));
                    elemento.sendKeys(dado_enviado.shift());
                }
            }
        )   
        
        await navegador.sleep(1000).then(() => {
            var botao_enviar = navegador.findElement(By.css('input[value="Submit"]'));
            botao_enviar.click();
            }
        )

        contagem++
    }
    
}

async function fechar_navegador() {
    await navegador.sleep(5000).then(() => {
        navegador.close()
        }
    )
}

async function error() {
    return console.log('Oops!')
}

abrir_navegador()
    .then(pegar_url)
    .then(iniciar_script)
    .then(executar_script)
    .catch(error)
    .finally(fechar_navegador)