const professionalInformationSchema = {
  degrees: {
    secondary: {
      title: { type: String, required: true },
      institution: { type: String, required: true },
      startYear: { type: String, required: true },
      endYear: { type: String, required: true },
    },
    otherLevels: [
      {
        type: { type: String, required: true, enum: ['NoUniversitaria', 'NoUniversitaria-Postítulo', 'DeGrado', 'Postgrado-Especializacion', 'Postgrado-Maestria', 'Postgrado-Doctorado', 'Postgrado-PostDoctorado'] },
        title: { type: String, required: true },
        institution: { type: String, required: true },
        startYear: { type: String, required: true },
        currentSituation: { type: String, required: true, enum: ['Ended', 'Current', 'Quit'] },
        endYear: { type: String, required: true },
      }
    ]
  },
  furtherTraining: {
    type: { type: String, required: true, enum: ['CertificacionProfesional', 'CursoDePerfeccionamiento'] },
    title: { type: String, required: true },
    institution: { type: String, required: true },
    startYear: { type: String, required: true },
    duration: { type: String, required: true },
  },
  scholarship: {
    title: { type: String, required: true },
    grantingInstitution: { type: String, required: true },
    startYear: { type: String, required: true },
    currentSituation: { type: String, required: true, enum: ['Ended', 'Current', 'Quit'] },
    endYear: { type: String, required: true },
  },
  teachingBackground: {
    type: { type: String, required: true, enum: ['PostGrado', 'Grado', 'NoUniversitario', 'Media'] },
    position: { type: String, required: true },
    subject: { type: String, required: true },
    semanalHours: { type: String, required: true },
    startYear: { type: String, required: true },
    currentSituation: { type: String, required: true, enum: ['Ended', 'Current'] },
    endYear: { type: String, required: true },
  },
};

module.exports = professionalInformationSchema;