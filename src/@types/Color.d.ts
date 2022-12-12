interface DataType {
  label: string
  color: string
}

export interface ColorBoxProps {
  bgcolor?: string,
  title?: string,
  data: DataType,
  dark?: bool,
  main?: bool
}