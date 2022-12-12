import React from 'react'

import { motion } from 'framer-motion'
import { AnimateButtonProps } from '../../@types/cyber'

export const AnimateButton: React.FC<AnimateButtonProps> = ({ children, type = 'scale', mr }) => {
  switch (type) {
    case 'rotate':
    case 'slide':
    case 'scale':
    default:
      return (
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }} style={{ marginRight: mr || 0 }}>
          {children}
        </motion.div>
      )
  }
}
