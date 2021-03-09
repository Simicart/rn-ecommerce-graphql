import {flattenNestedStruct} from '../flattenNestedStruct.js';

describe('flatten nested struct', () => {
  test('empty object', () => {
    expect(flattenNestedStruct({}, '', '')).toEqual({});
  });

  test('basic case', () => {
    const data = {
      id: 1,
      children: [
        {id: 2, children: []},
        {id: 3, children: []},
      ],
    };
    expect(flattenNestedStruct(data, 'children', 'id'))
        .toEqual({
          '2': {
            id: 2,
            children: [],
            parent: 1,
          },
          '3': {
            id: 3,
            children: [],
            parent: 1,
          },
        });
  });
});
