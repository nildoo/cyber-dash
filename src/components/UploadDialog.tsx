/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Uploads from '../pages/components-overview/Uploads';

export const UploadDialog = ({
  opened,
  closeModal,
  campaingId,
  fileType,
  reload
}: {
  opened: boolean,
  closeModal: (value: boolean) => void,
  campaingId: string,
  fileType: 'image' | 'video'
  reload: () => void
}) => {

  return (
    <div>
      <Dialog
        open={opened}
        onClose={() => closeModal(false)}
        scroll='body'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <Uploads reload={reload} closeModal={closeModal} fileTypePush={fileType} campaingId={campaingId} />
      </Dialog>
    </div>
  );
}

