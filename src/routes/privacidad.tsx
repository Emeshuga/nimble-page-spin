import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/legal-layout";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Aviso de Privacidad — VetBridge USA" },
      {
        name: "description",
        content:
          "Aviso de Privacidad de VetBridge USA: qué datos recopilamos, cómo los usamos y tus derechos.",
      },
    ],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <LegalLayout title="Aviso de Privacidad">
      <p>
        En {SITE.name} respetamos tu privacidad. Este Aviso explica qué información personal
        recopilamos, cómo la utilizamos y qué derechos tienes sobre ella. Al enviar el formulario de
        evaluación de perfil, aceptas las prácticas descritas aquí.
      </p>

      <LegalSection heading="1. Responsable de tus datos">
        <p>
          {SITE.name} es responsable del tratamiento de los datos personales que nos proporcionas.
          Para cualquier duda sobre este Aviso o sobre tus datos, escríbenos a{" "}
          <a href={`mailto:${SITE.email}`} className="text-primary underline">
            {SITE.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="2. Qué datos recopilamos">
        <p>Cuando completas nuestro formulario, recopilamos:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Nombre completo</li>
          <li>Correo electrónico y número de teléfono (WhatsApp)</li>
          <li>Universidad de egreso y año de graduación</li>
          <li>Nivel de inglés, estatus de licencia en México y estatus del examen NAVLE</li>
          <li>
            Datos técnicos anónimos de la campaña por la que llegaste (por ejemplo, la fuente del
            anuncio) para medir la efectividad de nuestra publicidad
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Para qué usamos tus datos">
        <ul className="list-disc space-y-1 pl-5">
          <li>Evaluar tu perfil y contactarte por WhatsApp o correo electrónico</li>
          <li>
            Explicarte tu ruta hacia el ejercicio profesional en Estados Unidos y coordinar los
            siguientes pasos
          </li>
          <li>
            Conectarte, con tu consentimiento, con clínicas patrocinadoras y con abogados
            migratorios aliados
          </li>
          <li>Mejorar nuestro sitio y nuestras campañas</li>
        </ul>
        <p>
          No vendemos tus datos personales. Solo los compartimos con clínicas patrocinadoras y
          abogados aliados cuando avanzas en el proceso y das tu consentimiento para ello.
        </p>
      </LegalSection>

      <LegalSection heading="4. Proveedores que nos apoyan">
        <p>
          Utilizamos servicios de terceros de confianza para operar el sitio y almacenar la
          información de forma segura, incluyendo servicios de base de datos y alojamiento web, y
          herramientas de medición publicitaria como Meta (Facebook). Estos proveedores solo tratan
          los datos conforme a nuestras instrucciones.
        </p>
      </LegalSection>

      <LegalSection heading="5. Tus derechos">
        <p>
          Tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos
          personales (derechos ARCO), así como a retirar tu consentimiento en cualquier momento.
          Para ejercerlos, escríbenos a{" "}
          <a href={`mailto:${SITE.email}`} className="text-primary underline">
            {SITE.email}
          </a>{" "}
          y atenderemos tu solicitud.
        </p>
      </LegalSection>

      <LegalSection heading="6. Conservación y seguridad">
        <p>
          Conservamos tus datos únicamente durante el tiempo necesario para los fines descritos y
          aplicamos medidas razonables de seguridad para protegerlos. Puedes solicitar la
          eliminación de tu información en cualquier momento.
        </p>
      </LegalSection>

      <LegalSection heading="7. Cambios a este Aviso">
        <p>
          Podemos actualizar este Aviso ocasionalmente. Publicaremos la versión vigente en esta
          página con su fecha de actualización.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
