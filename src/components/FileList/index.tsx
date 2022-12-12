import React from 'react'
import styled from 'styled-components'
import { CheckCircle, Error } from '@mui/icons-material'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgress } from '@mui/material'
import { FileListProps, PreviewProps } from '../../@types/cyber'

export const FileList: React.FC<FileListProps> = ({ files }) => {
  const items = files

  return (
    <Container>
      {items.map((uploadedFile) => (
        <div className="li" key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize.toString()}</span>
            </div>
          </FileInfo>
          <div className="icons">
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgress size={24} />
            )}
            {uploadedFile.uploaded && <CheckCircle color="success" />}
            {uploadedFile.error && <Error color="error" />}
          </div>
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 20px;

  .li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + div {
      margin-top: 15px;
    }
  }

  .icons {
    display: flex;
    align-items: center;
  }
`
const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: #999;
    }
  }
`
const Preview = ({ src }: PreviewProps) => {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 5,
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        marginRight: 8
      }}
    />
  )
}
