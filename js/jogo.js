var criaJogo = function(sprite) {

    var palavreSecreta = '';
    var lacunas = [];
    var etapa = 1;

    var processaChute = function(chute) {

        var exp = new RegExp(chute, 'gi')
            resultado,
            acertou =  false;

        while (resultado = exp.exec(palavreSecreta)) {

            lacunas[resultado.index] = chute;
            acertou = true;
        }

        if (!acertou) sprite.nextFrame();
    };

    var criaLacunas = function() {

        for (var i = 0; i < palavreSecreta.length; i++) {
            lacunas.push('');
        }
    };

    var proximaEtapa = function() {
        etapa = 2;
    };

    var setPalavraSecreta =  function(palavra) {

        palavreSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    var getLacunas = function() {

        return lacunas;
    };

    var getEtapa = function() {

        return etapa;
    };

    var ganhou = function () {
        
        return lacunas.length
            ? !lacunas.some(function(lacuna) {
                return lacuna == '';
            })
            : false;
    };

    var perdeu = function () {
        
        return sprite.isFinished();
    };

    var ganhouOuPerdeu = function () {
        
        return ganhou() || perdeu();
    };

    var reinicia = function () {
        
        etapa = 1,
        lacunas = [],
        palavreSecreta = '';
        sprite.reset();
    };

    return {

        setPalavraSecreta: setPalavraSecreta,
        getLacunas: getLacunas,
        getEtapa: getEtapa,
        processaChute: processaChute,
        ganhou: ganhou,
        perdeu: perdeu,
        ganhouOuPerdeu: ganhouOuPerdeu, 
        reinicia: reinicia
    };
};