export function generateCurriculum(niche: string, days = 90) {
const plan: Array<{ day: number; task: string }> = [];
for (let i = 1; i <= days; i++) plan.push({ day: i, task: `Micro task for ${niche} day ${i}` });
return plan;
}

