// Currently have View wrapper for future change (may add icon instead of asciiz
import React from 'react';
import type {sortArray} from '../layers.flow.js';

const generateSortLabelName = (sortLayers: sortArray): Array<string> => {

  return sortLayers.map(sortLayer => {
    let tailSymbol = '?';
    if (sortLayer.type === 'ascending') {
      tailSymbol = '↑';
    }
    else if (sortLayer.type === 'descending') {
      tailSymbol = '↓';
    }
    return `${sortLayer.name} ${tailSymbol}`;
  });
};

export {generateSortLabelName};
