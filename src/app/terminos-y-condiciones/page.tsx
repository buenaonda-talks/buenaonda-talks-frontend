import LandingHeader from '@/screens/landing/header';
import LandingFooter from '@/screens/landing/landing-footer';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Términos de Servicio | BuenaOnda Talks',
    description: 'Términos de Servicio de Buena Onda Talks',
    openGraph: {
        type: 'website',
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_HOST || 'http://localhost:3000'),
    robots: {
        index: process.env.NEXT_PUBLIC_APP_ENV === 'production',
        follow: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    },
};

const Page: React.FC = () => {
    return (
        <main>
            <LandingHeader />

            <section className="container space-y-6 pb-20 pt-36">
                <h1 className="text-3xl font-bold">
                    Términos de Servicio de BuenaOnda Talks
                </h1>

                <div>
                    <p className="mt-4">Última actualización: 26 de Marzo de 2024</p>
                </div>

                <div>
                    <p className="mt-4">
                        Estos términos de servicio (&quot;Términos&quot;) se aplican a su
                        acceso y uso de BuenaOnda Talks (el &quot;Servicio&quot;). Por
                        favor, léalas cuidadosamente.
                    </p>
                </div>

                <div>
                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Aceptación de estos Términos
                    </h2>

                    <p className="mt-4">
                        Si accede o utiliza el Servicio, significa que acepta estar sujeto
                        a todos los términos a continuación. Por lo tanto, antes de usar
                        el Servicio, lea todos los términos. Si no está de acuerdo con
                        todos los términos a continuación, no utilice el Servicio. Además,
                        si un término no tiene sentido para usted, háganoslo saber a
                        través del correo electrónico{' '}
                        <a
                            className="text-blue-600 underline"
                            href="mailto:tools@buenaondatalks.com"
                        >
                            tools@buenaondatalks.com
                        </a>
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Cambios a estos Términos
                    </h2>

                    <p className="mt-4">
                        Nos reservamos el derecho de modificar estos Términos en cualquier
                        momento. Por ejemplo, es posible que debamos cambiar estos
                        Términos si presentamos una nueva función o por alguna otra razón.
                    </p>

                    <p className="mt-4">
                        Siempre que hagamos cambios a estos Términos, los cambios entrarán
                        en vigencia inmediatamente después de que publiquemos dichos
                        Términos revisados (indicado al revisar la fecha en la parte
                        superior de estos Términos) o luego de su aceptación si
                        proporcionamos un mecanismo para su aceptación inmediata de los
                        Términos revisados (como un clic de confirmación o un botón de
                        aceptación). Es su responsabilidad revisar buenaondatalks.com para
                        cambios a estos Términos.
                    </p>

                    <p className="mt-4">
                        Si continúa utilizando el Servicio después de que los Términos
                        revisados entren en vigencia, significa que ha aceptado los
                        cambios a estos Términos.
                    </p>
                </div>

                <div>
                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Política de privacidad
                    </h2>

                    <p className="mt-4">
                        Para obtener información sobre cómo recopilamos y usamos
                        información sobre los usuarios del Servicio, consulte nuestra
                        política de privacidad disponible en{' '}
                        <Link
                            href="/politica-de-privacidad"
                            className="text-blue-600 underline"
                        >
                            Política de Privacidad
                        </Link>
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Servicios de terceros
                    </h2>

                    <p className="mt-4">
                        De vez en cuando, podemos proporcionarle enlaces a sitios web o
                        servicios de terceros que no poseemos ni controlamos. Su uso del
                        Servicio también puede incluir el uso de aplicaciones
                        desarrolladas o propiedad de un tercero. Su uso de dichas
                        aplicaciones, sitios web y servicios de terceros se rige por los
                        propios términos de servicio o políticas de privacidad de esa
                        parte. Le recomendamos que lea los términos y condiciones y la
                        política de privacidad de cualquier aplicación, sitio web o
                        servicio de terceros que visite o utilice.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Creación de cuentas
                    </h2>

                    <p className="mt-4">
                        Cuando crea una cuenta o utiliza otro servicio para iniciar sesión
                        en el Servicio, acepta mantener la seguridad de su contraseña y
                        acepta todos los riesgos de acceso no autorizado a cualquier dato
                        u otra información que proporcione al Servicio.
                    </p>

                    <p className="mt-4">
                        Si descubre o sospecha alguna violación de la seguridad del
                        Servicio, infórmenos lo antes posible.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Su contenido y conducta
                    </h2>

                    <p className="mt-4">
                        Nuestro Servicio puede permitirle a usted y a otros usuarios
                        publicar, vincular y, de otro modo, poner a disposición contenido.
                        Usted es responsable del contenido que pone a disposición del
                        Servicio, incluida su legalidad, confiabilidad y adecuación.
                    </p>

                    <p className="mt-4">
                        Cuando publica, vincula o pone a disposición contenido del
                        Servicio, nos otorga el derecho y la licencia para usar,
                        reproducir, modificar, realizar públicamente, mostrar públicamente
                        y distribuir su contenido en o a través del Servicio. Podemos
                        formatear su contenido para mostrarlo en todo el Servicio, pero no
                        editaremos ni revisaremos la esencia de su contenido en sí.
                    </p>

                    <p className="mt-4">
                        Además de nuestro derecho limitado a su contenido, conserva todos
                        sus derechos sobre el contenido que publica, vincula y pone a
                        disposición de otro modo en el Servicio o a través de este.
                    </p>

                    <p className="mt-4">
                        Es posible que pueda eliminar el contenido que publicó
                        eliminándolo. Una vez que elimine su contenido, no aparecerá en el
                        Servicio, pero las copias de su contenido eliminado pueden
                        permanecer en nuestro sistema o copias de seguridad durante un
                        período de tiempo. Retendremos los registros de acceso al servidor
                        web por un máximo de inmediato y luego los eliminaremos.
                    </p>

                    <p className="mt-4">
                        No puede publicar, vincular ni poner a disposición en o a través
                        del Servicio ninguno de los siguientes:
                    </p>

                    <ul className="list-inside list-disc">
                        <li className="mt-1">
                            Contenido calumnioso, difamatorio, intolerante, fraudulento o
                            engañoso;
                        </li>
                        <li className="mt-1">
                            Contenido ilegal o que de otro modo crearía responsabilidad
                            legal a BuenaOnda Talks;
                        </li>
                        <li className="mt-1">
                            Contenido que pueda infringir o violar cualquier patente,
                            marca comercial, secreto comercial, derechos de autor, derecho
                            de privacidad, derecho de publicidad u otro derecho
                            intelectual o de otro tipo de cualquier parte;
                        </li>
                        <li className="mt-1">
                            Promociones masivas o reiteradas, campañas políticas o
                            mensajes comerciales dirigidos a usuarios que no te siguen
                            (SPAM);
                        </li>
                        <li className="mt-1">
                            Información privada de cualquier tercero (por ejemplo,
                            direcciones, números de teléfono, direcciones de correo
                            electrónico, números de seguro social y números de tarjetas de
                            crédito); y
                        </li>
                        <li className="mt-1">
                            Virus, datos corruptos u otros archivos o códigos dañinos,
                            perjudiciales o destructivos.
                        </li>
                    </ul>

                    <p className="mt-4">
                        Además, acepta que no hará nada de lo siguiente en relación con el
                        Servicio u otros usuarios:
                    </p>

                    <ul className="list-inside list-disc">
                        <li className="mt-1">
                            Usar el Servicio de cualquier manera que pueda interferir,
                            interrumpir, afectar negativamente o impedir que otros
                            usuarios disfruten plenamente del Servicio o que pueda dañar,
                            deshabilitar, sobrecargar o perjudicar el funcionamiento del
                            Servicio;
                        </li>
                        <li className="mt-1">
                            Suplantar o publicar en nombre de cualquier persona o entidad
                            o tergiversar su afiliación con una persona o entidad;
                        </li>
                        <li className="mt-1">
                            Collect any personal information about other users, or
                            intimidate, threaten, stalk or otherwise harass other users of
                            the Service;
                        </li>
                        <li className="mt-1">
                            Recopilar cualquier información personal sobre otros usuarios,
                            o intimidar, amenazar, acechar o acosar a otros usuarios del
                            Servicio.; y
                        </li>
                        <li className="mt-1">
                            Eludir o intentar eludir cualquier filtrado, medida de
                            seguridad, límites de velocidad u otras características
                            diseñadas para proteger el Servicio, los usuarios del Servicio
                            o terceros.
                        </li>
                    </ul>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Materiales de BuenaOnda Talks
                    </h2>

                    <p className="mt-4">
                        Nos esforzamos mucho en crear el Servicio, incluido el logotipo y
                        todos los diseños, texto, gráficos, imágenes, información y otro
                        contenido (excluyendo su contenido). Esta propiedad es propiedad
                        nuestra o de nuestros licenciantes y está protegida por las leyes
                        de derechos de autor internacionales y de EE. UU. Le otorgamos el
                        derecho a usarlo.
                    </p>

                    <p className="mt-4">
                        Sin embargo, a menos que indiquemos expresamente lo contrario, sus
                        derechos no incluyen: (i) ejecutar o mostrar públicamente el
                        Servicio; (ii) modificar o hacer usos derivados del Servicio o
                        cualquier parte del mismo; (iii) usar cualquier método de
                        extracción o extracción de datos, robots o métodos similares de
                        recopilación o extracción de datos; (iv) la descarga (que no sea
                        el almacenamiento en caché de la página) de cualquier parte del
                        Servicio o cualquier información contenida en el mismo; (v)
                        ingeniería inversa o acceso al Servicio para construir un producto
                        o servicio competitivo; o (vi) usar el Servicio para fines
                        distintos a los previstos. Si hace algo de esto, podemos cancelar
                        su uso del Servicio.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Hipervínculos y contenido de terceros
                    </h2>

                    <p className="mt-4">
                        Puede crear un hipervínculo al Servicio. Sin embargo, no puede
                        usar, enmarcar o utilizar técnicas de enmarcado para incluir
                        cualquiera de nuestras marcas comerciales, logotipos u otra
                        información de propiedad sin nuestro consentimiento expreso por
                        escrito.
                    </p>

                    <p className="mt-4">
                        BuenaOnda Talks no hace ningún reclamo ni representación con
                        respecto a los sitios web de terceros a los que se puede acceder
                        mediante un hipervínculo desde el Servicio o los sitios web que se
                        vinculan al Servicio, y no acepta responsabilidad por estos.
                        Cuando abandona el Servicio, debe tener en cuenta que estos
                        Términos y nuestras políticas ya no rigen.
                    </p>

                    <p className="mt-4">
                        Si hay algún contenido en el Servicio de usted y otros, no lo
                        revisamos, verificamos ni autenticamos, y puede incluir
                        inexactitudes o información falsa. No hacemos representaciones,
                        garantías o garantías relacionadas con la calidad, idoneidad,
                        veracidad, exactitud o integridad de cualquier contenido incluido
                        en el Servicio. Usted reconoce la responsabilidad exclusiva y
                        asume todos los riesgos que surjan de su uso o confianza en
                        cualquier contenido.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Cosas legales inevitables
                    </h2>

                    <p className="mt-4">
                        EL SERVICIO Y CUALQUIER OTRO SERVICIO Y CONTENIDO INCLUIDOS O
                        PUESTOS A SU DISPOSICIÓN A TRAVÉS DEL SERVICIO SE PROPORCIONAN TAL
                        CUAL O SEGÚN DISPONIBILIDAD SIN NINGUNA REPRESENTACIÓN O GARANTÍA
                        DE NINGÚN TIPO. RENUNCIAMOS A TODAS LAS GARANTÍAS Y
                        REPRESENTACIONES (EXPRESAS O IMPLÍCITAS, ORALES O ESCRITAS) CON
                        RESPECTO AL SERVICIO Y EL CONTENIDO INCLUIDO O PUESTO A SU
                        DISPOSICIÓN DE OTRO MODO A TRAVÉS DEL SERVICIO, YA SEA QUE SURJA
                        POR IMPRESIÓN DE LA LEY, POR RAZÓN DE COSTUMBRE O USO EN EL
                        COMERCIO, POR CURSO DE NEGOCIACIÓN O DE OTRO MODO.
                    </p>

                    <p className="mt-4">
                        EN NINGÚN CASO BuenaOnda Talks SERÁ RESPONSABLE ANTE USTED O
                        CUALQUIER TERCERO POR CUALQUIER DAÑO ESPECIAL, INDIRECTO,
                        INCIDENTAL, EJEMPLAR O CONSECUENTE DE CUALQUIER TIPO QUE SURJA O
                        ESTÉ RELACIONADO CON EL SERVICIO O CUALQUIER OTRO SERVICIO Y/O
                        CONTENIDO INCLUIDO O DE OTRO MODO DISPONIBLE PARA USTED A TRAVÉS
                        DEL SERVICIO, INDEPENDIENTEMENTE DE LA FORMA DE ACCIÓN, YA SEA POR
                        CONTRATO, AGRAVIO, RESPONSABILIDAD ESTRICTA O DE CUALQUIER OTRA
                        FORMA, AUNQUE NOS HAYA ADVERTIDO DE LA POSIBILIDAD DE DICHOS DAÑOS
                        O SOMOS CONSCIENTE DE LA POSIBILIDAD DE DICHOS DAÑOS. NUESTRA
                        RESPONSABILIDAD TOTAL POR TODAS LAS CAUSAS DE ACCIÓN Y BAJO TODAS
                        LAS TEORÍAS DE RESPONSABILIDAD SE LIMITARÁ AL MONTO QUE USTED PAGÓ
                        A BuenaOnda Talks. ESTA SECCIÓN TENDRÁ TOTAL EFECTO INCLUSO SI
                        CUALQUIER RECURSO ESPECIFICADO EN ESTE ACUERDO SE CONSIDERA QUE HA
                        FALLADO EN SU PROPÓSITO ESENCIAL.
                    </p>

                    <p className="mt-4">
                        Usted acepta defendernos, indemnizarnos y eximirnos de toda
                        responsabilidad frente a todos y cada uno de los costos, daños,
                        responsabilidades y gastos (incluidos los honorarios de abogados,
                        los costos, las sanciones, los intereses y los desembolsos) en los
                        que incurramos en relación con, que surjan de o para la propósito
                        de evitar cualquier reclamo o demanda de un tercero relacionado
                        con su uso del Servicio o el uso del Servicio por parte de
                        cualquier persona que use su cuenta, incluido cualquier reclamo de
                        que su uso del Servicio viola cualquier ley o regulación
                        aplicable, o el derechos de cualquier tercero, y/o su violación de
                        estos Términos.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Derechos de Autor
                    </h2>

                    <p className="mt-4">
                        Nos tomamos en serio los derechos de propiedad intelectual. De
                        acuerdo con la Ley de derechos de autor del milenio digital
                        (&quot;DMCA&quot;) y otras leyes aplicables, hemos adoptado una
                        política de cancelar, en las circunstancias apropiadas y, a
                        nuestro exclusivo criterio, el acceso al servicio para los
                        usuarios que se consideran infractores reincidentes.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Jurisdicción
                    </h2>

                    <p className="mt-4">
                        Usted acepta expresamente que la jurisdicción exclusiva para
                        cualquier disputa con el Servicio o relacionada con su uso del
                        mismo, reside en los tribunales de la Jurisdicción chilena y
                        además acepta y consiente expresamente el ejercicio de la
                        jurisdicción personal en los tribunales de Chile, en relación con
                        cualquier disputa de este tipo, incluido cualquier reclamo que
                        involucre el Servicio. Además, acepta que usted y el Servicio no
                        iniciarán contra el otro una demanda colectiva, un arbitraje
                        colectivo u otra acción o procedimiento representativo.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Terminación
                    </h2>

                    <p className="mt-4">
                        Si incumple cualquiera de estos Términos, tenemos el derecho de
                        suspender o deshabilitar su acceso o uso del Servicio.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Acuerdo completo
                    </h2>

                    <p className="mt-4">
                        Estos Términos constituyen el acuerdo completo entre usted y
                        BuenaOnda Talks con respecto al uso del Servicio, reemplazando
                        cualquier acuerdo anterior entre usted y BuenaOnda Talks
                        relacionado con su uso del Servicio.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Feedback
                    </h2>

                    <p className="mt-4">
                        Por favor háganos saber lo que piensa del Servicio, estos Términos
                        y, en general, de buenaondatalks.com y BuenaOnda Talks. Cuando nos
                        proporciona cualquier opinión, comentario o sugerencia sobre el
                        Servicio, estos Términos y, en general, buenaondatalks.com, nos
                        asigna de manera irrevocable todos sus derechos, títulos e
                        intereses sobre sus opiniones, comentarios y sugerencias.
                    </p>

                    <h2 className="mt-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Preguntas e información de contacto
                    </h2>

                    <p className="mt-4">
                        Las preguntas o comentarios sobre el Servicio pueden ser dirigidos
                        a nosotros a la dirección de correo electrónico{' '}
                        <a
                            className="text-blue-600 underline"
                            href="mailto:tools@buenaondatalks.com"
                        >
                            tools@buenaondatalks.com
                        </a>
                    </p>
                </div>
            </section>

            <LandingFooter />
        </main>
    );
};

export default Page;
