import {Animation, Entity} from 'aframe-react';
import parse5 from 'parse5';
import React from 'react';

export default class Renderer extends React.Component {
  render () {
    const doc = parse5.parse(this.props.program.join(''));

    return (
      <Entity>
        {getEntityTree(doc.childNodes[0])}
      </Entity>
    );
  }
}

function getEntityTree (node) {
  if (!node.childNodes.length) {
    return;
  }

  const children = node.childNodes.map(childNode => getEntityTree(childNode));

  return (
    <Entity children={children}/>
  );
}
