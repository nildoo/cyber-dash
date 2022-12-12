const hasNumber = (number: string) => /[0-9]/.test(number)
const hasMixed = (number: string) =>
  /[a-z]/.test(number) && /[A-Z]/.test(number)
const hasSpecial = (number: string) => /[!#@$%^&*)(+=._-]/.test(number)

export const strengthColor = (count: number) => {
  if (count < 2) return { label: 'Poor', color: 'error.main' }
  if (count < 3) return { label: 'Weak', color: 'warning.main' }
  if (count < 4) return { label: 'Normal', color: 'warning.dark' }
  if (count < 5) return { label: 'Good', color: 'success.main' }
  if (count < 6) return { label: 'Strong', color: 'success.dark' }
  return { label: 'Poor', color: 'error.main' }
}

export const strengthIndicator = (number: string) => {
  let strengths = 0
  if (number.length > 5) strengths += 1
  if (number.length > 7) strengths += 1
  if (hasNumber(number)) strengths += 1
  if (hasSpecial(number)) strengths += 1
  if (hasMixed(number)) strengths += 1
  return strengths
}
