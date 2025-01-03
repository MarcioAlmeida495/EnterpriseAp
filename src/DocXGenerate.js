import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const DefaultModeloUrl = './termoNegociacao.docx';

export async function gerarDocumentoENovaAba(dados, modeloUrl = DefaultModeloUrl) {
    try {
        // Carrega o modelo DOCX via fetch
        const response = await fetch(modeloUrl);
        const arrayBuffer = await response.arrayBuffer();

        // Inicializa o PizZip e Docxtemplater com o modelo
        const zip = new PizZip(arrayBuffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        console.log("Dados antes da renderização:", dados); // Verifica os dados passados

        // Renderiza o documento com os dados
        doc.render(dados);

        console.log("Conteúdo após renderização:", doc.getFullText()); // Verifica o conteúdo após renderização

        // Gera o documento como Blob com o tipo MIME de DOCX
        const blob = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        console.log("Blob gerado:", blob); // Verifica o conteúdo do Blob

        // Cria uma URL temporária para o Blob
        const url = URL.createObjectURL(blob);

        // Tenta abrir a URL na nova aba
        const newTab = window.open(url, '_blank');
        if (newTab) {
            newTab.focus();
        } else {
            console.error("Falha ao abrir a nova aba.");
        }
    } catch (error) {
        console.error('Erro ao gerar o documento:', error);
    }
}
