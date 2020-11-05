// Currently have View wrapper for future change (may add icon instead of asciiz
import {Text, View} from 'react-native';
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
    const displayString = `${sortLayer.name} + ${tailSymbol}`;

    return displayString;
  });
};

export {generateSortLabelName};
