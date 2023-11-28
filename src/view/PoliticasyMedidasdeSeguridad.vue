<template>
  <div class="poli">
    <h2>Políticas y Medidas de Seguridad para Médicos</h2>
    <div class="cuerpo">
      <ul>
        <li>
          <strong>1. Reservas de Consultorios</strong>
          <ul>
            <li>
              Realizar reservas con antelación para garantizar disponibilidad.
              Notificar cualquier cambio en la programación de consultas.
            </li>
            <li>
              Confirmar manualmente todas las citas programadas. Responder a los
              recordatorios automáticos de confirmación. No realizar reservas
              innecesarias.
            </li>
          </ul>
        </li>
        <li>
          <strong>2. Cancelaciones y Reprogramaciones</strong>
          <ul>
            <li>
              Cancelar con al menos 24 horas de antelación cuando sea necesario.
              Reprogramar con al menos 48 horas de antelación, sujeto a
              disponibilidad.
            </li>
          </ul>
        </li>
        <li>
          <strong>3. Confirmacion Automatica</strong>
          <ul>
            <li>
              Responder a los recordatorios automáticos para confirmar las
              citas.
            </li>
          </ul>
        </li>
        <li>
          <strong>4. Acceso Seguro al Sistema</strong>
          <ul>
            <li>
              Proteger la información de acceso al sistema. Cerrar sesión en
              dispositivos compartidos.
            </li>
          </ul>
        </li>
        <li >
          <strong>5. Comportamiento Ético</strong>
          <ul>
            <li>
              Mantener un comportamiento respetuoso y cortés en todas las
              interacciones.
            </li>
          </ul>
        </li>
        <li style="break-inside: avoid;">
          <strong>6. Uso Responsable del Sistema</strong>
          <ul>
            <li>Utilizar el sistema de manera ética y responsable.</li>
          </ul>
        </li>
        <li>
          <strong>7. Actualización de Información</strong>
          <ul>
            <li>
              Mantener la información médica actualizada en el sistema.
              Actualizar regularmente los datos de contacto.
            </li>
          </ul>
        </li>
        <li>
          <strong>8. Soporte Técnico</strong>
          <ul>
            <li>Contactar al soporte técnico en caso de problemas o dudas.</li>
          </ul>
        </li>
        <li>
          <strong>9. Protección de Datos del Paciente</strong>
          <ul>
            <li>
              Cumplir con las regulaciones de privacidad y protección de datos.
              No compartir información confidencial con terceros.
            </li>
          </ul>
        </li>
        <li>
          <strong>10. Acceso Controlado a la Información</strong>
          <ul>
            <li>
              Acceder solo a la información necesaria para realizar consultas.
              Reportar cualquier actividad sospechosa o acceso no autorizado.
            </li>
          </ul>
        </li>
        <li>
          <strong>11. Cuidados de Salud e Higiene en las Salas</strong>
          <ul>
            <li>
              Seguir estrictamente las prácticas de higiene y desinfección en
              las salas. Utilizar equipo de protección personal (EPP) adecuado.
              Desinfectar superficies y equipos después de cada consulta.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PoliticasyMedidasdeSeguridad",
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
  data() {},
  created() {},
  methods: {},
};
</script>

<style scoped>
.poli {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 50px;
}
.poli li{
  text-align: left;
}

.poli ul{
   margin-bottom: 2vw;
}

h2 {
  text-decoration: underline;
}
.cuerpo {
  width: 95vw;
  column-count: 2;
  column-gap: 2vw;
  overflow: hidden;
  margin-top: 2vw;
  padding-left: 2vw;
}

@media only screen and (max-width:480px ){
   .cuerpo {
      font-size: 2vw;
      width: 80vw;
      padding-left: 4vw;
      column-gap: 3.5vw;
   }
   .poli {
  padding: 2vw;
  width: 95vw;
}
h2{
   font-size: 4vw;
}
}
</style>
