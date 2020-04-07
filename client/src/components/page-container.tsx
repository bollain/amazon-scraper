import React, { Fragment } from 'react';
import styled from 'react-emotion';

export default function PageContainer (props: any) {
  return (
    <Fragment>
      <Bar>Amazon ASIN Searcher</Bar>
      <Container>{props.children}</Container>
    </Fragment>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Bar = styled('div')({
  flexShrink: 0,
  height: 30,
  backgroundColor: 'orange',
  textAlign: 'center',
  paddingTop: '10px'
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
  padding: 8 * 3,
  paddingBottom: 8 * 5,
});