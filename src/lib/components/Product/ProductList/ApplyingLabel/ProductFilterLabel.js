import React from 'react';
import type {filterArray} from '../layers.flow.js';

const parseOperatorToSymbol = (operatorString: string, isMultipleValue?: boolean): string => {
  console.log('pars');
  console.log(operatorString);
  switch (operatorString) {
    case 'greater_equal':
      return '≥';
    case 'greater':
      return '>';
    case 'equal':
      if (isMultipleValue) {
        return 'one of';
      } else {
        return '=';
      }
    case 'less':
      return '<';
    case 'less_equal':
      return '≤';
  }
};

// Currently have View wrapper for future change (may add icon instead of asciiz
const generateFilterLabelName = (filterLayers: filterArray): Array<string> => {

  return filterLayers.map(filterLayer => {
    const operator = parseOperatorToSymbol(filterLayer.type,
        (filterLayer.filterValue instanceof Array) && filterLayer.filterValue.length > 1);

    return `${filterLayer.name} ${operator} ${filterLayer.filterValue.toString()}`;
  });
};

export {generateFilterLabelName};
