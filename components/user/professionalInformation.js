const professionalInformationSchema = [{
  type: {
    type: String, required: true, enum: ['Degree',
      'FurtherTraining',
      'Scholarship',
      'TeachingBackground',
      'ManagementBackground',
      'ResearchBackground',
      'HRBackground',
      'S&TBackground',
      'AcademicProduction',
      'Award',
      'Other']
  },
  subType: {
    type: String, required: false, enum: ['Secondary',
      'NonUniversitary',
      'NonUniversitary-PostTitle',
      'Grade',
      'Postgraduate-Specialization',
      'Postgraduate-Master',
      'Postgrado-Doctorado',
      'Postgraduate-Doctorate',
      'ProfessionalCertification',
      'ImprovementCourse']
  },
  title: { type: String, required: true },
  institution: { type: String, required: false },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
  currentSituation: { type: String, required: false, enum: ['Ended', 'Current', 'Quit'] },
  duration: { type: String, required: false },
  position: { type: String, required: false },
  subject: { type: String, required: false },
  semanalHours: { type: String, required: false }
}];

module.exports = professionalInformationSchema;