import {getRandomHexColor} from '../getRandomHexColor.js';

test('generate hex', () => {
  expect(getRandomHexColor().match('#[a-fA-F0-9]{6}'));
});
