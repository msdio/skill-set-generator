/* eslint-disable react/no-children-prop */
import BackgroundWithCircle from '@common/background-with-circle';
import HeadingText from '@common/heading-text';
import { Box, Stack, useMediaQuery } from '@mui/material';
import Header from 'components/header';
import Selection from 'components/selection';
import StackGroup from 'components/stack-group';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { BgColorOption } from 'types/backgroundColors';

const BackgroundColors = () => {
  const isMobile = useMediaQuery('(max-width: 740px)');
  const { state } = useLocation();
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement>(null);

  const submitColor = (color: BgColorOption) => {
    if (color && state) {
      navigate(`/loading/${color}`, { state });
    }
  };

  return (
    <BackgroundWithCircle sx={{ overflow: 'hidden' }}>
      <Header isMain={false} />

      <Box
        width='100vw'
        height='100%'
        minHeight='100vh'
        justifyContent='center'
        paddingTop='8.125rem'
        position='relative'
        zIndex='5'
      >
        <HeadingText isMobile={isMobile}>Choose Color</HeadingText>

        <Stack alignItems={'center'} spacing={9} mt={'2.8125rem'}>
          <Selection
            label='black'
            color='black'
            onClick={() => submitColor('black')}
            isMobile={isMobile}
            children={<StackGroup ref={targetRef} selecteds={state} color='black' />}
          />
          <Selection
            label='white'
            color='white'
            onClick={() => submitColor('white')}
            isMobile={isMobile}
            children={<StackGroup ref={targetRef} selecteds={state} color='white' />}
          />
        </Stack>
      </Box>
    </BackgroundWithCircle>
  );
};

export default BackgroundColors;
