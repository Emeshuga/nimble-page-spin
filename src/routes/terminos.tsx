import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/legal-layout";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones — VetBridge USA" },
      {
        name: "description",
        content:
          "Términos y Condiciones del servicio de coordinación y reclutamiento de VetBridge USA.",
      },
    ],
  }),
  component: Terminos,
});

function Terminos() {
  return (
    <LegalLayout title="Términos y Condiciones">
      <p>
        Estos Términos y Condiciones regulan el uso del sitio de {SITE.name} y de nuestros
        servicios. Al utilizar el sitio o enviar tu información, aceptas estos términos.
      </p>

      <LegalSection heading="1. Qué es VetBridge USA">
        <p>
          {SITE.name} es un servicio de coordinación y reclutamiento que conecta a médicos
          veterinarios formados en México con clínicas en Estados Unidos, y acompaña el proceso de
          preparación del examen NAVLE, obtención de licencia estatal y trámite de visa TN.
        </p>
      </LegalSection>

      <LegalSection heading="2. No somos un despacho jurídico">
        <p>
          {SITE.name} no es un despacho de abogados y no proporciona asesoría legal migratoria. Los
          trámites de visa y la asesoría legal correspondiente son realizados por abogados
          migratorios independientes. La información en este sitio es de carácter general e
          informativo y no constituye asesoría legal, migratoria ni profesional.
        </p>
      </LegalSection>

      <LegalSection heading="3. Sin garantía de resultados">
        <p>
          El éxito del proceso depende de tu perfil, de tu desempeño en los exámenes requeridos y de
          las decisiones de autoridades y terceros ajenos a nosotros (juntas veterinarias estatales,
          el ICVA/NAVLE, consulados y autoridades migratorias). Por ello, {SITE.name} no garantiza
          la aprobación del NAVLE, la obtención de una licencia, la emisión de una visa ni la
          colocación en un empleo.
        </p>
      </LegalSection>

      <LegalSection heading="4. Información que proporcionas">
        <p>
          Te comprometes a proporcionar información veraz y actualizada. La evaluación de tu perfil
          y las estimaciones de tiempos se basan en la información que nos das; si es inexacta,
          nuestras recomendaciones pueden no aplicar a tu caso.
        </p>
      </LegalSection>

      <LegalSection heading="5. Elegibilidad de la ruta acelerada">
        <p>
          La ruta acelerada mencionada aplica a egresados de la FMVZ-UNAM durante el periodo en que
          dicha facultad mantuvo la acreditación de la AVMA (2011–2025). La elegibilidad de cada
          persona se confirma de forma individual conforme a los requisitos oficiales vigentes.
        </p>
      </LegalSection>

      <LegalSection heading="6. Costos">
        <p>
          La evaluación inicial de tu perfil es gratuita y sin compromiso. Cualquier costo asociado
          al proceso (exámenes, trámites, honorarios legales, colocación) se te explicará de forma
          clara antes de que decidas continuar.
        </p>
      </LegalSection>

      <LegalSection heading="7. Propiedad intelectual">
        <p>
          El contenido, la marca y los materiales de este sitio pertenecen a {SITE.name} y no pueden
          reproducirse sin autorización.
        </p>
      </LegalSection>

      <LegalSection heading="8. Limitación de responsabilidad">
        <p>
          En la máxima medida permitida por la ley, {SITE.name} no será responsable por daños
          indirectos o incidentales derivados del uso del sitio o de decisiones tomadas con base en
          la información proporcionada.
        </p>
      </LegalSection>

      <LegalSection heading="9. Contacto">
        <p>
          Para cualquier duda sobre estos Términos, escríbenos a{" "}
          <a href={`mailto:${SITE.email}`} className="text-primary underline">
            {SITE.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
