/* eslint-disable */
import React, { forwardRef, ReactElement, Ref } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VideoView({
  open,
  handleToggle,
  url,
  setUrl
}: {
  open: boolean,
  handleToggle: (value: boolean) => void,
  url: string,
  setUrl: (value: string) => void
}) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleToggle(false)}
        TransitionComponent={Transition}
        sx={{ backdropFilter: 'blur(5px)' }}
      >
        <video autoPlay controls>
          <source src={url} />
          Seu navegador não suporta reprodução de video
        </video>
      </Dialog>
    </div>
  );
}