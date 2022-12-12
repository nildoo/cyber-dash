/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, Grid } from '@mui/material'
import { uniqueId } from 'lodash'
import { filesize } from 'filesize'
import { Upload } from '../../components/Upload'
import { FileList } from '../../components/FileList'
import api from '../../config/api'
import { FileType } from '../../@types/cyber'
import { useAddFilesToCampaingMutation } from '../../generated/graphql'

export default function Uploads({
  campaingId,
  fileTypePush,
  closeModal,
  reload,
}: {
  campaingId: string,
  fileTypePush: 'image' | 'video',
  closeModal: (value: boolean) => void
  reload: () => void
}) {

  const [addFiles, { data: dataFile, loading: loadingFile, error: errorFile }] = useAddFilesToCampaingMutation()

  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([])

  let test: FileType[] = []

  const handleUpload = (files: File[]) => {
    const uploadedFilesMap = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      size: file.size,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }))

    setUploadedFiles([...uploadedFiles, ...uploadedFilesMap])
    test = [...test, ...uploadedFilesMap]
    length = uploadedFilesMap.length

    uploadedFilesMap.map((uploadedFile: FileType, index) => processUpload(uploadedFile, index, uploadedFilesMap.length))
  }

  const processUpload = (uploadedFile: FileType, index: number, len: number) => {

    const data = new FormData()
    data.append('file', uploadedFile.file)
    api.post('/upload', data)
      .then(response => {
        if (fileTypePush === 'image') {
          addFiles({
            variables: {
              input: {
                id: campaingId,
                size: uploadedFile.size,
                thumb: response.data.uri,
                title: uploadedFile.name,
                type: 'image',
                url: response.data.uri,
                approved: false,
                folder: response.data.folder,
                firebasePath: response.data.filename
              }
            }
          })
        }

        if (fileTypePush === 'video') {
          addFiles({
            variables: {
              input: {
                id: campaingId,
                size: uploadedFile.size,
                thumb: 'https://firebasestorage.googleapis.com/v0/b/cyber-app-e7821.appspot.com/o/images%2Fthumb.png?alt=media&token=1321130d-448e-440d-9496-3c9c736b41a8',
                title: uploadedFile.name,
                type: 'video',
                url: response.data.uri,
                approved: false,
                folder: response.data.folder,
                firebasePath: response.data.filename
              }
            }
          })
        }
        updateFile(uploadedFile.id, {
          uploaded: true,
          url: response.data.uri
        })
      })
      .catch((error) => {
        updateFile(uploadedFile.id, {
          error: true
        })
      })
  }

  const updateFile = (id: string, data: object) => {
    const result = test.map(file => {
      return file.id === id ? { ...file, ...data } : file
    })
    test = result
    setUploadedFiles(result)
  }

  useEffect(() => {
    const files = uploadedFiles.filter(f => f.uploaded === false)
    if (files.length === 0) {
      if (!loadingFile && dataFile) {
        closeModal(false)
        reload()
      }
    }
  }, [loadingFile, dataFile])

  return <Box sx={{ maxWidth: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2, padding: 2 }}>
      <Typography variant="h3">Enviar arquivos</Typography>
      <Grid item xs={12}>
        <Upload fileType={fileTypePush} onUpload={handleUpload} />
        {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
      </Grid>
    </Paper>
  </Box>
}
