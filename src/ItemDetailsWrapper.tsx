/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ItemDetailsWrapper: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <Link
      to="/"
      css={css`
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        text-decoration: none;
        color: #222;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        /* disable blue flash */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: '10%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '10%' }}
        transition={{
          opacity: {
            duration: 0.1,
            ease: 'linear',
          },
          y: {
            duration: 0.15,
            ease: ['circOut', 'circIn'],
          },
        }}
        css={css`
          background-color: #fffdf4c6;
          backdrop-filter: blur(8px) contrast(90%) brightness(100%) sepia(10%);
          box-shadow: 0 0px 40px 2px rgba(0, 0, 0, 0.2);
        `}
      >
        {children}
      </motion.div>
    </Link>
  );
};
