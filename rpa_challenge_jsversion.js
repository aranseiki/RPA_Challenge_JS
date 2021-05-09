const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');

var navegador = webdriver;

async function abrir_navegador() {
    navegador = await new navegador.Builder().forBrowser('firefox').build();
}

async function pegar_url() {
    await navegador.get('http://rpachallenge.com/');
}

async function executar_script() {
    let campos_formulario = [
        "labelFirstName", "labelLastName", "labelEmail", 
        "labelPhone", "labelAddress", "labelCompanyName", "labelRole"];
    
    let dados_formulario = [
        "Nome qualquer", "Sobrenome qualquer", "qualquer@qualquerdominio.com.br", 
        "11987898987", "Rua qualquer", "Qualquer empresa", "cargo qualquer"];
    
    let dado_enviado, elemento;
    
    for (var id of campos_formulario) {
        elemento = await navegador.findElement(By.css(`input[ng-reflect-name="${id}"]`));
        dado_enviado = dados_formulario.shift();
        elemento.sendKeys(dado_enviado);
    }
    
    await navegador.sleep(10000).then(() => {
        var botao_enviar = navegador.findElement(By.css('input[value="Submit"]'));
        botao_enviar.click();
        }
    )

}

async function fechar_navegador() {
    await navegador.close()
}

async function error() {
    return console.log('Oops!')
}

abrir_navegador()
    .then(pegar_url)
    .then(executar_script)
    .catch(error)
    .finally(fechar_navegador)