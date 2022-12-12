/* eslint-disable */
import React, { forwardRef, ReactElement, Ref } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, DialogContent } from '@mui/material';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageView({
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
        <img
          src={url}
          srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt='Image 1'
          loading="lazy"
          style={{
            maxHeight: 'calc(100vh - 70px)',
            maxWidth: '100%',
          }}
        />
      </Dialog>
    </div>
  );
}