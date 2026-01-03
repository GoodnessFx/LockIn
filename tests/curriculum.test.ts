import { generateCurriculum } from '../src/services/ai/curriculum';

test('generates 90-day plan by default', () => {
const plan = generateCurriculum('fitness');
expect(plan).toHaveLength(90);
});

