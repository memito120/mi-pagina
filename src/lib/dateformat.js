// dateformat.js - Funciones para formatear fechas y calcular duraciones

// Función para formatear una fecha en formato "YYYY-MM" a "Mon YYYY"
export function formatDate(dateString) {
  if (!dateString) return 'Actualidad';
  const [year, month] = dateString.split('-');
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const monthIndex = parseInt(month, 10) - 1;

  if (Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11 || !year) {
    return dateString;
  }

  return `${monthNames[monthIndex]} ${year}`;
}

// Función para analizar una fecha en formato "YYYY-MM" y devolver un objeto Date
function parseYearMonth(dateString) {
  if (!dateString) return null;

  const [year, month] = dateString.split('-');
  const y = parseInt(year, 10);
  const m = parseInt(month, 10);

  if (Number.isNaN(y) || Number.isNaN(m) || m < 1 || m > 12) {
    return null;
  }

  return new Date(y, m - 1, 1);
}

// Función para formatear una fecha en formato "YYYY-MM" a "YYYY-MM-DD" para atributos datetime
export function formatDateToDateTimeAttr(dateString) {
  const parsed = parseYearMonth(dateString);
  if (!parsed) return undefined;

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}-01`;
}

// Función para calcular la duración entre dos fechas en formato "YYYY-MM" y "YYYY" y devolver una etiqueta legible
export function getDurationLabel(startDateString, endDateString) {
  const startDate = parseYearMonth(startDateString);
  const endDate = parseYearMonth(endDateString) || new Date();

  if (!startDate || endDate < startDate) {
    return '2 años'; // Valor predeterminado para casos inválidos
  }

  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthDiff = endDate.getMonth() - startDate.getMonth();
  const totalMonths = yearDiff * 12 + monthDiff + 1;

  if (totalMonths < 12) {
    return `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
  }

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  const yearsLabel = `${years} ${years === 1 ? 'año' : 'años'}`;

  if (remainingMonths === 0) {
    return yearsLabel;
  }

  const monthsLabel = `${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
  return `${yearsLabel} ${monthsLabel}`;
}


