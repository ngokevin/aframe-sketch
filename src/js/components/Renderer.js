import {Animation, Entity} from 'aframe-react';
import parse5 from 'parse5';
import React from 'react';

export default class Renderer extends React.Component {
  render () {
    const doc = parse5.parse(this.props.program.join(''));
    console.log(doc.childNodes);

    return (
      <Entity position="0 0 -5">
        {doc.childNodes.length && getEntityTree(doc.childNodes[0])}
      </Entity>
    );
  }
}

function getEntityTree (node) {
  if (node.tagName === 'a-entity') {
    const components = {};
    node.attrs.forEach(attr => {
      components[attr.name] = attr.value;
    });
    return (
      <Entity {...components}/>
    );
  }

  if (!node.childNodes || !node.childNodes.length) {
    return;
  }

  return node.childNodes.map(childNode => getEntityTree(childNode));
}
