import { saveAs } from 'file-saver';  
import * as PizZip from 'pizzip';

export const descargarWord = (respuesta: string | undefined, nombre_archivo: string) => {
  if (!respuesta) {
    console.log("No hay respuesta para generar el archivo.");
    return;
  }

  const procesarTexto = (content: string): string => {
    const escaparCaracteresXML = (texto: string): string => {
      return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    };

    const lineas = content.split("\n");
    let xml = '';

    lineas.forEach(linea => {
      if (linea.trim() === "") {
        xml += '<w:p><w:r><w:t xml:space="preserve"> </w:t></w:r></w:p>\n';
      } else {
        xml += `<w:p><w:r><w:t>${escaparCaracteresXML(linea)}</w:t></w:r></w:p>\n`;
      }
    });

    return xml;
  };

  const respuestaProcesada = procesarTexto(respuesta);

  const documentContent = `
    <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:body>
        <w:p>
          <w:r>
            <w:t>Generación Automática de Documento</w:t>
          </w:r>
        </w:p>
        ${respuestaProcesada} 
      </w:body>
    </w:document>
  `;

  const zip = new PizZip();

  zip.file("word/document.xml", documentContent);

  const contentTypes = `
    <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
      <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
      <Default Extension="xml" ContentType="application/xml"/>
      <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
    </Types>
  `;
  zip.file("[Content_Types].xml", contentTypes);

  const relationships = `
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
      <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
    </Relationships>
  `;
  zip.file("_rels/.rels", relationships);

  const styles = `
    <w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:style w:type="paragraph" w:styleId="Normal">
        <w:name w:val="Normal"/>
        <w:rPr>
          <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
          <w:sz w:val="22"/>
        </w:rPr>
      </w:style>
    </w:styles>
  `;
  zip.file("word/styles.xml", styles);

  const documentRels = `
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
      <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
    </Relationships>
  `;
  zip.file("word/_rels/document.xml.rels", documentRels);

  try {
    // Generar el archivo como un Blob con el tipo MIME correcto
    const blob = zip.generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Descargar con el nombre especificado y extensión .docx
    saveAs(blob, `${nombre_archivo}.docx`);
  } catch (error) {
    console.error("Error al generar el archivo DOCX:", error);
  }
};