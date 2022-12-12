export type User = {
  id: string
  name: string
  email: string
  role: string
  office: string
}

export type SignInInputProps = {
  email: string
  password: string
}