// birthDate au format ISO "YYYY-MM-DD" (celui d'un <input type="date">).
export function calculateAge(birthDate: string): number | null {
  const date = new Date(birthDate);
  if (Number.isNaN(date.getTime())) return null;

  const now = new Date();
  let age = now.getFullYear() - date.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;

  return age;
}
