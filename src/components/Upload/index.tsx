/* eslint-disable */
import React, { useMemo } from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { UploadMessageProps, UploadScreenProps } from '../../@types/cyber'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const focusedStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

export const Upload: React.FC<UploadScreenProps> = ({ onUpload, fileType }) => {

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive
  } = useDropzone({
    ...fileType === 'image' && {
      accept: { 'image/*': [] }
    },
    ...fileType === 'video' && {
      accept: { 'video/mp4': [] }
    },
    onDrop: onUpload,
    maxFiles: 4
  })

  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return <UploadMessage text="Arraste os arquivos aqui (máximo 4 arquivos)" />
    }

    if (isDragReject) {
      return <UploadMessage type='error' text='Arquivo não suportado ou muitos arquivos (máx 4)' />
    }

    return <UploadMessage type="success" text="Solte os arquivos aqui" />
  }

  const style: DropzoneRootProps = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ])

  return <DropContainer
    className='dropzone'
    {...getRootProps({ style })}
  >
    <input {...getInputProps()} />
    {renderDragMessage(isDragActive, isDragReject)}
  </DropContainer>
}

const DropContainer = styled.div`
border: 1px dashed #ddd;
border-radius: 4px;
cursor: pointer;
margin-top: 16px;
transition: height 0.2s ease;
`

const messageColors = {
  default: '#999',
  error: '#ff1744',
  success: '#00e676'
}

const UploadMessage = ({ type, text }: UploadMessageProps) => {
  return <p style={{
    color: messageColors[type || 'default']
  }}>{text}</p>
}
